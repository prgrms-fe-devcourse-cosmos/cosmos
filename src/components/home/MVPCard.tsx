import React from "react";

export default function MVPCard({
  title,
  content,
  imgSrc,
}: {
  title: string;
  content: string;
  imgSrc: string;
}) {
  return (
    <div className="w-70 space-y-5">
      <img src={imgSrc} loading="lazy" className="size-70 object-cover" />
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-medium ">{title}</span>
        <p className="text-[color:var(--gray-200)]">{content}</p>
      </div>
    </div>
  );
}
