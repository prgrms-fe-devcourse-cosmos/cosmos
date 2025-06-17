import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { createReview, ensureMovieExists } from "../../../api/films/review";
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
  const [isLogin, setIsLogin] = useState(false);
  const [loginNotice, setLoginNotice] = useState(false);
  const isInputActive = content.trim() && rating > 0;

  useEffect(() => {
    const checkLogin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLogin(!!user);
    };

    checkLogin();
  }, []);

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
          className="cursor-pointer text-[#D0F700] transition-all pr-1 w-4 h-4 md:w-5 md:h-5"
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
      <div className="w-full flex">
        <input
          value={content}
          onFocus={() => {
            if (!isLogin) {
              setLoginNotice(true);
            }
          }}
          onChange={(e) => {
            setContent(e.target.value);
            setError("");
          }}
          placeholder="리뷰를 입력하세요"
          type="text"
          className={` w-[80%] pl-4 pr-2 py-2 md:py-3 
                  border-r-0 border-1 rounded-bl-[8px] rounded-tl-[8px] focus:outline-none text-xs md:text-sm
          ${error || loginNotice ? "border-[#E24413]" : "border-white"}`}
        />
        <button
          onClick={handleSubmit}
          disabled={!isInputActive}
          className={`w-[20%] py-2 md:py-3 border-1 rounded-br-lg rounded-tr-lg cursor-pointer border-[color:var(--primary-300)] font-[yapari]  text-[10px] md:text-sm  ${
            isInputActive
              ? "bg-[color:var(--primary-300)] text-black font-medium"
              : "text-[color:var(--gray-200)] cursor-not-allowed"
          }`}
        >
          ENTER
        </button>
        {error && (
          <p className="text-[#E24413] text-[12px] mt-1 pl-2">{error}</p>
        )}
      </div>
    </div>
  );
}
