import { useState } from "react";
import Button from "../../common/Button";
import { useParams } from "react-router-dom";
import supabase from "../../../utils/supabase";
import filledStar from "../../../assets/icons/filled_star.svg";
import star from "../../../assets/icons/star.svg";

export default function ReviewForm() {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { id } = useParams();

  // 임시로 넣은 profile_id
  const examProfileId = "0a3b30d8-1899-4eef-9cb7-6a9d8cc0b4da";

  const handleSubmit = async () => {
    if (!id) {
      alert("영화 ID가 없습니다.");
      return;
    }

    const movieId = Number(id);

    // movie 테이블에 해당 ID가 존재하는지 확인
    const { data: existingMovie, error: fetchError } = await supabase
      .from("movie")
      .select("tmdb_id")
      .eq("tmdb_id", movieId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("영화 확인 실패", fetchError.message);
      alert("영화 확인 중 오류가 발생했습니다.");
      return;
    }

    // 존재하지 않으면 movie 테이블에 추가
    if (!existingMovie) {
      const { error: insertError } = await supabase.from("movie").insert({
        tmdb_id: movieId,
      });

      if (insertError) {
        console.error("영화 추가 실패", insertError.message);
        alert("영화 정보 등록 실패");
        return;
      }
    }

    // 리뷰 등록
    const { error } = await supabase.from("movie_reviews").insert({
      profile_id: examProfileId,
      movie_id: movieId,
      content,
      rating,
    });

    if (error) {
      alert("리뷰 등록 실패");
      console.error(error.message);
    } else {
      alert("리뷰 등록 완료");
      setContent("");
      setRating(0);
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
