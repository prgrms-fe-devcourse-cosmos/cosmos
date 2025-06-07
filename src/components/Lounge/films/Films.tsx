import { useCallback, useEffect, useRef } from "react";
import FilmCard from "./FilmsCard";
import FilmCardSkeleton from "./FilmsCardSkeleton";
import { useMovieStore } from "../../../stores/movieStore";
// import useFilmSearch from "../../../hooks/useFilmSearch";

export default function Films() {
  // const {
  //   spaceMovies,
  //   fetchSpaceMovies,
  //   loading,
  //   hasMore,
  //   changeSortBy,
  //   sortBy,
  //   searchQuery,
  //   setSearchQuery,
  //   searchMovies,
  //   searchResults,
  //   searchLoading,
  //   // setSearchResults,
  // } = useMovieStore();
  const {
    spaceMovies,
    fetchSpaceMovies,
    loading,
    hasMore,
    changeSortBy,
    sortBy,
    searchInput,
    setSearchInput,
    searchQuery,
    setSearchQuery,
    searchMovies,
    searchResults,
    searchLoading,
  } = useMovieStore();

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchSpaceMovies();
    // 검색어 초기화
    setSearchInput("");
    setSearchQuery("");
  }, []);

  const lastMovieRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || searchQuery) return; // 검색 중에는 무한 스크롤 비활성화

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchSpaceMovies();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, searchQuery]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const moviesToRender = searchQuery ? searchResults : spaceMovies;
  const isLoading = searchQuery ? searchLoading : loading;

  return (
    <>
      <div className="flex justify-between mb-[24px] items-center">
        {/* 정렬 필터 */}
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
        {/* 검색창 */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => {
            const value = e.target.value;
            setSearchInput(value);
            if (!value.trim()) {
              setSearchQuery(""); // 검색어 지우면 초기 상태로 복귀
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchQuery(searchInput);
              searchMovies(searchInput);
            }
          }}
          placeholder="영화 검색"
          className="w-[280px] border border-[#909090] px-[16px] py-[6px] text-[14px] rounded-[8px] outline-none focus:border-[#D0F700] hover:border-[#D0F700]"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-[54px] gap-y-[88px] mb-[50px]">
        {moviesToRender.map((movie, index) => {
          const isLast = index === moviesToRender.length - 1;
          return (
            <div
              key={movie.id}
              ref={isLast && !searchQuery ? lastMovieRef : null}
            >
              <FilmCard movie={movie} />
            </div>
          );
        })}
        {/* 스켈레톤 적용 */}
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <FilmCardSkeleton key={`skeleton-${i}`} />
          ))}

        {!isLoading && searchQuery && moviesToRender.length === 0 && (
          <div className="text-[#909090] mt-[24px]">검색 결과가 없습니다.</div>
        )}
      </div>
    </>
  );
}
