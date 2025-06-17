import { Player } from '../../../types/player';
import { Crown } from 'lucide-react';
import { useAuthStore } from '../../../stores/authStore';

export default function PodiumItem({
  index,
  player,
}: {
  index: number;
  player: Player;
}) {
  const currentUser = useAuthStore((state) => state.userData);
  const defaultAvatar = '/images/cosmos/alien.svg';
  if (index === 0) {
    return (
      <div className="flex flex-col items-center mb-4 gap-1 relative">
        <div className="absolute -top-4">
          <Crown className="w-6 h-6" fill="#d0f700" />
        </div>
        <img
          src={player.avatar_url || defaultAvatar}
          className="w-12 h-12 rounded-full"
        />
        <p
          className={`font-[helvetica-neue] py-1 ${
            currentUser?.id === player.id
              ? 'text-[color:var(--primary-300)]'
              : 'text-white'
          }`}
        >
          {player.username}
        </p>
        <p className="text-xs text-white">{player.total_score}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <img
        src={player.avatar_url || defaultAvatar}
        className="w-11 h-11 rounded-full"
      />
      <p
        className={`font-[helvetica-neue] ${
          currentUser?.id === player.id
            ? 'text-[color:var(--primary-300)]'
            : 'text-white'
        }`}
      >
        {player.username}
      </p>
      <p className="text-xs text-white">{player.total_score}</p>
    </div>
  );
}
