import { useEffect, useState } from "react";
import {
  deleteReviewById,
  movieAvgRating,
  updateReviewById,
} from "../../../api/films/review";
import { Star, CircleAlert } from "lucide-react";
import supabase from "../../../utils/supabase";
import ReviewLikeButton from "../../lounge/films/ReviewLikeButton";
import Modal from "../../common/Modal";
import { MovieReviewWithLike } from "../../../types/movie";

type Props = {
  reviews: MovieReviewWithLike[];
  onLikeToggle?: (reviewId: number, liked: boolean) => void;
  setReviews: React.Dispatch<React.SetStateAction<MovieReviewWithLike[]>>;
  onAvgRatingUpdate?: (avg: number) => void;
  movieId: number;
};

export default function ReviewList({
  reviews,
  onLikeToggle,
  setReviews,
  onAvgRatingUpdate,
  movieId,
}: Props) {
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedDeleteReviewId, setSelectedDeleteReviewId] = useState<
    number | null
  >(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id ?? null);
    };
    fetchUser();
  }, []);

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

  const handleDelete = async (reviewId: number) => {
    if (!currentUserId || selectedDeleteReviewId === null) return;
    setIsDeleting(true);

    try {
      await deleteReviewById(reviewId, currentUserId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      const newAvg = await movieAvgRating(movieId);
      onAvgRatingUpdate?.(newAvg!);
    } catch (e) {
      console.error(e);
    } finally {
      setShowConfirmDeleteModal(false);
      setSelectedDeleteReviewId(null);
      setIsDeleting(false);
    }
  };

  const handleEditClick = (review: MovieReviewWithLike) => {
    setEditingReviewId(review.id);
    setEditedContent(review.content);
    setEditedRating(review.rating);
  };

  const handleSave = async (reviewId: number) => {
    if (!currentUserId) return;
    try {
      await updateReviewById(
        reviewId,
        editedContent,
        editedRating,
        currentUserId
      );
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, content: editedContent, rating: editedRating }
            : r
        )
      );
      setEditingReviewId(null);
      const newAvg = await movieAvgRating(movieId);
      onAvgRatingUpdate?.(newAvg!);
    } catch (e) {
      console.error(e);
    }
  };

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
          className={`py-[12px] flex flex-col gap-[8px] px-2 rounded-[8px] ${
            review.profile_id === currentUserId ? "bg-white/5" : ""
          }`}
        >
          <div className="flex items-start justify-between relative">
            {/* 이름 + rating */}
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className="text-xs md:text-sm lg:text-base font-bold text-white pt-[1px] max-w-[200px] truncate"
                  title={review.profiles.username}
                >
                  {review.profiles.username}
                </h3>

                {/* 별점 바로 옆 */}
                <div className="flex items-center">
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
                            className="cursor-pointer text-[color:var(--primary-300)]"
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
                            className="text-[color:var(--primary-300)] w-3 h-3 md:w-4 md:h-4"
                            fill={isFilled ? "currentColor" : "none"}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* 날짜는 이름 아래 */}
              <p className="text-[10px] md:text-sm text-xs text-[color:var(--gray-300)] mt-1">
                {formatKoreanDateTime(review.created_at)}
              </p>
            </div>

            {/* 수정/삭제 버튼: 오른쪽 끝 상단 고정 */}
            {review.profile_id === currentUserId && (
              <div
                className="absolute top-0.5 right-2 text-[#909090] font-medium md:text-sm text-xs flex
                sm:static sm:bg-transparent sm:p-0 sm:flex-row sm:text-inherit"
                style={{ position: "absolute" }}
              >
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
                      onClick={() => {
                        setShowConfirmDeleteModal(true);
                        setSelectedDeleteReviewId(review.id);
                      }}
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
              className="w-full px-2 py-1 bg-transparent border-b border-white/80 text-white text-sm md:text-[16px] focus:outline-none"
            />
          ) : (
            <p className="text-xs md:text-sm lg:text-base">{review.content}</p>
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
      {showConfirmDeleteModal && (
        <Modal
          icon={<CircleAlert size={32} color="var(--red)" />}
          title="정말 삭제하시겠습니까?"
          description="삭제 후 복구가 불가능합니다."
          confirmButtonText="DELETE"
          cancelButtonText="CANCEL"
          onConfirm={() => {
            if (selectedDeleteReviewId !== null) {
              handleDelete(selectedDeleteReviewId);
            }
          }}
          onCancel={() => {
            if (!isDeleting) setShowConfirmDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}
