import { useCallback, useEffect, useRef } from "react";
import FilmCard from "./FilmsCard";
import FilmCardSkeleton from "./FilmsCardSkeleton";
import { useMovieStore } from "../../../stores/movieStore";

export default function Films() {
  const {
    spaceMovies,
    fetchSpaceMovies,
    loading,
    hasMore,
    changeSortBy,
    sortBy,
  } = useMovieStore();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchSpaceMovies();
  }, []);

  const lastMovieRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchSpaceMovies();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <div className="flex justify-between mb-[24px] items-center">
        <ul className="flex ml-2 gap-4 text-[13px] font-medium">
          <li
            className={`cursor-pointer ${
              sortBy === "vote_average.desc" ? "text-[#D0F700]" : ""
            }`}
            onClick={() => changeSortBy("vote_average.desc")}
          >
            평점순
          </li>
          <li
            className={`cursor-pointer ${
              sortBy === "release_date.desc" ? "text-[#D0F700]" : ""
            }`}
            onClick={() => changeSortBy("release_date.desc")}
          >
            최신순
          </li>
        </ul>
        <input
          type="text"
          placeholder="영화 검색"
          className="w-[280px] border border-[#909090] px-[16px] py-[6px] text-[14px] rounded-[8px] focus:outline-[#D0F700]"
        />
      </div>
      <div className="flex flex-wrap justify-between gap-y-[88px]">
        {spaceMovies.map((movie, index) => {
          const isLast = index === spaceMovies.length - 1;
          return (
            <div key={movie.id} ref={isLast ? lastMovieRef : null}>
              <FilmCard movie={movie} />
            </div>
          );
        })}
        {/* 스켈레톤 적용 */}
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <FilmCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>
    </>
  );
}
