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
  "우주",
  "외계",
  "thanos",
  "infinity",
];

// 우주 키워드 필터링 함수
function spaceFilter(movie: Movie): boolean {
  const text = `${movie.title} ${movie.overview}`.toLowerCase();
  return spaceKeywords.some((keyword) => text.includes(keyword));
}

// 영화 감독 정보 가져오기
export const getMovieCredits = async (id: number) => {
  const data = await movieFetch<{ crew: { job: string; name: string }[] }>(
    `/movie/${id}/credits`,
    "get"
    // { language: "ko-KR" }
  );
  return data?.crew || [];
};

export const getDirectorName = async (id: number): Promise<string> => {
  const crew = await getMovieCredits(id);
  const director = crew.find((member) => member.job === "Director");
  return director?.name || "감독 정보 없음";
};

// SF 장르 영화 중 우주 관련만 필터링 + 영화 감독 정보
export const getSpaceMovies = async (page = 1): Promise<Movie[]> => {
  // let page = 1;
  // const maxPage = 500;
  // const filteredMovies: Movie[] = [];

  // while (filteredMovies.length < 9 && page <= maxPage) {
  //   const data = await movieFetch<{ results: Movie[] }>(
  //     "/discover/movie",
  //     "get",
  //     {
  //       with_genres: 878, // SF 장르
  //       sort_by: "popularity.desc",
  //       // language: "ko-KR",
  //       page,
  //     }
  //   );
  //   if (!data || !Array.isArray(data.results)) break;
  //   const filtered = data.results.filter(spaceFilter);
  //   for (const movie of filtered) {
  //     if (filteredMovies.length >= 9) break;
  //     const director = await getDirectorName(movie.id);
  //     filteredMovies.push({ ...movie, director });
  //   }
  //   page++;
  // }
  // return filteredMovies.slice(0, 9);
  const data = await movieFetch<{ results: Movie[] }>(
    "/discover/movie",
    "get",
    {
      with_genres: 878,
      sort_by: "popularity.desc", // 정렬은 나중에 동적 처리할 수 있음
      page,
    }
  );

  if (!data || !Array.isArray(data.results)) return [];

  const filtered = data.results.filter(spaceFilter);

  const moviesWithDirectors = await Promise.all(
    filtered.map(async (movie) => {
      const director = await getDirectorName(movie.id);
      return { ...movie, director };
    })
  );

  return moviesWithDirectors;
};

// 영화 상세 + 크레딧 (감독, 배우 정보 포함)
export const getMovieDetail = (
  id: number | string
): Promise<MovieDetail | undefined> => {
  return movieFetch(`/movie/${id}`, "get", {
    append_to_response: "credits",
    language: "ko-KR",
  });
};
