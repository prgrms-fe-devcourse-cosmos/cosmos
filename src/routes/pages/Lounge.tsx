import { NavLink, Outlet } from "react-router-dom";
import ScrollToTop from "../../components/common/ScrollToTop";

export default function Lounge() {
  const activeLoungeTab = (isActive: boolean) =>
    `block flex-1 md:w-[240px] pb-2 sm:pb-4 leading-[24px] sm:leading-[40px] nav-underline 
  ${isActive ? "active text-[#D0F700]" : ""}`;

  return (
    <>
      <div
        className="min-h-screen w-full max-w-[1080px] m-auto pt-10 
        flex flex-col lg:flex-row gap-[30px] sm:gap-[50px] lg:gap-[72px] px-[30px] sm:px-[40px] lg:px-0"
      >
        {/* 사이드바 */}
        <div className="lg:h-[355px]">
          <nav
            className="font-yapari flex gap-4 sm:gap-8
            lg:flex-col flex-row text-sm sm:text-lg md:text-xl"
          >
            <NavLink
              to="/lounge/films"
              className={({ isActive }) => activeLoungeTab(isActive)}
              style={{ letterSpacing: "5%" }}
            >
              Space <br />
              Films
            </NavLink>
            <NavLink
              to="/lounge/gallery"
              className={({ isActive }) => activeLoungeTab(isActive)}
              style={{ letterSpacing: "5%" }}
            >
              Stargazer <br />
              Gallery
            </NavLink>
            <NavLink
              to="/lounge/talk"
              className={({ isActive }) => activeLoungeTab(isActive)}
              style={{ letterSpacing: "5%" }}
            >
              Cosomo <br />
              Talk
            </NavLink>
          </nav>
        </div>

        {/* 본문 영역 */}
        <div className="w-full mb-[50px]">
          <ScrollToTop />
          <Outlet />
        </div>
      </div>
    </>
  );
}
