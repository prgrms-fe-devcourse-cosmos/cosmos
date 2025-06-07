interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  director?: string;
}

interface SpaceMovieState {
  spaceMovies: Movie[];
  loading: boolean;
  fetchSpaceMovies: () => Promise<void>;
  page: number;
  hasMore: boolean;
  sortBy: string;
  changeSortBy: (newSort: string) => void;
  // 검색
  searchInput: string; // 👈 추가
  setSearchInput: (input: string) => void; // 👈 추가
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Movie[];
  searchLoading: boolean;
  searchMovies: (query: string) => Promise<void>;
  setSearchResults: (results: Movie[]) => void;
}

interface MovieDetail {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  runtime: number;
  release_date: string;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
  credits: {
    cast: { id: number; name: string; character: string }[];
    crew: { id: number; name: string; job: string }[];
  };
}

interface MovieDetailStore {
  detail: MovieDetail | null;
  loading: boolean;
  fetchDetail: (id: string | number) => Promise<void>;
}
