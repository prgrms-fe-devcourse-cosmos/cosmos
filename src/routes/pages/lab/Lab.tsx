import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Lab() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen w-[1080px] flex pt-10 justify-between">
      <div className="flex flex-col py-4 font-[yapari] gap-8 w-[240px]">
        {[
          { name: "Quiz", path: "/lab/quiz" },
          {
            name: "Puzzle",
            path: "/lab/puzzle",
          },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`hover:text-[color:var(--primary-300)] cursor-pointer text-2xl text-left pb-4 transition-colors  ${
              location.pathname.includes(item.name.toLowerCase())
                ? "text-[color:var(--primary-300)] border-b-1"
                : "text-[color:var(--white)] hover:text-[color:var(--primary-300)]"
            }`}
          >
            Space
            <br />
            {item.name}
          </button>
        ))}
      </div>
      <div className=" w-[768px] flex ">
        <Outlet />
      </div>
    </div>
  );
}
