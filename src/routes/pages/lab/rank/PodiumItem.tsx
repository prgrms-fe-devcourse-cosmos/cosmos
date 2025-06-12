import React from "react";
import { Player } from "../../../../types/player";
import { Crown } from "lucide-react";

export default function PodiumItem({
  index,
  player,
}: {
  index: number;
  player: Player;
}) {
  if (index === 1) {
    return (
      <div className="flex flex-col items-center mb-10 gap-1 relative">
        <div className="absolute -top-5">
          <Crown className="w-8 h-8" fill="#d0f700" />
        </div>
        <img src={player.avatar} className="w-14 h-14 rounded-full" />
        <p className="text-sm">{player.name}</p>
        <p className="text-xs text-white">{player.score}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <img src={player.avatar} className="w-12 h-12 rounded-full" />
      <p className="text-sm">{player.name}</p>
      <p className="text-xs text-white">{player.score}</p>
    </div>
  );
}
