import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useAuthStore } from "../../stores/authStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const navigate = useNavigate();
  const currentUserData = useAuthStore((state) => state.userData);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [typingStarted, setTypingStarted] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: false,
      onEnter: () => {
        setTypingStarted(true);
      },
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const textBoxes = gsap.utils.toArray(".textBox") as HTMLElement[];
    textBoxes.forEach((textBox) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: textBox,
          start: "50% 50%",
          toggleClass: { targets: textBox, className: "active" },
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col justify-center items-center gap-10"
    >
      {typingStarted && (
        <TypeAnimation
          sequence={["Start your cosmic journey"]}
          style={{ fontSize: "3em", fontWeight: 400 }}
          repeat={0}
          speed={60}
        />
      )}

      <div className="textBox w-full text-center text-xl text-[color:var(--gray-200)]">
        <p className="block">오늘의 우주를 탐험하고,</p>
        <p className="block">새로운 발견을 만나보아요.</p>
        <p className="block">다른 탐험가들과 소통하며</p>
        <p className="block">우주 테마 게임을 즐겨보세요 🚀</p>
      </div>
      <button
        onClick={() => {
          if (!currentUserData) return navigate("/login");
          return navigate("/daily");
        }}
        className="textBox bg-[color:var(--primary-300)] text-[color:var(--bg-color)] px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg "
      >
        Explore now
      </button>
    </div>
  );
}
