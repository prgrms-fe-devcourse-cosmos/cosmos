import { LoaderFunctionArgs } from "react-router";
import supabase from "../../utils/supabase";

export const reviewLoader = async ({ params }: LoaderFunctionArgs) => {
  const movieId = params.id;

  if (!movieId) {
    throw new Response("영화 ID가 없습니다.", { status: 400 });
  }

  const { data, error } = await supabase
    .from("movie_reviews")
    .select(
      `
    id,
    content,
    rating,
    created_at,
    updated_at,
    profiles:profiles!movie_reviews_profile_id_fkey (
      id,
      username,
      avatar_url
    )
  `
    )
    .eq("movie_id", Number(movieId))
    .order("created_at", { ascending: false });

  if (error) {
    console.error("리뷰 로딩 실패:", error.message);
    throw new Response("리뷰를 불러오는 중 오류가 발생했습니다.", {
      status: 500,
    });
  }

  return data;
};
