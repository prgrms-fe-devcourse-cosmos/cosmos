import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserSection() {
  const navigate = useNavigate();
  return (
    <button
      className="py-2 px-4 border-1 hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-300)] text-xs rounded-lg cursor-pointer"
      onClick={() => navigate("/login")}
    >
      JOIN
    </button>
  );
}
