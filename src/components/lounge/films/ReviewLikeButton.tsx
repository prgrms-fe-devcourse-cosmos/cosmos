import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  addReviewLike,
  fetchReviewLikeCount,
  fetchReviewLikeStatus,
  removeReviewLike,
} from "../../../api/films/review";
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
        // 좋아요 개선
        // 좋아요 수는 항상 조회
        const count = await fetchReviewLikeCount(reviewId);
        setLikeCount(count);

        // 로그인한 경우에만 좋아요 상태 변경 가능
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const profileId = user.id;
          const status = await fetchReviewLikeStatus(reviewId, profileId);
          setLiked(status);
        }
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
        className="transition-all text-[#D0F700] w-3 h-3 md:w-4 md:h-4"
        fill={liked ? "currentColor" : "none"}
      />
      <span className="text-[10px] md:text-xs pt-[2px]">{likeCount}</span>
    </button>
  );
}
