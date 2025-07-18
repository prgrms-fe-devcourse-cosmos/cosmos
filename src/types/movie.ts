export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  director?: string;
}

export interface SpaceMovieState {
  spaceMovies: Movie[];
  loading: boolean;
  fetchSpaceMovies: () => Promise<void>;
  page: number;
  hasMore: boolean;
  sortBy: string;
  changeSortBy: (newSort: string) => void;
  // 검색
  searchInput: string;
  setSearchInput: (input: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Movie[];
  searchLoading: boolean;
  searchMovies: (query: string) => Promise<void>;
  setSearchResults: (results: Movie[]) => void;
  resetAndFetchMovies: () => Promise<void>;
}

export interface MovieDetail {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  runtime: number;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
  credits: {
    cast: { id: number; name: string; character: string }[];
    crew: { id: number; name: string; job: string }[];
  };
  // 트레일러 추가
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
      official: boolean;
      published_at: string;
    }[];
  };
}

export interface MovieDetailStore {
  detail: MovieDetail | null;
  loading: boolean;
  fetchDetail: (id: string | number) => Promise<void>;
}

// 리뷰 좋아요 포함 타입
export type MovieReviewWithLike = {
  id: number;
  content: string;
  rating: number;
  created_at: string;
  updated_at: string | null;
  movie_id: number;
  profile_id: string;
  username: string;
  like_count: number;
  profiles: {
    id: string;
    username: string;
    avatar_url?: string | null;
  };
};
