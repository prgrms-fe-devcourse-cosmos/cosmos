import { create } from "zustand";
import { getMovieDetail, getSpaceMovies } from "../api/movie";

export const useMovieStore = create<SpaceMovieState>((set, get) => ({
  spaceMovies: [],
  page: 1,
  hasMore: true,
  loading: false,
  fetchSpaceMovies: async () => {
    const { page, spaceMovies } = get();
    set({ loading: true });
    try {
      const newMovies = await getSpaceMovies(page);
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
