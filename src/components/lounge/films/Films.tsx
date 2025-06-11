import { useCallback, useEffect, useRef } from "react";
import { useMovieStore } from "../../../stores/movieStore";
import SearchInput from "../../common/SearchInput";
import FilmCard from "../../lounge/films/FilmsCard";
import FilmCardSkeleton from "../../lounge/films/FilmsCardSkeleton";

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
    resetAndFetchMovies,
  } = useMovieStore();

  const observerRef = useRef<IntersectionObserver | null>(null);

  // 검색 개선
  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    setSearchQuery(trimmed);
    setSearchResults([]); // 기존 검색 결과 초기화

    if (trimmed) {
      // 검색어가 있으면 해당 키워드로 검색 실행
      searchMovies(trimmed);
    } else {
      // 검색어가 없으면 전체 영화 리스트 초기화
      resetAndFetchMovies();
    }
  };

  useEffect(() => {
    resetAndFetchMovies();
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
    <div>
      <div className="flex justify-between mb-[24px] items-center h-[35px]">
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
        <SearchInput
          scope="films"
          value={searchInput}
          setValue={setSearchInput}
          onSearch={handleSearch}
        />
      </div>
      {/* 영화 리스트 */}
      <div
        className="grid grid-cols-2 lg:grid-cols-3 
              gap-x-[54px] sm:gap-x-[70px] 
              lg:gap-x-[54px] gap-y-[88px] mb-[50px]"
      >
        {moviesToRender.map((movie, index) => {
          const isLast = index === moviesToRender.length - 1;
          return (
            <div
              key={movie.id}
              ref={isLast && !searchQuery ? lastMovieRef : null}
              className="w-full"
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
    </div>
  );
}
