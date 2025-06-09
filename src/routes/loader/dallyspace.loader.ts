import { getAstroEvents } from '../../api/calendar';
import nasaAPI from '../../api/nasa';
import newsAPI from '../../api/news';
import { AstroEventItem } from '../../types/daily';

export async function DailyLoader() {
  // 미국기준으로 년도 달 일을 가져온다.
  const getEasternDate = () => {
    const estFormatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const parts = estFormatter.formatToParts(new Date());
    const year = parts.find((p) => p.type === 'year')?.value;
    const month = parts.find((p) => p.type === 'month')?.value;
    const day = parts.find((p) => p.type === 'day')?.value;

    return `${year}-${month}-${day}`;
  };

  const filterEvents = (events: AstroEventItem[], today: number) => {
    // 필터링을 해준다. 첫번째 배열은 이상한게있어서 그것을 제외하고한다.
    const filtered = events.slice(1);
    // 두자리수로 해주고 만약 6이란숫자가 들어가면 06 이런식으로 변경해준다.
    const todayStr = String(today).padStart(2, '0');

    // 오늘 날짜와 같으면 나오게한다.
    const todayEvents = filtered.filter(
      (event) => String(event.locdate).slice(-2) === todayStr
    );

    // 오늘날짜보다 큰 날짜들 필터링
    const upcomingEvents = filtered.filter(
      (event) => String(event.locdate).slice(-2) > todayStr
    );

    // 같은 날끼린 묶어서 내용이 나오도록 합친다.
    const groupedUpcoming: { day: string; events: string[] }[] = [];
    let currentDay = '';
    let currentGroup: { day: string; events: string[] } | null = null;

    for (const event of upcomingEvents) {
      const day = String(event.locdate).slice(-2);

      if (day === currentDay) {
        currentGroup?.events.push(event.astroEvent);
      } else {
        if (currentGroup) groupedUpcoming.push(currentGroup);
        currentDay = day;
        currentGroup = { day, events: [event.astroEvent] };
      }
    }
    if (currentGroup) groupedUpcoming.push(currentGroup);

    return { todayEvents, upcomingEvents: groupedUpcoming };
  };

  const date = getEasternDate();

  const [y, m] = date.split('-').map(Number);
  const today = Number(date.split('-')[2]);

  try {
    // api 3개 호출
    const [nasa, news, stevents] = await Promise.all([
      nasaAPI('/apod', { params: { date } }),
      newsAPI('/'),
      getAstroEvents(y, m),
    ]);

    const { todayEvents, upcomingEvents } = filterEvents(stevents, today);

    return {
      nasa: nasa.data,
      news: news.data.results,
      todayEvents,
      upcomingEvents,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message, { status: 500 });
    }
    throw new Response('NASA API 요청 실패', { status: 500 });
  }
}
