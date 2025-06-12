import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../../../stores/authStore";
import NavigationMenu from "./NavigationMenu";
import UserProfile from "./UserProfile";
import AuthButtons from "./AuthButtons";
import WelcomeSection from "./WelcomeSection";
import { motion, AnimatePresence } from "framer-motion";

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
    <div>
      {!open && (
        <Menu
          strokeWidth={1}
          className="cursor-pointer "
          onClick={toggleMenu}
        />
      )}
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={sideRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-[320px] bg-[color:var(--bg-color)] shadow-lg z-50"
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
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
