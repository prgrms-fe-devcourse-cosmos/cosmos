import React from "react";
import { Player } from "../../../types/player";
import PodiumItem from "./PodiumItem";

type TopThreeLeaderboardProps = {
  players: Player[];
};

export default function TopThreeLeaderboard({
  players,
}: TopThreeLeaderboardProps) {
  const order = [1, 0, 2];
  return (
    <>
      <div className="flex justify-around items-end mb-4">
        {order.map(
          (i) =>
            players[i] && (
              <PodiumItem
                key={players[i].username}
                index={i}
                player={players[i]}
              />
            )
        )}
      </div>
    </>
  );
}
