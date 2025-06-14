import { movieFetch } from "../../utils/movie";

// TMDB 관련 API 함수 모음

// 검색 api 전용 타입
type RawSearchMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
};

// 우주 관련 키워드 리스트
const spaceKeywords = [
  "space",
  "spaceship",
  "interstellar",
  "galaxy",
  "planet",
  "nasa",
  "moon",
  "astronaut",
  "orbit",
  "universe",
  "cosmos",
  "starship",
  "star",
  "alien",
  "우주",
  "외계",
  "thanos",
  "infinity",
];

// 우주 키워드 필터링 함수, 줄거리 없으면 필터링
function spaceFilter(movie: Movie, query?: string): boolean {
  if (!movie.overview || movie.overview.trim().length === 0) return false;

  const text = `${movie.title} ${movie.overview}`.toLowerCase();

  const keywordMatch = spaceKeywords.some((keyword) => text.includes(keyword));
  const queryMatch = query ? text.includes(query.toLowerCase()) : false;

  return keywordMatch || queryMatch;
}

// 줄거리가 비어있으면 영어로라도 가져오기
const getFallbackOverview = async (id: number): Promise<string> => {
  const data = await movieFetch<{ overview: string }>(`/movie/${id}`, "get", {
    language: "en-US",
  });
  return data?.overview || "";
};

// 영화 감독 정보 가져오기
export const getMovieCredits = async (id: number) => {
  const data = await movieFetch<{ crew: { job: string; name: string }[] }>(
    `/movie/${id}/credits`,
    "get"
    // { language: "ko-KR" }
  );
  return data?.crew || [];
};

// 감독
export const getDirectorName = async (id: number): Promise<string> => {
  const crew = await getMovieCredits(id);
  const director = crew.find((member) => member.job === "Director");
  return director?.name || "감독 정보 없음";
};

// SF 장르 영화 중 우주 관련만 필터링 + 영화 감독 정보
export const getSpaceMovies = async (
  page = 1,
  sortBy = "vote_average.desc"
): Promise<Movie[]> => {
  const today = new Date().toISOString().slice(0, 10);
  const data = await movieFetch<{ results: Movie[] }>(
    "/discover/movie",
    "get",
    {
      with_genres: 878,
      sort_by: sortBy,
      page,
      "primary_release_date.lte": today, // 오늘까지 개봉한 영화만
      "primary_release_date.gte": "2000-01-01", // 너무 옛날 영화 제외
      "vote_count.gte": 28, // 평점이 최소 28개 이상
      // language: "ko-KR",
    }
  );

  if (!data || !Array.isArray(data.results)) return [];

  const filtered = await Promise.all(
    data.results.map(async (movie) => {
      // 개봉일 확인
      if (!movie.release_date) return null;
      const releaseDate = new Date(movie.release_date);
      const todayDate = new Date();
      if (isNaN(releaseDate.getTime()) || releaseDate > todayDate) return null;

      // 줄거리가 비었으면 en-US로 다시 시도
      if (!movie.overview || movie.overview.trim().length === 0) {
        const fallback = await getFallbackOverview(movie.id);
        if (!fallback) return null;
        movie.overview = fallback;
      }

      // 우주 키워드 필터
      if (!spaceFilter(movie)) return null;

      const director = await getDirectorName(movie.id);
      return { ...movie, director };
    })
  );

  return filtered.filter((m): m is Movie & { director: string } => m !== null);
};

// 영화 상세 + 크레딧 (감독, 배우 정보 포함)
export const getMovieDetail = async (
  id: number | string
): Promise<MovieDetail | undefined> => {
  // en-US 기준 전체 상세 정보 불러오기
  const detail = await movieFetch<MovieDetail>(`/movie/${id}`, "get", {
    append_to_response: "credits",
    language: "en-US",
  });

  if (!detail) return;

  // 줄거리만 ko-KR로 시도해서 대체
  const krData = await movieFetch<{ overview: string }>(`/movie/${id}`, "get", {
    language: "ko-KR",
  });

  if (krData?.overview && krData.overview.trim().length > 0) {
    detail.overview = krData.overview;
  }

  return detail;
};

// 검색
// TMDB 검색 + 필터
export const getSearchMovies = async (query: string): Promise<Movie[]> => {
  // 공백 검색 x
  if (!query.trim()) return [];

  // tmdb api 요청
  const res = await movieFetch<{ results: RawSearchMovie[] }>(
    "/search/movie",
    "get",
    { query }
  );

  // 결과 없으면 빈 배열 반환
  if (!res || !res.results) return [];

  // 결과 영화 필터링
  const filtered = await Promise.all(
    res.results.map(async (raw) => {
      // 현재 개봉하지 않은 영화 제거
      if (!raw.release_date) return null;
      const releaseDate = new Date(raw.release_date);
      if (isNaN(releaseDate.getTime()) || releaseDate > new Date()) return null;

      // 한국어 줄거리 없으면 영어로라도 줄거리 가져옴
      if (!raw.overview || raw.overview.trim().length === 0) {
        const fallback = await getFallbackOverview(raw.id);
        if (!fallback) return null;
        raw.overview = fallback;
      }

      // SF 장르 필터
      const isSF = raw.genre_ids.includes(878);
      if (!isSF) return null;

      // 감독 정보 가져오기
      const director = await getDirectorName(raw.id);

      // movie 타입 객체로 반환
      return {
        id: raw.id,
        title: raw.title,
        overview: raw.overview,
        poster_path: raw.poster_path,
        release_date: raw.release_date,
        vote_average: raw.vote_average,
        director,
      } as Movie;
    })
  );

  console.log(filtered);
  // null 인 항목 제거
  return filtered.filter((m): m is Movie => m !== null);
};
