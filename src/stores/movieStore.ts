import { create } from "zustand";
import { getMovieDetail, getSearchMovies, getSpaceMovies } from "../api/movie";

export const useMovieStore = create<SpaceMovieState>((set, get) => ({
  //  영화 리스트
  spaceMovies: [],
  page: 1,
  hasMore: true,
  loading: false,
  sortBy: "vote_average.desc",
  // 영화 불러오기
  fetchSpaceMovies: async () => {
    const { page, spaceMovies, sortBy } = get();
    set({ loading: true });
    try {
      const newMovies = await getSpaceMovies(page, sortBy);
      if (newMovies.length === 0) {
        set({ hasMore: false });
        return;
      }
      set({
        spaceMovies: [...spaceMovies, ...newMovies],
        page: page + 1,
        hasMore: true,
      });
    } catch (e) {
      console.error("fetchSpaceMovies 실패:", e);
    } finally {
      set({ loading: false });
    }
  },
  // 정렬 변경 (전체 or 검색 리스트)
  changeSortBy: (newSort) => {
    const { searchQuery, searchResults } = get();
    set({
      sortBy: newSort,
      page: 1,
      hasMore: true,
      spaceMovies: [],
    });

    if (searchQuery.trim()) {
      const sorted = [...searchResults].sort((a, b) => {
        if (newSort === "vote_average.desc")
          return b.vote_average - a.vote_average;
        if (newSort === "release_date.desc")
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        return 0;
      });
      set({ searchResults: sorted });
    } else {
      get().fetchSpaceMovies();
    }
  },

  // 검색 상태
  searchInput: "",
  setSearchInput: (input) => set({ searchInput: input }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  searchResults: [],
  searchLoading: false,

  searchMovies: async (query) => {
    const { sortBy } = get();
    if (!query.trim()) {
      set({ searchResults: [], searchQuery: "" });
      return;
    }

    set({
      searchLoading: true,
      searchQuery: query,
      spaceMovies: [],
    });

    try {
      const results = await getSearchMovies(query);
      const sorted = [...results].sort((a, b) => {
        if (sortBy === "vote_average.desc")
          return b.vote_average - a.vote_average;
        if (sortBy === "release_date.desc")
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        return 0;
      });
      set({ searchResults: sorted });
    } catch (e) {
      console.error("검색 실패", e);
    } finally {
      set({ searchLoading: false });
    }
  },

  setSearchResults: (results) => set({ searchResults: results }),
  // 페이지 초기화
  resetAndFetchMovies: async () => {
    set({
      spaceMovies: [],
      page: 1,
      hasMore: true,
      loading: false,
    });
    await get().fetchSpaceMovies();
  },
}));

export const useMovieDetailStore = create<MovieDetailStore>((set) => ({
  detail: null,
  loading: false,
  fetchDetail: async (id: string | number) => {
    set({ loading: true });
    try {
      const data = await getMovieDetail(id);
      set({ detail: data });
    } catch (e) {
      console.error("영화 디테일 요청 실패", e);
    } finally {
      set({ loading: false });
    }
  },
}));
