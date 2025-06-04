import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Lab() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-[1080px] flex justify-center items-center">
      <div className="flex space-x-8 py-4">
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
            className="hover:text-[color:var(--primary-300)]"
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="flex-1 w-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
