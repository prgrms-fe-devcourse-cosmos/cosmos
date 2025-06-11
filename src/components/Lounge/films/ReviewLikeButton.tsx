import { useEffect, useState } from "react";
import heart from "../../../assets/icons/heart.svg";
import fillHeart from "../../../assets/icons/filled_heart.svg";
import {
  addReviewLike,
  fetchReviewLikeCount,
  fetchReviewLikeStatus,
  removeReviewLike,
} from "../../../api/lounge/review";

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
        const [status, count] = await Promise.all([
          fetchReviewLikeStatus(reviewId),
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
      if (!liked) {
        await addReviewLike(reviewId);
        setLiked(true);
        setLikeCount((prev) => prev + 1);
        onLikeToggle?.(reviewId, true);
      } else {
        await removeReviewLike(reviewId);
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
      <img
        src={liked ? fillHeart : heart}
        alt="좋아요"
        className="w-[16px] h-[16px]"
      />
      <span>{likeCount}</span>
    </button>
  );
}
