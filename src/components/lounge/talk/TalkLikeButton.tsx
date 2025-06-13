import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useTalkStore } from "../../../stores/talkStore";
import { useAuthStore } from "../../../stores/authStore";

interface TalkLikeButtonProps {
  postId: number;
  initialCount: number;
}

export default function TalkLikeButton({
  postId,
  initialCount,
}: TalkLikeButtonProps) {
  const user = useAuthStore((state) => state.user);
  const { likedPostIds, checkLikeStatus, toggleLike, likedLoading } =
    useTalkStore();
  const [likeCount, setLikeCount] = useState(initialCount);

  const isLiked = likedPostIds.includes(postId);

  useEffect(() => {
    if (user) {
      checkLikeStatus(postId, user.id);
    }
  }, [postId, user]);

  const handleClick = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 낙관적 카운트도 같이 반영
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }

    await toggleLike(postId, user.id);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center"
      disabled={likedLoading}
    >
      <Heart
        size={15}
        className="text-[#D0F700]"
        fill={isLiked ? "#D0F700" : "none"}
      />
      <span className="ml-2 text-[13px]">{likeCount}</span>
    </button>
  );
}
