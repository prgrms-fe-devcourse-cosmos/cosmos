import React from "react";
import PageListItem from "./PageListItem";

const communityPageList = [
  { name: "Space Films", route: "/lounge/films" },
  { name: "Stargazer Gallery", route: "/lounge/gallery" },
  { name: "Discussion Board", route: "/lounge/talk" },
];

export default function CommunityNav() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-medium">Community</span>
      <div className="w-60 flex flex-col items-start text-[color:var(--gray-200)] gap-1">
        {communityPageList.map((page) => (
          <PageListItem name={page.name} route={page.route} />
        ))}
      </div>
    </div>
  );
}
