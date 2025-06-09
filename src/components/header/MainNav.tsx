import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainNav() {
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return (
      // 라우터와 같거나 라우터의 하위문서로가도 작동한다.
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <div className="flex-1 flex justify-center">
      <div className="md:flex space-x-8">
        {[
          { name: "Daily Space", path: "/daily" },
          { name: "Lounge", path: "/lounge" },
          { name: "Cosmo Lab", path: "/lab" },
        ].map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`px-3 py-2 rounded-md text-xs xl:text-sm cursor-pointer transition-colors
                    ${
                      active
                        ? "text-[color:var(--primary-300)]"
                        : "text-[color:var(--white)] hover:text-[color:var(--primary-300)]"
                    }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
