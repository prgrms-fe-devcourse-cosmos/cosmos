import { useEffect, useState } from "react";
import { deleteReviewById, updateReviewById } from "../../../api/lounge/review";
import { Star } from "lucide-react";
import supabase from "../../../utils/supabase";
import ReviewLikeButton from "../../lounge/films/ReviewLikeButton";

type Props = {
  reviews: MovieReviewWithLike[];
  onLikeToggle?: (reviewId: number, liked: boolean) => void;
  setReviews: React.Dispatch<React.SetStateAction<MovieReviewWithLike[]>>;
};

export default function ReviewList({
  reviews,
  onLikeToggle,
  setReviews,
}: Props) {
  // 상태 추가
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id ?? null);
    };

    fetchUser();
  }, []);

  // 한국 시간대로 날짜 포맷 함수
  function formatKoreanDateTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    });
  }

  // 리뷰 삭제
  const handleDelete = async (reviewId: number) => {
    const confirmDelete = window.confirm("리뷰를 삭제하시겠습니까?");
    if (!confirmDelete || !currentUserId) return;

    try {
      await deleteReviewById(reviewId, currentUserId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (e) {
      alert("삭제 중 오류가 발생했습니다.");
      console.error(e);
    }
  };

  // 리뷰 수정
  const handleEditClick = (review: MovieReviewWithLike) => {
    setEditingReviewId(review.id);
    setEditedContent(review.content);
    setEditedRating(review.rating);
  };

  // 리뷰 수정 저장 핸들러
  const handleSave = async (reviewId: number) => {
    if (!currentUserId) return;
    try {
      await updateReviewById(
        reviewId,
        editedContent,
        editedRating,
        currentUserId
      );

      // 성공 시 상태 업데이트
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, content: editedContent, rating: editedRating }
            : r
        )
      );
      setEditingReviewId(null);
    } catch (e) {
      console.error(e);
    }
  };

  // 리뷰 없을 때 보여질 내용
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-[#909090] mb-[24px]">아직 작성된 리뷰가 없습니다.</p>
    );
  }

  return (
    <div className="mb-[28px]">
      {reviews.map((review) => (
        <div
          key={review.id}
          className={`py-[12px] flex flex-col gap-[12px] px-2 rounded-[8px]
          ${review.profile_id === currentUserId ? "bg-white/5" : ""}`}
        >
          {/* 유저 정보 + 작성일 + 별점 + 수정/삭제/저장/취소 */}
          <div className="flex justify-between">
            <div className="flex gap-4">
              <h3 className="text-[13px] lg:text-[15px] font-bold">
                {review.profiles.username}
              </h3>
              <p className="text-[12px] lg:text-[14px]">
                {formatKoreanDateTime(review.created_at)}
              </p>
              {/* 별점 */}
              {editingReviewId === review.id ? (
                <div className="flex gap-1 items-center">
                  {[1, 2, 3, 4, 5].map((i) => {
                    const value = i * 2;
                    const isFilled = hoverRating
                      ? hoverRating >= value
                      : editedRating >= value;
                    return (
                      <Star
                        key={i}
                        size={16}
                        className="cursor-pointer text-[#D0F700]"
                        fill={isFilled ? "currentColor" : "none"}
                        onClick={() => setEditedRating(value)}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  {Array.from({ length: 5 }, (_, i) => {
                    const isFilled = i < Math.round(review.rating / 2);
                    return (
                      <Star
                        key={i}
                        size={16}
                        className="text-[#D0F700]"
                        fill={isFilled ? "currentColor" : "none"}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {review.profile_id === currentUserId && (
              <div className="text-[#909090] font-medium text-[12px]">
                {editingReviewId === review.id ? (
                  <>
                    <button
                      onClick={() => handleSave(review.id)}
                      className="mr-2 md:mr-4 hover:text-white"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingReviewId(null)}
                      className="hover:text-white"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() => handleEditClick(review)}
                      className="mr-2 md:mr-4 cursor-pointer hover:text-white"
                    >
                      수정
                    </span>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="cursor-pointer hover:text-white"
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {editingReviewId === review.id ? (
            <input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full px-2 py-1 bg-transparent 
              border-b border-white/80 text-white text-sm md:text-[16px]
              focus:outline-none"
            />
          ) : (
            <p className="text-sm md:text-[16px]">{review.content}</p>
          )}

          <div
            className={`transition-opacity ${
              editingReviewId === review.id
                ? "opacity-40 pointer-events-none"
                : ""
            }`}
          >
            <ReviewLikeButton
              reviewId={review.id}
              onLikeToggle={onLikeToggle}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
