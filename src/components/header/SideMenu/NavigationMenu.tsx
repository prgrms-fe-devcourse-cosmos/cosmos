import { Armchair, Gamepad, Telescope } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationMenu() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col h-full">
        <button
          onClick={() => navigate("/daily")}
          className="text-left flex gap-4 items-center cursor-pointer hover:text-[color:var(--primary-300)] py-2"
        >
          <Telescope className="w-5" />
          <p className="text-sm pt-1">Daily Space</p>
        </button>
        <button
          onClick={() => navigate("/lounge")}
          className="text-left flex gap-4 items-center cursor-pointer hover:text-[color:var(--primary-300)] py-2"
        >
          <Armchair className="w-5" />
          <p className="text-sm pt-1">Lounge</p>
        </button>
        <button
          onClick={() => navigate("/lab")}
          className="text-left flex gap-4 items-center cursor-pointer hover:text-[color:var(--primary-300)] py-2"
        >
          <Gamepad className="w-5" />
          <p className="text-sm pt-1">Cosmo Lab</p>
        </button>
      </div>
    </>
  );
}
