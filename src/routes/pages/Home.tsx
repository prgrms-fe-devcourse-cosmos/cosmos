import { useEffect, useRef, useState } from "react";
import { getCurrentTheme } from "../../types/theme";
import MVPSection from "../../components/home/MVPSection";
import GlobeSection from "../../components/home/GlobeSection";
import IntroSection from "../../components/home/IntroSection";
import HomeFooter from "../../components/home/HomeFooter";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ScrollToTop from "../../components/common/ScrollToTop";

export default function Home() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const globeSectionRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalWarn = console.warn;

    console.warn = function (...args) {
      const msg = args[0];
      if (
        typeof msg === "string" &&
        msg.includes("THREE.Color: Alpha component")
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

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
      <ScrollToTop />
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

      <div className=" w-full flex flex-col justify-center items-center mb-50">
        <DotLottieReact
          src="https://lottie.host/916767ed-a8fa-4b95-a4bc-386022de9fc8/4WjxTEFhzM.lottie"
          loop
          autoplay
          style={{ width: "600px", height: "300px" }}
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center ">
        <HomeFooter />
      </div>
    </div>
  );
}
