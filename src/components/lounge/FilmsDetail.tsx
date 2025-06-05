import { useParams } from "react-router-dom";
import { useMovieDetailStore } from "../../stores/movieStore";
import { useEffect } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default function FilmsDetail() {
  const { id } = useParams();
  const { detail, fetchDetail, loading } = useMovieDetailStore();

  useEffect(() => {
    if (id) fetchDetail(id);
  }, [id]);
  if (loading || !detail) return <div>로딩로딩</div>;
  const director =
    detail.credits.crew.find((c) => c.job === "Director")?.name ||
    "감독 정보 없음";
  const cast = detail.credits.cast.slice(0, 4);
  const genres = detail.genres.map((g) => g.name).join(", ");
  const production = detail.production_companies.map((p) => p.name).join(", ");
  const runtime = `${Math.floor(detail.runtime / 60)}시간 ${
    detail.runtime % 60
  }분`;
  return (
    <>
      <div className="p-6 space-y-4">
        {detail.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
            alt={detail.title}
            className="w-[300px] rounded shadow-md"
          />
        )}
        <h1 className="text-2xl font-bold">{detail.title}</h1>
        <p className="text-sm text-gray-500">{genres}</p>
        <p>{detail.overview}</p>
        <p>
          <strong>Release Date.</strong> {detail.release_date}
        </p>
        <p>
          <strong>Directed By.</strong> {director}
        </p>
        <p>
          <strong>Casting.</strong> {cast.map((a) => a.name).join(", ")}
        </p>
        <p>
          <strong>Production.</strong> {production}
        </p>
        <p>
          <strong>Running Time.</strong> {runtime}
        </p>
      </div>
      <div>
        <ReviewList />
        <ReviewForm />
      </div>
    </>
  );
}
