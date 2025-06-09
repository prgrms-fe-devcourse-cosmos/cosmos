import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);

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
          </div>
        </aside>
      )}
    </>
  );
}
