import { create } from "zustand";
import { getSpaceMovies } from "../apis/movie";

export const useMovieStore = create<SpaceMovieState>((set) => ({
  spaceMovies: [],
  loading: false,
  fetchSpaceMovies: async () => {
    set({ loading: true });
    try {
      const data = await getSpaceMovies();
      console.log("우주 영화 필터링 결과:", data);
      set({ spaceMovies: data });
    } catch (e) {
      console.error("fetchSpaceMovies 실패:", e);
    } finally {
      set({ loading: false });
    }
  },
}));
