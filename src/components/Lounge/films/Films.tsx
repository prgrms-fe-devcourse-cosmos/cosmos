import { useCallback, useEffect, useRef, useState } from "react";
import { useMovieStore } from "../../../stores/movieStore";
import searchIcon from "../../../assets/icons/search.svg";
import searchGrayIcon from "../../../assets/icons/search_gray.svg";
import FilmCard from "./FilmsCard";
import FilmCardSkeleton from "./FilmsCardSkeleton";

export default function Films() {
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
    setSearchResults,
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

  const [isFocused, setIsFocused] = useState(false);

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
        <div className="w-[280px] relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              const value = e.target.value;
              setSearchInput(value);
              if (!value.trim()) {
                setSearchQuery("");
                setSearchResults([]);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchQuery(searchInput);
                setSearchResults([]);
                searchMovies(searchInput);
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="영화 검색"
            className="w-full border border-[#909090] pl-[42px] py-[6px] text-[14px] rounded-[8px] outline-none focus:border-[#D0F700] hover:border-[#D0F700]"
          />
          <img
            src={isFocused ? searchIcon : searchGrayIcon}
            alt="검색아이콘"
            className="absolute top-1/2 left-[16px] -translate-y-1/2 w-[14px] h-[14px]"
          />
        </div>
      </div>
      {/* 영화 리스트 */}
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
