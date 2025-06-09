import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useMovieDetailStore } from "../../../stores/movieStore";
import { useEffect } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import FilmDetailSkeleton from "./FilmDetailSkeleton";
import backIcon from "../../../assets/icons/back.svg";

export default function FilmsDetail() {
  const { id } = useParams();
  const { detail, fetchDetail, loading } = useMovieDetailStore();
  const navigate = useNavigate();

  // review
  const reviews = useLoaderData() as MovieReview[];

  useEffect(() => {
    if (id) fetchDetail(id);
  }, [id]);

  if (loading || !detail) return <FilmDetailSkeleton />;

  // 개봉날짜 포맷 함수
  const formatKoreanDate = (date: string) => {
    const [y, m, d] = date.split("-");
    return `${y}년 ${m}월 ${d}일`;
  };

  const director =
    detail.credits.crew.find((c) => c.job === "Director")?.name ||
    "감독 정보 없음";

  // 배우 3명만 보여지도록
  const cast = detail.credits.cast.slice(0, 3);
  const runtime = `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`;

  return (
    <div className="pt-[24px] bg-[#141414]/80">
      {/* movie detail */}
      <div className="pl-[32px] pr-[12px]">
        {/* 필름 헤더 - 뒤로가기버튼, 장르배열 */}
        <div className="flex justify-between">
          {/* 뒤로가기 */}
          <div>
            <button
              className="font-yapari text-[#D0F700] py-4 cursor-pointer flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <img src={backIcon} alt="뒤로가기 아이콘" /> BACK
            </button>
          </div>
          {/* 장르 배열 */}
          <div className="flex items-center">
            {detail.genres.slice(0, 4).map((genre) => (
              <span
                key={genre.id}
                className="font-yapari border border-[#D0F700] text-[#D0F700] text-[12px] px-4 py-2 rounded-[8px] ml-4 first:ml-0"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        {/* 포스터 + 영화 정보 */}
        <div className="mt-1 flex gap-4">
          {/* 포스터 */}
          <div className="w-[300px] h-[430px] flex-shrink-0">
            {detail.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt={detail.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {/* 영화 정보 */}
          <div className="flex flex-col justify-between h-[430px]">
            {/* 제목 */}
            <h2 className="text-[36px] font-bold text-white leading-tight">
              {detail.title}
            </h2>
            {/* 줄거리 영역 */}
            <div className="flex-grow flex items-center max-h-[120px]">
              <p className="truncate-multiline leading-[30px] h-full">
                {detail.overview}
              </p>
            </div>
            {/* 세부 정보 */}
            <div className="space-y-4">
              <div className="flex">
                <p className="w-[142px] shrink-0">Release.</p>
                <p>{formatKoreanDate(detail.release_date)}</p>
              </div>
              <div className="flex ">
                <p className="w-[142px] shrink-0">Casting.</p>
                <p className="">{cast.map((a) => a.name).join(", ")}</p>
              </div>
              <div className="flex ">
                <p className="w-[142px] shrink-0">Directed By.</p>
                <p>{director}</p>
              </div>
              <div className="flex ">
                <p className="w-[142px] shrink-0">Production.</p>
                <p>
                  {detail.production_companies.length > 0
                    ? detail.production_companies.map((p) => p.name).join(", ")
                    : "Production company information is not available for this film."}
                </p>
              </div>
              <div className="flex">
                <span className="w-[142px] shrink-0">Running Time.</span>
                <span>{runtime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* review */}
      <div className="mt-[60px] px-[32px] pb-[24px] border border-red-800">
        {/* review header */}
        <div className="flex justify-between mb-[40px]">
          <h3 className="text-[#D0F700] font-medium text-[16px]">
            REVIEW ({reviews.length})
          </h3>
          <ul className="flex items-center gap-4 text-[13px]">
            <li>좋아요순</li>
            <li>최신순</li>
          </ul>
        </div>
        <ReviewList reviews={reviews} />
        <ReviewForm />
      </div>
    </div>
  );
}
