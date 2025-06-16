import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageListItem({
  name,
  route,
}: {
  name: string;
  route: string;
}) {
  const navigate = useNavigate();
  return (
    <button className="cursor-pointer" onClick={() => navigate(`${route}`)}>
      {name}
    </button>
  );
}
