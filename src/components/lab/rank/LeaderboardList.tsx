import { Player } from "../../../types/player";
import LeaderboardItem from "./LeaderboardItem";
import LeaderboardListSkeleton from "./LeaderboardListSkeleton";

type LeaderboardListProps = {
  players: Player[];
  isLoading?: boolean;
};

export default function LeaderboardList({
  players,
  isLoading = false,
}: LeaderboardListProps) {
  return (
    <>
      {isLoading ? (
        <div>
          <LeaderboardListSkeleton />
          <LeaderboardListSkeleton />
          <LeaderboardListSkeleton />
          <LeaderboardListSkeleton />
        </div>
      ) : (
        <div className="space-y-1">
          {players.map((player, i) => (
            <LeaderboardItem
              key={player.username}
              player={player}
              rank={i + 4}
            />
          ))}
        </div>
      )}
    </>
  );
}
