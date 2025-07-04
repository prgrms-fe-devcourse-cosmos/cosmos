import { LoaderData } from "../../types/daily";
import { useLoaderData } from "react-router-dom";

export default function DailyCalendar() {
  const { todayEvents, upcomingEvents } = useLoaderData() as LoaderData;

  return (
    <div>
      <h1 className="text-center font-[yapari] text-[var(--primary-300)] text-lg md:text-2xl mb-10">
        COSMIC EVENTS
      </h1>
      <div className="w-[270px] sm:w-[540px] md:w-[640px] lg:w-[880px] xl:w-[1080px] mx-auto text-[var(--white)] mb-5">
        <div className="w-full h-auto mb-4">
          {/* 오늘 이벤트 제목 */}
          <div className="w-full text-center mb-5">
            <h2 className="text-base md:text-xl font-[yapari]">TODAY</h2>
          </div>

          {/* 오늘 이벤트 내용 */}
          <div className="w-full py-6 bg-[rgba(255,255,255,0.09)] flex justify-center items-center mb-10">
            {todayEvents.length === 0 ? (
              <p className="text-[#c7c7c7] text-xs">
                오늘은 이벤트가 없습니다.
              </p>
            ) : (
              <ul className="flex justify-center items-center flex-wrap w-full gap-x-8">
                {todayEvents.map((event, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col items-center text-center gap-y-2"
                  >
                    <span className="font-[yapari] text-[var(--primary-300)] text-lg mb-1">
                      {String(event.locdate).slice(-2)}
                    </span>
                    <span className="text-sm text-[color:var(--gray-100)]">
                      {event.astroTime}
                    </span>
                    <span className="text-base font-medium line-clamp-3">
                      {event.astroEvent}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="w-full">
          {/* 오늘 이후 이벤트 제목 */}
          <div className="w-full text-center mb-5">
            <h2 className="text-base md:text-xl font-[yapari]">UPCOMING</h2>
          </div>

          {/* 오늘 이후 이벤트 내용 */}
          <div className="w-full pb-4 bg-[rgba(255,255,255,0.09)] justify-center items-center">
            {upcomingEvents.length === 0 ? (
              <p className="w-full h-full flex text-[#c7c7c7]">
                다가오는 이벤트가 없습니다.
              </p>
            ) : (
              <>
                {/* 모바일 크기일때 3개까지만 나오도록 */}
                <ul className="flex flex-wrap gap-x-31 gap-y-2 px-10 md:hidden">
                  {upcomingEvents.slice(0, 3).map(({ day, events }, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-1 mt-6 w-[250px]"
                    >
                      <span className="font-[yapari] text-[var(--primary-300)] text-lg mr-2">
                        {day}
                      </span>
                      <span className="text-sm line-clamp-3">
                        {events ? events.join(", ") : ""}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* 기본 크기일때 6개까지만 나오도록 */}
                <ul className="hidden md:flex flex-wrap gap-x-31 gap-y-2 my-6 px-10">
                  {upcomingEvents.slice(0, 6).map(({ day, events }, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-1 mt-6 lg:mt-7 w-[250px]"
                    >
                      <span className="font-[yapari] text-[var(--primary-300)] text-sm lg:text-lg mr-2">
                        {day}
                      </span>
                      <span className=" text-xs md:text-sm line-clamp-3">
                        {events ? events.join(", ") : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
