import React, { useState } from "react";

export default function IntroScreen({ onLaunch }: { onLaunch: () => void }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="relative w-[768px] h-[432px]">
      <div
        className={`absolute inset-0 bg-[url('/images/puzzle/puzzle_start.png')] bg-cover  transition-all duration-300 z-0 ${
          isHover ? "brightness-50" : "brightness-100"
        }`}
      />

      <div className="relative flex flex-col py-20 px-8 w-full h-full text-[color:var(--primary-300)] font-[yapari] justify-between z-10">
        <div className="w-full flex justify-center items-center text-2xl">
          <h1>COSMO PUZZLE</h1>
        </div>

        <div className="w-full flex justify-center items-center flex-col">
          <button
            className="w-[160px] cursor-pointer border-1 py-1 rounded-lg text-sm hover:text-[color:var(--bg-color)] hover:bg-[color:var(--primary-300)] hover:font-medium z-20 transition-all duration-300"
            onClick={() => onLaunch()}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            READY
          </button>
        </div>

        <div className="w-full flex justify-center items-center">
          <p className="font-[watermelonSalad] text-xs">
            우주의 퍼즐을 풀며 새로운 세계를 탐험해보세요
          </p>
        </div>
      </div>
    </div>
  );
}
