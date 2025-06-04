import { useEffect } from "react";
import { useMovieStore } from "../../stores/movieStore";
import { NavLink } from "react-router-dom";

export default function Films() {
  const { spaceMovies, fetchSpaceMovies, loading } = useMovieStore();

  useEffect(() => {
    fetchSpaceMovies();
  }, []);

  if (loading) return <div>로딩로딩</div>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {spaceMovies.map((movie) => (
        <NavLink to={`/films/${movie.id}`} key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
          <p>개봉일: {movie.release_date}</p>
          <p>⭐ {movie.vote_average}</p>
        </NavLink>
      ))}
    </div>
  );
}
