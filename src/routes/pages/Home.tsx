import { useEffect, useRef, useState } from "react";
import { getCurrentTheme } from "../../types/theme";
import MVPSection from "../../components/home/MVPSection";
import GlobeSection from "../../components/home/GlobeSection";
import IntroSection from "../../components/home/IntroSection";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const globeSectionRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="flex flex-col">
      <div
        ref={globeSectionRef}
        className="relative min-h-screen w-full flex flex-col justify-center items-center font-[yapari] "
      >
        <GlobeSection theme={theme} />
        <div className="absolute bottom-30 w-full flex flex-col justify-center items-center space-x-1">
          <button
            onClick={scrollToNextSection}
            className="text-[color:var(--primary-300)] z-30  cursor-pointer "
          >
            Explore
          </button>
          <ArrowDown strokeWidth={1} color="var(--primary-300)" />
        </div>
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
    </div>
  );
}
