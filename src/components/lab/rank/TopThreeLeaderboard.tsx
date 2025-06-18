import { Player } from "../../../types/player";
import PodiumItem from "./PodiumItem";
import PodiumItemSkeleton from "./PodiumItemSkeleton";

type TopThreeLeaderboardProps = {
  players: Player[];
  isLoading?: boolean;
};

export default function TopThreeLeaderboard({
  players,
  isLoading = false,
}: TopThreeLeaderboardProps) {
  const order = [1, 0, 2];
  return (
    <>
      <div className="flex justify-around items-end mb-4">
        {isLoading
          ? order.map((i) => <PodiumItemSkeleton key={i} />)
          : order.map(
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
