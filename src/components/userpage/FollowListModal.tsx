import { Link } from "react-router-dom";
import FollowButton from "../common/FollowButton";
import { LucideX } from "lucide-react";

type FollowListModalProps = {
  title: "Followers" | "Following";
  list: Profile[];
  isOwner: boolean;
  currentUserId: string | null;
  onClose: () => void;
  onFollowChange?: (targetId: string, newStatus: boolean) => void;
};

export default function FollowListModal({
  title,
  list,
  isOwner,
  currentUserId,
  onClose,
  onFollowChange,
}: FollowListModalProps) {
  const defaultImg = "/images/cosmos/alien.svg";

  return (
    <div className="flex flex-col gap-4 absolute my-1 border border-[var(--gray-300)] z-1 rounded-lg px-5 py-4 w-70 h-55 bg-[var(--bg-color)] overflow-scroll scrollbar-hide">
      <div className="flex justify-between items-center">
        <div className="font-yapari text-sm text-[var(--primary-300)]">
          {title}
        </div>
        <button type="button" className="cursor-pointer" onClick={onClose}>
          <LucideX size={16} color="#FFFFFF" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {list.length === 0 ? (
          <div className="text-center text-sm text-[var(--gray-200)]">
            {title === "Followers"
              ? "팔로워가 없습니다."
              : "팔로잉 중인 유저가 없습니다."}
          </div>
        ) : (
          list.map((item) => {
            const isMe = currentUserId === item.id;
            return (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <img
                    src={item.avatar_url || defaultImg}
                    alt=""
                    className="size-6 rounded-full"
                  />
                  <div className="w-24 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    <Link
                      to={`/user/${item.usercode}`}
                      className="text-sm text-white"
                    >
                      {item.username}
                    </Link>
                  </div>
                </div>
                {!isMe && (
                  <FollowButton
                    followingId={item.id}
                    onFollowChange={(newStatus) => {
                      if (isOwner) {
                        onFollowChange?.(item.id, newStatus);
                      }
                    }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
