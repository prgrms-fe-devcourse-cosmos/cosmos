import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div
      className="flex-shrink-0 flex items-center cursor-pointer"
      onClick={() => navigate("/")}
    >
      <span className="ml-2 text-xl">COSMOS</span>
    </div>
  );
}
