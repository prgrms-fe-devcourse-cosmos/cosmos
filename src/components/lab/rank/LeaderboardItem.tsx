import React from "react";
import { Player } from "../../../types/player";

export default function LeaderboardItem({
  rank,
  player,
}: {
  rank: number;
  player: Player;
}) {
  return (
    <div className="flex items-center justify-between bg-[color:var(--bg-color-80)] rounded-lg px-4 py-2 text-sm">
      <div className="flex gap-4">
        <span>#{rank}</span>
        <span className="text-white font-[helvetica-neue]">
          {player.username}
        </span>
      </div>
      <span>{player.total_score}</span>
    </div>
  );
}
