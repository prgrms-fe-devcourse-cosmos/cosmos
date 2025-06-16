import { summarizeAndTranslateByAi } from '../api/ai/getSummarizeAndTranslateByAI';
import { getAstroEvents } from '../api/daily/calendar';
import nasaAPI from '../api/daily/nasa';
import newsAPI from '../api/daily/news';
import { Article, AstroEventItem } from '../types/daily';

export async function DailyLoader() {
  // 미국 동부시간 기준 날짜 구하기
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

  // 한국 시간 기준 날짜 구하기
  const getKoreanDate = () => {
    const krFormatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const parts = krFormatter.formatToParts(new Date());
    const year = parts.find((p) => p.type === 'year')?.value;
    const month = parts.find((p) => p.type === 'month')?.value;
    const day = parts.find((p) => p.type === 'day')?.value;

    return `${year}-${month}-${day}`;
  };

  // 이벤트 필터링 함수
  const filterEvents = (events: AstroEventItem[], today: number) => {
    // 필터링을 해준다. 첫번째 배열은 이상한게있어서 그것을 제외하고한다.
    const filtered = events.slice(1);
    // 두자리수로 해주고 만약 6이란숫자가 들어가면 06 이런식으로 변경해준다.
    const todayStr = String(today).padStart(2, '0');

    const todayEvents = filtered.filter(
      (event) => String(event.locdate).slice(-2) === todayStr
    );

    const upcomingEvents = filtered.filter(
      (event) => String(event.locdate).slice(-2) > todayStr
    );

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

  // 날짜 가져오기
  const dateUS = getEasternDate();
  const dateKR = getKoreanDate();

  const [y, m] = dateKR.split('-').map(Number);
  const today = Number(dateKR.split('-')[2]);

  try {
    let nasaData = {};
    try {
      const nasa = await nasaAPI('/apod', { params: { date: dateUS } });
      nasaData = nasa.data;
    } catch {
      nasaData = {};
    }
    const [news, stevents] = await Promise.all([
      newsAPI('/', { params: { date: dateUS } }),
      getAstroEvents(y, m),
    ]);

    const translatedNews = await Promise.all(
      news.data.results.map(async (article: Article) => {
        try {
          const { summary } = await summarizeAndTranslateByAi(
            article.summary,
            article.id.toString()
          );
          return { ...article, translatedSummary: summary };
        } catch {
          return { ...article, translatedSummary: null };
        }
      })
    );
    console.log('translated news', translatedNews);

    const { todayEvents, upcomingEvents } = filterEvents(stevents, today);

    return {
      nasa: nasaData,
      news: translatedNews,
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
