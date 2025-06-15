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
    <div className="size-100">
      <img src={imgSrc} loading="lazy" className="size-100 object-cover" />
      <div>
        <span>{title}</span>
        <p>{content}</p>
      </div>
    </div>
  );
}
