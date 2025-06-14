import { useEffect, useState } from "react";
import { getCurrentTheme } from "../../types/theme";
import Earth from "../../components/home/Earth";
import Moon from "../../components/home/Moon";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [theme, setTheme] = useState(getCurrentTheme());

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getCurrentTheme());
    };
    document.addEventListener("themeChanged", handleThemeChange);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setTheme(getCurrentTheme());
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      document.removeEventListener("themeChanged", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center font-[yapari] text-[color:var(--primary-300)]">
      <div className="absolute top-120 left-1/2 -translate-x-1/2 z-20">
        <TypeAnimation
          sequence={["WELCOME", 600, "COSMOS", 600]}
          style={{ fontSize: "3em" }}
          repeat={Infinity}
          speed={10}
        />
      </div>

      {theme === "dark" ? <Earth /> : <Moon />}
    </div>
  );
}
