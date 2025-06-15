import { useEffect, useRef, useState } from "react";
import { getCurrentTheme } from "../../types/theme";
import MVPSection from "../../components/home/MVPSection";
import GlobeSection from "../../components/home/GlobeSection";
import IntroSection from "../../components/home/IntroSection";
import HomeFooter from "../../components/home/HomeFooter";

export default function Home() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const globeSectionRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col text-white">
      <div
        ref={globeSectionRef}
        className="relative min-h-screen w-full flex flex-col justify-center items-center font-[yapari] "
      >
        <GlobeSection theme={theme} />
      </div>

      <div
        ref={nextSectionRef}
        className=" min-h-screen w-full flex flex-col justify-center items-center "
      >
        <MVPSection />
      </div>

      <div className=" min-h-screen w-full flex flex-col justify-center items-center ">
        <IntroSection />
      </div>

      <div className="w-full flex flex-col justify-center items-center ">
        <HomeFooter />
      </div>
    </div>
  );
}
