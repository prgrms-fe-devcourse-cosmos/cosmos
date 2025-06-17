import { Player } from "../../../types/player";
import { useAuthStore } from "../../../stores/authStore";

export default function LeaderboardItem({
  rank,
  player,
}: {
  rank: number;
  player: Player;
}) {
  const currentUserId = useAuthStore((state) => state.userData?.id);
  return (
    <div className="flex items-center justify-between bg-[color:var(--bg-color-80)] rounded-lg px-4 py-2 text-sm">
      <div className="flex gap-4">
        <span>#{rank}</span>
        <span
          className={` font-[helvetica-neue] ${
            currentUserId === player.id
              ? "text-[color:var(--primary-300)]"
              : "text-white"
          }`}
        >
          {player.username}
        </span>
      </div>
      <span>{player.total_score}</span>
    </div>
  );
}
