import React, { useEffect, useRef } from "react";
import mvp1 from "../../assets/images/mvp1.jpg";
import mvp2 from "../../assets/images/mvp2.png";
import mvp3 from "../../assets/images/mvp3.png";
import MVPCard from "./MVPCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mvps = [
  {
    title: "Today in Space.",
    content:
      "NASA와 전 세계 우주 커뮤니티가 전하는 오늘의 천문 이미지, 우주 뉴스, 그리고 천체 이벤트",
    img: mvp1,
  },
  {
    title: "Space Community.",
    content:
      "천체 사진을 공유하고, 우주 영화를 이야기하며, 별을 좋아하는 사람들과 자유롭게 소통해보세요.",
    img: mvp2,
  },
  {
    title: "Space Games.",
    content:
      "NASA 이미지와 영화 포스터로 구성된 퍼즐과 우주 지식 퀴즈에 도전해보세요.",
    img: mvp3,
  },
];

export default function MVPSection() {
  const mvpSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imgBoxes = gsap.utils.toArray(".imgBox") as HTMLElement[];
    const textBoxes = gsap.utils.toArray(".textBox") as HTMLElement[];

    imgBoxes.forEach((imgBox) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: imgBox,
          start: "50% 100%",
          toggleClass: { targets: imgBox, className: "active" },
          scrub: 1,
        },
      });
    });

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
      ref={mvpSectionRef}
      className="flex gap-40 md:gap-0 w-[480px] md:w-[720px] lg:w-[960px] xl:w-[1280px] justify-between flex-col md:flex-row items-center"
    >
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
