import { useEffect } from "react";
import { useMovieStore } from "../../stores/movieStore";
import FilmCard from "./FilmCard";

export default function Films() {
  const { spaceMovies, fetchSpaceMovies, loading } = useMovieStore();

  useEffect(() => {
    fetchSpaceMovies();
  }, []);

  if (loading) return <div>로딩로딩</div>;
  return (
    <div className="flex flex-wrap justify-between gap-y-[88px]">
      {spaceMovies.map((movie) => (
        <FilmCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
