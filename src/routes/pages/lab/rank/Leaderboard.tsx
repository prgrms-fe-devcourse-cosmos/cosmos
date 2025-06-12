import React from "react";
import { Player } from "../../../../types/player";
import LeaderboardList from "../../../../components/lab/rank/LeaderboardList";
import TopThreeLeaderboard from "../../../../components/lab/rank/TopThreeLeaderboard";

type LeaderboardProps = {
  allPlayers: Player[];
};

export default function Leaderboard({ allPlayers }: LeaderboardProps) {
  const top3 = allPlayers.slice(0, 3);
  const others = allPlayers.slice(3);
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
