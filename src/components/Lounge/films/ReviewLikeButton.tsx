import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import heart from "../../../assets/icons/heart.svg";
import fillHeart from "../../../assets/icons/filled_heart.svg";

type Props = {
  reviewId: number;
  onLikeToggle?: (reviewId: number, liked: boolean) => void;
};

export default function ReviewLikeButton({ reviewId, onLikeToggle }: Props) {
  const TEMP_PROFILE_ID = "0a3b30d8-1899-4eef-9cb7-6a9d8cc0b4da"; // 임시 사용자 ID
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const { data, error } = await supabase
        .from("review_likes")
        .select("id")
        .eq("review_id", reviewId)
        .eq("profile_id", TEMP_PROFILE_ID);

      if (error) {
        console.error("좋아요 여부 확인 실패:", error);
        setLiked(false);
        return;
      }

      setLiked((data ?? []).length > 0);
    };

    const fetchLikeCount = async () => {
      const { count, error } = await supabase
        .from("review_likes")
        .select("id", { count: "exact", head: true })
        .eq("review_id", reviewId);

      if (error) {
        console.error("좋아요 수 확인 실패:", error);
        setLikeCount(0);
        return;
      }

      setLikeCount(count ?? 0);
    };

    fetchLikeStatus();
    fetchLikeCount();
  }, [reviewId]);

  const handleToggleLike = async () => {
    if (!liked) {
      await supabase.from("review_likes").insert({
        review_id: reviewId,
        profile_id: TEMP_PROFILE_ID,
      });
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      onLikeToggle?.(reviewId, true);
    } else {
      await supabase
        .from("review_likes")
        .delete()
        .eq("review_id", reviewId)
        .eq("profile_id", TEMP_PROFILE_ID);
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      onLikeToggle?.(reviewId, false);
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
