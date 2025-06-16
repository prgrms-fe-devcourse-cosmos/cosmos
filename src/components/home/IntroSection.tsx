import React, { useEffect, useRef, useState } from "react";
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
      start: "top 70%",
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
          start: "50% 80%",
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

      <div className="textBox w-full text-center text-2xl text-[color:var(--gray-200)]">
        <span className="block">Jump into today’s </span>
        <span className="block">discoveries, connect with </span>
        <span className="block">explorers, or play space- </span>
        <span className="block">themed games.</span>
      </div>
      <button
        onClick={() => {
          if (!currentUserData) return navigate("/login");
          return navigate("/daily");
        }}
        className="textBox bg-[color:var(--primary-300)] text-[color:var(--bg-color)] px-6 py-3 rounded-full font-medium cursor-pointer"
      >
        Explore now
      </button>
    </div>
  );
}
