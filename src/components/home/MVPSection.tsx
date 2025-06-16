import React from "react";
import mvp1 from "../../assets/images/mvp1.jpg";
import mvp2 from "../../assets/images/mvp2.png";
import mvp3 from "../../assets/images/mvp3.png";
import MVPCard from "./MVPCard";

const mvps = [
  {
    title: "Today in Space.",
    content:
      "Daily astronomy images, news, and celestial events—powered by NASA and the global space community.",
    img: mvp1,
  },
  {
    title: "Space Community.",
    content:
      "Share astrophotography, discuss space movies, and join open conversations with fellow stargazers.",
    img: mvp2,
  },
  {
    title: "Space Games.",
    content:
      "Challenge yourself with space trivia and puzzles, featuring real APOD images and movie posters.",
    img: mvp3,
  },
];

export default function MVPSection() {
  return (
    <div className="flex gap-40 md:gap-0 w-[480px] md:w-[720px] lg:w-[960px] xl:w-[1280px] justify-between flex-col md:flex-row items-center">
      {mvps.map((mvp, i) => (
        <MVPCard
          key={i}
          imgSrc={mvp.img}
          title={mvp.title}
          content={mvp.content}
        />
      ))}
    </div>
  );
}
