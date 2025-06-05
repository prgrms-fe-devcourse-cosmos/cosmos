import { create } from "zustand";
import { getMovieDetail, getSpaceMovies } from "../api/movie";

export const useMovieStore = create<SpaceMovieState>((set, get) => ({
  spaceMovies: [],
  page: 1,
  hasMore: true,
  loading: false,
  sortBy: "vote_average.desc",
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
  changeSortBy: (newSort) => {
    set({
      sortBy: newSort,
      page: 1,
      hasMore: true,
      spaceMovies: [], // 초기화
    });
    get().fetchSpaceMovies(); // 새로운 정렬로 다시 불러오기
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
