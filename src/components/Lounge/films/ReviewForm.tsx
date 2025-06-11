import { useState } from "react";
import Button from "../../common/Button";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { createReview, ensureMovieExists } from "../../../api/lounge/review";
import supabase from "../../../utils/supabase";

type Props = {
  onReviewSubmit?: (review: MovieReviewWithLike) => void;
};

export default function ReviewForm({ onReviewSubmit }: Props) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { id } = useParams();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!id) {
      alert("영화 ID가 없습니다.");
      return;
    }

    const movieId = Number(id);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }
      const profileId = user.id;

      await ensureMovieExists(movieId); // 영화 존재 확인
      const newReview = await createReview(movieId, content, rating, profileId);

      // 새 리뷰를 상위 컴포넌트로 전달
      onReviewSubmit?.(newReview);

      alert("리뷰 등록 완료");
      setContent("");
      setRating(0);
    } catch (e: unknown) {
      console.error(e);

      // 유니크 제약 조건 위반 체크
      if (e instanceof Error) {
        const message = e.message;

        if (
          message.includes("duplicate key") ||
          message.includes("unique constraint")
        ) {
          setError("이미 해당 영화에 리뷰를 작성하셨습니다.");
        } else {
          setError("리뷰 등록 중 오류가 발생했습니다.");
        }
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
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
        <Star
          key={i}
          size={20}
          className="cursor-pointer text-[#D0F700] transition-all pr-1"
          fill={isFilled ? "currentColor" : "none"}
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
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setError("");
          }}
          placeholder="리뷰를 입력하세요"
          type="text"
          className={`w-full pl-4 sm:pl-[24px] h-[49px] md:h-[51px] 
          border rounded-[8px] focus:outline-none
          ${error ? "border-[#E24413]" : "border-white"}`}
        />
        <Button
          onClick={handleSubmit}
          variant={content.trim() && rating > 0 ? "neon_filled" : "disabled"}
          className="border-[#D0F700] w-[106px] sm:w-[126px] md:w-[136px] h-[49px] md:h-[51px] 
                      absolute right-0 top-0 rounded-tl-none rounded-bl-none text-[12px] md:text-[14px]"
        >
          ENTER
        </Button>
        {error && (
          <p className="text-[#E24413] text-[12px] mt-1 pl-2">{error}</p>
        )}
      </div>
    </div>
  );
}
