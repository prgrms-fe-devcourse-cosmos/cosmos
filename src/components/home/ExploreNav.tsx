import React from "react";
import PageListItem from "./PageListItem";

const explorePageList = [
  { name: "Image of the Day", route: "/daily" },
  { name: "Astronomy News", route: "/daily" },
  { name: "Cosmic Evemts", route: "/daily" },
];

export default function ExploreNav() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-medium">Explore</span>
      <div className="w-60 flex flex-col items-start text-[color:var(--gray-200)] gap-1">
        {explorePageList.map((page) => (
          <PageListItem name={page.name} route={page.route} />
        ))}
      </div>
    </div>
  );
}
