import { useEffect, useRef, useState } from "react";
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
  const user = useAuthStore((state) => state.userData);
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
        <Menu strokeWidth={1} className="cursor-pointer" onClick={toggleMenu} />
      )}
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={sideRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 min-h-screen w-[320px] bg-[color:var(--bg-color)] shadow-lg z-50"
          >
            <div className="relative min-h-screen bg-[color:var(--bg-color)]">
              <X
                onClick={toggleMenu}
                strokeWidth={1}
                className="cursor-pointer absolute top-5 right-10 "
              />
              <div className="py-20 px-10 flex flex-col flex-1 gap-10 min-h-screen w-full ">
                {user ? <UserProfile user={user} /> : <WelcomeSection />}
                <div className="flex-1">
                  <NavigationMenu toggleMenu={toggleMenu} />
                </div>
                <AuthButtons isLoggedIn={isLoggedIn} toggleMenu={toggleMenu} />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
