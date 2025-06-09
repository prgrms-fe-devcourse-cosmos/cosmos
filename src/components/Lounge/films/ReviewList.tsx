import filledStar from "../../../assets/icons/filled_star.svg";
import star from "../../../assets/icons/star.svg";
import ReviewLikeButton from "./ReviewLikeButton";

type Props = {
  reviews: MovieReviewWithLike[];
  onLikeToggle?: (reviewId: number, liked: boolean) => void;
};

export default function ReviewList({ reviews, onLikeToggle }: Props) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-[#8b949e]">아직 작성된 리뷰가 없습니다.</p>;
  }

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

  // 별
  function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.round(rating / 2);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const starSrc = i < fullStars ? filledStar : star;
      stars.push(
        <img
          key={i}
          src={starSrc}
          alt={i < fullStars ? "Filled star" : "Empty star"}
          className="w-[16px] h-[16px]"
        />
      );
    }

    return <div className="flex gap-1 items-center">{stars}</div>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <div
          className="border border-blue-900 mb-[24px] flex flex-col gap-[12px]"
          key={review.id}
        >
          <div className="flex justify-between">
            {/* 리뷰 작성자, 작성일, 별 */}
            <div className="flex gap-4">
              <h3 className="font-bold">{review.profiles.username}</h3>
              <p>{formatKoreanDateTime(review.created_at)}</p>
              <StarRating rating={review.rating} />
            </div>
            {/* 작성자일경우 수정/삭제 */}
            <div className="text-[#909090] font-medium text-[12px]">
              <span className="mr-4 cursor-pointer">수정</span>
              <span className="cursor-pointer">삭제</span>
            </div>
          </div>
          {/* 리뷰 내용 */}
          <p>{review.content}</p>
          {/* 리뷰 좋아요 */}
          <div>
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
