import React from "react";
import Earth from "../../components/home/Earth";
import Moon from "../../components/home/Moon";

export default function GlobeSection({ theme }: { theme: "light" | "dark" }) {
  return (
    <div>
      <div className="absolute top-10 -translate-x-1/2 left-1/2 w-full text-center font-[helvetica-neue] space-y-2 z-20">
        <p className="text-4xl font-semibold">Explore the Universe</p>
        <p className=" text-[color:var(--gray-200)] text-2xl">
          Discover new wonders daily
        </p>
      </div>
      {theme === "dark" ? <Earth /> : <Moon />}
    </div>
  );
}
