import React from "react";
import { Player } from "../../../../types/player";
import PodiumItem from "./PodiumItem";

type TopThreeLeaderboardProps = {
  players: Player[];
};

export default function TopThreeLeaderboard({
  players,
}: TopThreeLeaderboardProps) {
  return (
    <>
      <div className="flex justify-around items-end mb-4">
        {players.map((player, i) => (
          <PodiumItem key={player.name} index={i} player={player} />
        ))}
      </div>
    </>
  );
}
