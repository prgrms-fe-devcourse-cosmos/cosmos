import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function IntroSection() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <TypeAnimation
        sequence={["Start your cosmic journey"]}
        style={{ fontSize: "3em" }}
        repeat={0}
        speed={60}
      />
      <div className="w-full text-center text-3xl">
        <p>Jump into today’s </p>
        <p>discoveries, connect with </p>
        <p>explorers, or play space- </p>
        <p>themed games.</p>
      </div>
      <button className="bg-[color:var(--primary-300)] text-[color:var(--bg-color)] px-4 py-2 rounded-full">
        Explore now
      </button>
    </div>
  );
}
