import { NavLink } from "react-router-dom";

export default function FilmCard({ movie }: { movie: Movie }) {
  return (
    <NavLink
      to={`film/${movie.id}`}
      key={movie.id}
      className="w-[220px] h-[444px] flex flex-col overflow-hidden "
    >
      <div className="w-[220px] aspect-[2/3]">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        className="pt-[21px] pb-[21px] px-[16px] flex flex-col justify-between gap-[4px]"
      >
        <h3 className="text-[16px] truncate whitespace-nowrap overflow-hidden">
          {movie.title}
        </h3>
        <p className="text-[14px]">{movie.director || "감독 몰루"}</p>
        <div className="flex justify-between">
          <p className="text-[12px] text-[#909090]">
            {movie.release_date.replace(/-/g, ".")} 개봉
          </p>
          <p className="text-[10px] flex gap-1">
            <span>⭐</span>
            <span>
              {movie.vote_average ? movie.vote_average.toFixed(1) : "?"}
            </span>
          </p>
        </div>
      </div>
    </NavLink>
  );
}
