import { NavLink } from "react-router-dom";
import { Star } from "lucide-react";

export default function FilmCard({ movie }: { movie: Movie }) {
  return (
    <NavLink
      to={`${movie.id}`}
      key={movie.id}
      className="w-full md:max-w-[260px] lg:max-w-[220px] flex flex-col overflow-hidden transform transition duration-300 hover:shadow-lg hover:scale-[1.02]"
    >
      <div className="w-full aspect-[2/3]">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
        />
      </div>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        className="pt-[21px] pb-[21px] px-[16px] flex flex-col justify-between gap-[6px]"
      >
        <h3 className="text-white text-[13px] sm:text-[16px] truncate whitespace-nowrap overflow-hidden font-medium">
          {movie.title}
        </h3>
        <p className="text-[11px] sm:text-[14px] truncate whitespace-nowrap overflow-hidden">
          {movie.director || "감독 정보 없음"}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-[10px] sm:text-[12px] text-[#909090]">
            {movie.release_date.replace(/-/g, ".")} 개봉
          </p>
          <p className="inline-flex gap-1 sm:gap-2 items-center">
            <Star
              className="w-[10px] sm:w-3 h-[10px] sm:h-3 text-[#D0F700] relative top-[-1px] sm:top-0"
              // fill="#D0F700"
              strokeWidth={2}
            />
            <span className="text-[8px] sm:text-[10px] h-3 flex items-center leading-none md:pt-[2px]">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "?"}
            </span>
          </p>
        </div>
      </div>
    </NavLink>
  );
}
