import { useState } from "react";
import Button from "../../common/Button";
import { useParams } from "react-router-dom";
import filledStar from "../../../assets/icons/filled_star.svg";
import star from "../../../assets/icons/star.svg";
import { createReview, ensureMovieExists } from "../../../api/review";

type Props = {
  onReviewSubmit?: (review: MovieReviewWithLike) => void;
};

export default function ReviewForm({ onReviewSubmit }: Props) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { id } = useParams();

  const handleSubmit = async () => {
    if (!id) {
      alert("영화 ID가 없습니다.");
      return;
    }

    const movieId = Number(id);

    try {
      await ensureMovieExists(movieId); // 영화 존재 확인
      // await createReview(movieId, content, rating); // 리뷰 등록
      const newReview = await createReview(movieId, content, rating);

      // 새 리뷰를 상위 컴포넌트로 전달
      onReviewSubmit?.(newReview);

      alert("리뷰 등록 완료");
      setContent("");
      setRating(0);
    } catch (e) {
      console.error(e);
    }
  };

  // 별 렌더링 함수
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = (i + 1) * 2;
      const isFilled = hoverRating
        ? hoverRating >= starValue
        : rating >= starValue;

      return (
        <img
          key={i}
          src={isFilled ? filledStar : star}
          alt={isFilled ? "별" : "빈별"}
          className="w-[20px] h-[16px] cursor-pointer transition-all pr-1"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
        />
      );
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-[16px] flex">{renderStars()}</div>
      <div className="w-full relative">
        <input
          onChange={(e) => setContent(e.target.value)}
          placeholder="리뷰를 입력하세요"
          type="text"
          className="w-full pl-[24px] h-[51px] border border-white rounded-[8px]"
        />
        <Button
          onClick={handleSubmit}
          variant={content.trim() && rating > 0 ? "neon_filled" : "disabled"}
          className="border-[#D0F700] w-[136px] h-[51px] absolute right-0 top-0 rounded-tl-none rounded-bl-none"
        >
          ENTER
        </Button>
      </div>
    </div>
  );
}
