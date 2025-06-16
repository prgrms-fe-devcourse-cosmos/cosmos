import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useAuthStore } from "../../stores/authStore";

export default function IntroSection() {
  const navigate = useNavigate();
  const currentUserData = useAuthStore((state) => state.userData);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <TypeAnimation
        sequence={["Start your cosmic journey"]}
        style={{ fontSize: "3em", fontWeight: 400 }}
        repeat={0}
        speed={60}
      />
      <div className="w-full text-center text-2xl text-[color:var(--gray-200)]">
        <p>Jump into today’s </p>
        <p>discoveries, connect with </p>
        <p>explorers, or play space- </p>
        <p>themed games.</p>
      </div>
      <button
        onClick={() => {
          if (!currentUserData) return navigate("/login");
          return navigate("/daily");
        }}
        className="bg-[color:var(--primary-300)] text-[color:var(--bg-color)] px-4 py-2 rounded-full font-medium cursor-pointer"
      >
        Explore now
      </button>
    </div>
  );
}
