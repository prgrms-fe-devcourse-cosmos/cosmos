import { useEffect, useState } from "react";
import { getCurrentTheme } from "../../types/theme";
import Earth from "../../components/home/Earth";
import Moon from "../../components/home/Moon";

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
    <div className="relative min-h-screen w-full flex justify-center items-center">
      <h1 className="absolute text-center  text-3xl font-[yapari] z-10 leading-15">
        COSMOS
      </h1>

      {theme === "dark" ? <Earth /> : <Moon />}
    </div>
  );
}
