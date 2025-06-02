import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#161B22] text-white sticky top-0 z-50 border-b border-[#30363d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="ml-2 text-xl font-bold">COSMOS</span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {[
                  { name: "Daily", path: "/daily" },
                  { name: "Lounge", path: "/lounge" },
                  { name: "Lab", path: "/lab" },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="hover:bg-[#21262D] text-[#c9d1d9] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
