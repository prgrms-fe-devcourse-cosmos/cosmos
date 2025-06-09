import { NavLink, Outlet } from "react-router-dom";

export default function Lounge() {
  const activeLoungeTab = (isActive: boolean) =>
    `block w-[240px] pb-4 leading-[40px] ${
      isActive ? "text-[#D0F700] border-b border-[#D0F700]" : "text-white"
    }`;

  return (
    <>
      <div className="min-h-screen w-[1080px] flex justify-center m-auto pt-10 gap-[72px]">
        <nav className="font-yapari flex gap-8 flex-col text-[20px]">
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
        <div className="w-full mb-[50px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
