import { movieFetch } from "../utils/movie";

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
  "우주", // 한글 우주
  "외계",
  "thanos",
  "infinity",
];

// 우주 키워드 필터링 함수
function spaceFilter(movie: Movie): boolean {
  const text = `${movie.title} ${movie.overview}`.toLowerCase();
  return spaceKeywords.some((keyword) => text.includes(keyword));
}

// SF 장르 영화 중 우주 관련만 필터링
export const getSpaceMovies = async (): Promise<Movie[]> => {
  let page = 1;
  const maxPage = 500;
  const filteredMovies: Movie[] = [];

  while (filteredMovies.length < 9 && page <= maxPage) {
    const data = await movieFetch<{ results: Movie[] }>(
      "/discover/movie",
      "get",
      {
        with_genres: 878, // SF 장르
        sort_by: "popularity.desc",
        language: "ko-KR",
        page,
      }
    );
    if (!data || !Array.isArray(data.results)) break;
    const filtered = data.results.filter(spaceFilter);
    filteredMovies.push(...filtered);
    page++;
  }
  return filteredMovies.slice(0, 9);

  // const data = await movieFetch<{ results: Movie[] }>(
  //   "/discover/movie",
  //   "get",
  //   {
  //     with_genres: 878, // SF 장르
  //     sort_by: "popularity.desc",
  //     language: "ko-KR",
  //   }
  // );

  // if (!data || !Array.isArray(data.results)) return [];

  // return data.results.filter(spaceFilter);
  //   return data.results;
};

// 영화 상세 + 크레딧 (감독, 배우 정보 포함)
export const getMovieDetail = (id: number | string) => {
  return movieFetch(`/movie/${id}`, "get", {
    append_to_response: "credits",
    language: "ko-KR",
  });
};
