import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Lab() {
  const navigate = useNavigate();
  const location = useLocation();
  const [destination, setDestination] = useState("");

  const isRoot = location.pathname === "/lab";

  return (
    <div className="min-h-screen w-[1080px] flex pt-10 justify-between flex-col font-[yapari] text-[color:var(--primary-300)]">
      <div className="w-[1080px] h-[720px] relative inset-0 bg-[url('/images/puzzle/cosmolab_bg.png')] bg-cover p-20 flex flex-col justify-between">
        {isRoot && (
          <>
            <div className="w-full text-center text-4xl">
              <h1>COSMO LAB</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              {[
                { name: "Quiz", path: "/lab/quiz" },
                {
                  name: "Puzzle",
                  path: "/lab/puzzle",
                },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setDestination(item.path)}
                  className={`hover:text-[color:var(--primary-300)] cursor-pointer text-2xl text-left pb-4 transition-colors  ${
                    destination.includes(item.name.toLowerCase())
                      ? "text-[color:var(--primary-300)] "
                      : "text-[color:var(--primary-200)] hover:text-[color:var(--primary-300)]"
                  }`}
                >
                  <br />
                  {item.name}
                </button>
              ))}
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                className="border-1 px-10 py-2 cursor-pointer"
                onClick={() => navigate(destination)}
              >
                LIFT OFF
              </button>
            </div>
          </>
        )}
        <div className="w-full flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
