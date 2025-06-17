import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useMovieDetailStore } from "../../../stores/movieStore";
import { useEffect, useMemo, useState } from "react";
import ReviewList from "../../lounge/films/ReviewList";
import ReviewForm from "../../lounge/films/ReviewForm";
import FilmDetailSkeleton from "../../lounge/films/FilmDetailSkeleton";
import Button from "../../common/Button";

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
  const [maxGenres, setMaxGenres] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setMaxGenres(window.innerWidth >= 768 ? 4 : 4); // md: 768px 기준
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
            <div className="group">
              <Button
                variant="back"
                className="text-xs lg:text-base"
                onClick={() => navigate(-1)}
              >
                BACK
              </Button>
            </div>
          </div>
          {/* 장르 배열 */}
          <div className="flex items-center justify-center sm:justify-end flex-wrap gap-x-2 md:gap-x-4 gap-y-2">
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
          <div className="w-full max-w-[200px] mx-auto h-auto aspect-[2/3] sm:max-w-[220px] md:max-w-[240px] flex-shrink-0">
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
            <h2 className="text-lg md:text-2xl text-center sm:text-left font-semibold text-white">
              {detail.title}
            </h2>
            {/* 줄거리 영역 */}
            <div>
              <p className="text-xs md:text-sm lg:text-sm truncate-multiline leading-[24px] md:leading-[30px]">
                {detail.overview}
              </p>
            </div>
            {/* 세부 정보 */}
            <div className="space-y-2 lg:space-y-4 text-[10px] sm:text-xs md:text-sm">
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
          <h3 className="text-[color:var(--primary-300)] font-medium text-xs md:text-sm lg:text-base">
            REVIEW ({reviews.length})
          </h3>
          {/* review sort */}
          <ul className="flex items-center gap-4 text-[10px] md:text-xs lg:text-sm">
            <li
              className={`cursor-pointer ${
                sortBy === "like" ? "text-[#D0F700] font-medium" : ""
              }`}
              onClick={() => setSortBy("like")}
            >
              좋아요순
            </li>
            <li
              className={`cursor-pointer ${
                sortBy === "recent" ? "text-[#D0F700] font-medium" : ""
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
