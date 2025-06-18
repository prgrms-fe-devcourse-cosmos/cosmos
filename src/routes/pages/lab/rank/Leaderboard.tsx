import { Player } from "../../../../types/player";
import LeaderboardList from "../../../../components/lab/rank/LeaderboardList";
import TopThreeLeaderboard from "../../../../components/lab/rank/TopThreeLeaderboard";

type LeaderboardProps = {
  allPlayers: Player[];
  isLoading?: boolean;
};

export default function Leaderboard({
  allPlayers,
  isLoading = false,
}: LeaderboardProps) {
  const top3 = isLoading ? [] : allPlayers.slice(0, 3);
  const others = isLoading ? [] : allPlayers.slice(3);
  return (
    <div className="max-w-md mx-auto px-4 pt-4 font-[yapari] h-full flex flex-col">
      {/* 1~3등 */}
      <TopThreeLeaderboard players={top3} isLoading={isLoading} />
      {/* 나머지 */}
      <div className="flex-1 overflow-y-auto min-h-0 max-h-55 scrollbar-hide">
        <LeaderboardList players={others} isLoading={isLoading} />
      </div>
    </div>
  );
}
