import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../../../stores/authStore";
import NavigationMenu from "./NavigationMenu";
import UserProfile from "./UserProfile";
import AuthButtons from "./AuthButtons";
import WelcomeSection from "./WelcomeSection";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const sideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outsideClickHandler = (event: MouseEvent) => {
      if (sideRef.current && !sideRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", outsideClickHandler);
    }
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [open, setOpen]);

  return (
    <div ref={sideRef}>
      {!open && (
        <Menu strokeWidth={1} className="cursor-pointer" onClick={toggleMenu} />
      )}
      {open && (
        <aside
          className={`flex flex-col fixed top-0 right-0 h-full w-[320px] bg-[color:var(--bg-color)] opacity-80 shadow-lg z-50 transition-transform duration-300 transform ${
            open ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 md:static md:w-[20%] md:right-0`}
        >
          <div className="relative h-full">
            <X
              onClick={toggleMenu}
              strokeWidth={1}
              className="cursor-pointer absolute top-5 right-10 "
            />
            <div className="py-20 px-10 flex flex-col gap-10 h-full w-full">
              {user ? <UserProfile user={user} /> : <WelcomeSection />}
              <NavigationMenu toggleMenu={toggleMenu} />
              <AuthButtons isLoggedIn={isLoggedIn} toggleMenu={toggleMenu} />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
