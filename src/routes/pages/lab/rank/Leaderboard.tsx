import { Crown } from "lucide-react";
import React from "react";

const top3 = [
  { rank: 2, name: "User 2", avatar: "/src/assets/images/profile.svg" },
  { rank: 1, name: "User 1", avatar: "/src/assets/images/profile.svg" },
  { rank: 3, name: "User 3", avatar: "/src/assets/images/profile.svg" },
];

const others = [
  { rank: 4, name: "User 4" },
  { rank: 5, name: "User 5" },
  { rank: 6, name: "User 6" },
];

export default function Leaderboard() {
  return (
    <div className="max-w-md mx-auto px-4 py-2 font-[yapari]">
      {/* 1~3등 */}
      <div className="flex justify-around items-end mb-4">
        {/* 2등 */}
        <div className="flex flex-col items-center gap-1">
          <img src={top3[0].avatar} className="w-12 h-12 rounded-full " />
          <p className="text-sm">{top3[0].name}</p>
          <p className="text-xs text-white">2342</p>
        </div>

        {/* 1등 */}
        <div className="flex flex-col items-center mb-10 gap-1 relative">
          <div className="absolute -top-5">
            <Crown className="w-8 h-8" fill="#d0f700" />
          </div>
          <img src={top3[1].avatar} className="w-14 h-14 rounded-full " />
          <p className="text-sm">{top3[1].name}</p>
          <p className="text-xs text-white">2342</p>
        </div>

        {/* 3등 */}
        <div className="flex flex-col items-center gap-1">
          <img src={top3[2].avatar} className="w-12 h-12 rounded-full " />
          <p className="text-sm">{top3[2].name}</p>
          <p className="text-xs text-white">2342</p>
        </div>
      </div>

      <div className="space-y-1">
        {others.map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between bg-[color:var(--bg-color-80)] rounded-lg px-4 py-2 text-sm"
          >
            <div className="flex gap-4">
              <span>#{user.rank}</span>
              <span className="text-white">{user.name}</span>
            </div>
            <span>238</span>
          </div>
        ))}
      </div>
    </div>
  );
}
