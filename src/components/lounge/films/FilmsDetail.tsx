import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useMovieDetailStore } from "../../../stores/movieStore";
import { useEffect, useMemo, useState } from "react";
import ReviewList from "../../lounge/films/ReviewList";
import ReviewForm from "../../lounge/films/ReviewForm";
import FilmDetailSkeleton from "../../lounge/films/FilmDetailSkeleton";
import { ArrowLeft } from "lucide-react";

export default function FilmsDetail() {
  const { id } = useParams();
  const { detail, fetchDetail, loading } = useMovieDetailStore();
  const navigate = useNavigate();

  // 리뷰 정보
  const loaderData = useLoaderData() as MovieReviewWithLike[];
  const [reviews, setReviews] = useState<MovieReviewWithLike[]>(loaderData);

  // 리뷰 정렬 상태
  const [sortBy, setSortBy] = useState<"like" | "recent">("like");

  useEffect(() => {
    if (!id) return;
    fetchDetail(id);
  }, [id]);

  // 리뷰 정렬
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (sortBy === "recent") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
      return (b.like_count ?? 0) - (a.like_count ?? 0);
    });
  }, [reviews, sortBy]);

  // 좋아요 토글 함수
  const handleLikeToggle = (reviewId: number, liked: boolean) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? { ...r, like_count: (r.like_count ?? 0) + (liked ? 1 : -1) }
          : r
      )
    );
  };

  // 장르부분
  const [maxGenres, setMaxGenres] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setMaxGenres(window.innerWidth >= 768 ? 4 : 3); // md: 768px 기준
    };
    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 로딩중에는 스켈레톤 보여지도록
  if (loading || !detail) return <FilmDetailSkeleton />;

  // 개봉날짜 포맷 함수
  const formatKoreanDate = (date: string) => {
    const [y, m, d] = date.split("-");
    return `${y}년 ${m}월 ${d}일`;
  };

  // 감독 정보
  const director =
    detail.credits.crew.find((c) => c.job === "Director")?.name ||
    "감독 정보 없음";

  // 배우 3명만 보여지도록
  const cast = detail.credits.cast.slice(0, 3);

  // 시간 포맷
  const runtime = `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`;

  return (
    <div className="pt-[24px] bg-[#141414]/80">
      {/* movie detail */}
      <section className="px-8 md:pr-[12px]">
        {/* 필름 헤더 - 뒤로가기버튼, 장르배열 */}
        <div className="flex flex-col sm:flex-row justify-between">
          {/* 뒤로가기 */}
          <div>
            <button
              className="font-yapari text-[#D0F700] py-4 cursor-pointer flex items-center gap-2 text-[14px]"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 text-[#D0F700] cursor-pointer" />{" "}
              BACK
            </button>
          </div>
          {/* 장르 배열 */}
          <div className="flex items-center justify-end flex-wrap gap-x-2 md:gap-x-4 gap-y-2">
            {detail.genres.slice(0, maxGenres).map((genre) => (
              <span
                key={genre.id}
                className="font-yapari border border-[#D0F700] text-[#D0F700] text-[8px] sm:text-[10px] md:text-xs px-2 py-1 rounded-sm"
              >
                {/* 장르 배열 중에 Science Fiction은 SF로 표현되게 */}
                {genre.name === "Science Fiction" ? "SF" : genre.name}
              </span>
            ))}
          </div>
        </div>
        {/* 포스터 + 영화 정보 */}
        <div className="mt-1 flex flex-col sm:flex-row gap-4">
          {/* 포스터 */}
          <div className="w-full max-w-[320px] mx-auto h-auto aspect-[2/3] sm:max-w-[250px] md:max-w-[280px] flex-shrink-0">
            {detail.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt={detail.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {/* 영화 정보 */}
          <div className="flex flex-col gap-[14px]">
            {/* 제목 */}
            <h2 className="text-[24px] lg:text-3xl font-semibold text-white">
              {detail.title}
            </h2>
            {/* 줄거리 영역 */}
            <div>
              <p className="text-[14px] lg:text-sm truncate-multiline leading-[24px] md:leading-[30px]">
                {detail.overview}
              </p>
            </div>
            {/* 세부 정보 */}
            <div className="space-y-2 lg:space-y-4 text-[14px]">
              <div className="flex">
                <p className="w-[100px] md:w-[142px] shrink-0">Release.</p>
                <p>{formatKoreanDate(detail.release_date)}</p>
              </div>
              <div className="flex ">
                <p className="w-[100px] md:w-[142px] shrink-0">Casting.</p>
                <p className="leading-[30px]">
                  {cast.map((a) => a.name).join(", ")}
                </p>
              </div>
              <div className="flex ">
                <p className="w-[100px] md:w-[142px] shrink-0">Directed By.</p>
                <p>{director}</p>
              </div>
              <div className="flex ">
                <p className="w-[100px] md:w-[142px] shrink-0">Production.</p>
                <p>
                  {detail.production_companies.length > 0
                    ? detail.production_companies.map((p) => p.name).join(", ")
                    : "Production company information is not available for this film."}
                </p>
              </div>
              <div className="flex">
                <span className="w-[100px] md:w-[142px] shrink-0">
                  Running Time.
                </span>
                <span>{runtime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* review */}
      <section className="mt-[60px] px-[32px] pb-[24px]">
        {/* review header */}
        <div className="flex justify-between mb-[28px]">
          <h3 className="text-[#D0F700] font-medium text-[16px]">
            REVIEW ({reviews.length})
          </h3>
          {/* review sort */}
          <ul className="flex items-center gap-4 text-[13px] font-medium">
            <li
              className={`cursor-pointer ${
                sortBy === "like" ? "text-[#D0F700]" : ""
              }`}
              onClick={() => setSortBy("like")}
            >
              좋아요순
            </li>
            <li
              className={`cursor-pointer ${
                sortBy === "recent" ? "text-[#D0F700]" : ""
              }`}
              onClick={() => setSortBy("recent")}
            >
              최신순
            </li>
          </ul>
        </div>
        <ReviewList
          reviews={sortedReviews}
          onLikeToggle={handleLikeToggle}
          setReviews={setReviews}
        />
        <ReviewForm
          onReviewSubmit={(newReview) =>
            setReviews((prev) => [newReview, ...prev])
          }
        />
      </section>
    </div>
  );
}
