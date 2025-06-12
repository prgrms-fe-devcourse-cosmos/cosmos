import React from "react";
import { Player } from "../../../../types/player";
import LeaderboardItem from "./LeaderboardItem";

type LeaderboardListProps = {
  players: Player[];
};

export default function LeaderboardList({ players }: LeaderboardListProps) {
  return (
    <>
      <div className="space-y-1">
        {players.map((player, i) => (
          <LeaderboardItem key={player.name} player={player} rank={i + 4} />
        ))}
      </div>
    </>
  );
}
