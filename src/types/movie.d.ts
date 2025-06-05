// interface Movie {
//   id: number;
//   title: string;
//   original_title: string;
//   overview: string;
//   poste_path: string | null;
//   backdrop_path: string | null;
//   release_date: string;
//   vote_average: number;
//   vote_count: number;
//   genre_ids?: number[];
//   genres?: { id: number; name: string }[];
//   runtime?: number;
//   production_companies?: { name: string }[];
//   tagline?: string;
//   status?: string;
//   spoken_languages?: { name: string }[];
// }

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
