import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  addReviewLike,
  fetchReviewLikeCount,
  fetchReviewLikeStatus,
  removeReviewLike,
} from "../../../api/lounge/review";
import supabase from "../../../utils/supabase";

type Props = {
  reviewId: number;
  onLikeToggle?: (reviewId: number, liked: boolean) => void;
};

export default function ReviewLikeButton({ reviewId, onLikeToggle }: Props) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const profileId = user.id;

        const [status, count] = await Promise.all([
          fetchReviewLikeStatus(reviewId, profileId),
          fetchReviewLikeCount(reviewId),
        ]);

        setLiked(status);
        setLikeCount(count);
      } catch (err) {
        console.error("좋아요 정보 가져오기 실패:", err);
      }
    };

    fetchData();
  }, [reviewId]);

  // 좋아요 토글
  const handleToggleLike = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }
      const profileId = user.id;

      if (!liked) {
        await addReviewLike(reviewId, profileId);
        setLiked(true);
        setLikeCount((prev) => prev + 1);
        onLikeToggle?.(reviewId, true);
      } else {
        await removeReviewLike(reviewId, profileId);
        setLiked(false);
        setLikeCount((prev) => prev - 1);
        onLikeToggle?.(reviewId, false);
      }
    } catch (err) {
      console.error("좋아요 토글 실패:", err);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      className="flex items-center gap-[12px] cursor-pointer"
    >
      <Heart
        size={16}
        className="transition-all text-[#D0F700]"
        fill={liked ? "currentColor" : "none"}
      />
      <span className="text-[12px] md:text-sm">{likeCount}</span>
    </button>
  );
}
