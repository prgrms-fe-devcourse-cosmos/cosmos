import React from "react";
import { Player } from "../../../types/player";
import { Crown } from "lucide-react";

export default function PodiumItem({
  index,
  player,
}: {
  index: number;
  player: Player;
}) {
  if (index === 0) {
    return (
      <div className="flex flex-col items-center mb-4 gap-1 relative">
        <div className="absolute -top-4">
          <Crown className="w-6 h-6" fill="#d0f700" />
        </div>
        <img src={player.avatar_url} className="w-12 h-12 rounded-full" />
        <p className="font-[helvetica-neue] py-1">{player.username}</p>
        <p className="text-xs text-white">{player.total_score}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <img src={player.avatar_url} className="w-11 h-11 rounded-full" />
      <p className=" font-[helvetica-neue]">{player.username}</p>
      <p className="text-xs text-white">{player.total_score}</p>
    </div>
  );
}
