import React, { useState } from "react";
import { Armchair, Gamepad, Menu, Telescope, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);
  const navigate = useNavigate();

  return (
    <>
      {!open && (
        <Menu strokeWidth={1} className="cursor-pointer" onClick={toggleMenu} />
      )}
      {open && (
        <aside
          className={`flex flex-col fixed top-0 right-0 h-full w-[320px] bg-[color:var(--bg-color)] opacity-80 shadow-lg z-50 transition-transform duration-300 transform ${
            open ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 md:static md:w-[20%] md:right-0`}
        >
          <div className="relative">
            <X
              onClick={toggleMenu}
              strokeWidth={1}
              className="cursor-pointer absolute top-5 right-10 "
            />

            <div className="flex flex-col h-full px-5 pt-20">
              <button
                onClick={() => navigate("/daily")}
                className="text-left flex gap-4 items-center cursor-pointer hover:text-[color:var(--primary-300)] py-2"
              >
                <Telescope className="w-[18px]" />
                <p className="text-sm pt-1">Daily Space</p>
              </button>
              <button
                onClick={() => navigate("/lounge")}
                className="text-left flex gap-4 items-center cursor-pointer hover:text-[color:var(--primary-300)] py-2"
              >
                <Armchair className="w-[18px]" />
                <p className="text-sm pt-1">Lounge</p>
              </button>
              <button
                onClick={() => navigate("/lab")}
                className="text-left flex gap-4 items-center cursor-pointer hover:text-[color:var(--primary-300)] py-2"
              >
                <Gamepad className="w-[18px]" />
                <p className="text-sm pt-1">Cosmo Lab</p>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
