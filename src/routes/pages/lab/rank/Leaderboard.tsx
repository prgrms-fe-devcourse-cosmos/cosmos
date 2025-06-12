import React from "react";
import TopThreeLeaderboard from "./TopThreeLeaderboard";
import { Player } from "../../../../types/player";
import LeaderboardList from "./LeaderboardList";

const top3: Player[] = [
  { name: "User 2", avatar: "/src/assets/images/profile.svg", score: 1238 },
  { name: "User 1", avatar: "/src/assets/images/profile.svg", score: 2423 },
  { name: "User 3", avatar: "/src/assets/images/profile.svg", score: 875 },
];

const others = [
  { name: "User 4", avatar: "/src/assets/images/profile.svg", score: 768 },
  { name: "User 5", avatar: "/src/assets/images/profile.svg", score: 437 },
  { name: "User 6", avatar: "/src/assets/images/profile.svg", score: 231 },
  { name: "User 7", avatar: "/src/assets/images/profile.svg", score: 120 },
  { name: "User 8", avatar: "/src/assets/images/profile.svg", score: 98 },
  { name: "User 9", avatar: "/src/assets/images/profile.svg", score: 98 },
  { name: "User 10", avatar: "/src/assets/images/profile.svg", score: 98 },
];

export default function Leaderboard() {
  return (
    <div className="max-w-md mx-auto px-4 pt-4 font-[yapari] h-full flex flex-col">
      {/* 1~3등 */}
      <TopThreeLeaderboard players={top3} />
      {/* 나머지 */}
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
        <LeaderboardList players={others} />
      </div>
    </div>
  );
}
