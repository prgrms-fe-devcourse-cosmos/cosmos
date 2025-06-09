import { LoaderFunctionArgs } from "react-router";
import supabase from "../../utils/supabase";

export const reviewLoader = async ({ params }: LoaderFunctionArgs) => {
  const movieId = params.id;

  if (!movieId) {
    throw new Response("영화 ID가 없습니다.", { status: 400 });
  }

  const { data, error } = await supabase
    .from("movie_reviews_with_likes")
    .select("*")
    .eq("movie_id", Number(movieId));

  if (error) {
    console.error("리뷰 로딩 실패:", error.message);
    throw new Response("리뷰를 불러오는 중 오류가 발생했습니다.", {
      status: 500,
    });
  }

  // profiles 구조에 맞게 변환
  const reviews = data.map((review) => ({
    ...review,
    profiles: {
      id: review.profile_id,
      username: review.username,
      avatar_url: null,
    },
  }));

  return reviews;
};
