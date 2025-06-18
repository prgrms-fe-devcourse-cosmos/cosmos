// 리뷰 Supabase 관련 API

import supabase from "../../utils/supabase";

// 리뷰에 달린 좋아요가 있으면 먼저 삭제
async function deleteLikesByReviewId(reviewId: number): Promise<void> {
  const { error } = await supabase
    .from("review_likes")
    .delete()
    .eq("review_id", reviewId);

  if (error) {
    console.error("좋아요 삭제 실패:", error);
  }
}

// 리뷰 삭제
export async function deleteReviewById(
  reviewId: number,
  profileId: string
): Promise<void> {
  // 좋아요 먼저 삭제
  await deleteLikesByReviewId(reviewId);

  // 리뷰 삭제
  const { error } = await supabase.from("movie_reviews").delete().match({
    id: reviewId,
    profile_id: profileId,
  });

  if (error) {
    console.error("리뷰 삭제 실패:", error);
  }
}

// 리뷰 수정
export async function updateReviewById(
  reviewId: number,
  content: string,
  rating: number,
  profileId: string
): Promise<void> {
  const { error } = await supabase
    .from("movie_reviews")
    .update({
      content,
      rating,
      updated_at: new Date().toISOString(),
    })
    .match({
      id: reviewId,
      profile_id: profileId,
    });

  if (error) {
    throw new Error("리뷰 수정 실패");
  }
}

// 영화ID가 movie테이블에 존재하는지 확인
// 없으면 movie테이블에 추가
export async function ensureMovieExists(movieId: number): Promise<void> {
  const { data: existingMovie, error: fetchError } = await supabase
    .from("movie")
    .select("tmdb_id")
    .eq("tmdb_id", movieId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw new Error("영화 확인 중 오류 발생: " + fetchError.message);
  }

  if (!existingMovie) {
    const { error: insertError } = await supabase
      .from("movie")
      .insert({ tmdb_id: movieId });

    if (insertError) {
      throw new Error("영화 추가 실패: " + insertError.message);
    }
  }
}

// 리뷰 등록
export async function createReview(
  movieId: number,
  content: string,
  rating: number,
  profileId: string
): Promise<MovieReviewWithLike> {
  const { data, error } = await supabase
    .from("movie_reviews")
    .insert({
      profile_id: profileId,
      movie_id: movieId,
      content,
      rating,
    })
    .select("*, profiles(id, username, avatar_url)")
    .single();

  if (error || !data) {
    throw new Error("리뷰 등록 실패: " + (error?.message ?? ""));
  }

  return {
    ...data,
    like_count: 0, // 등록 시 좋아요는 0
    username: data.profiles.username, // 타입 일치
  };
}

// 좋아요
// 좋아요 상태
export async function fetchReviewLikeStatus(
  reviewId: number,
  profileId: string
) {
  const { data, error } = await supabase
    .from("review_likes")
    .select("id")
    .eq("review_id", reviewId)
    .eq("profile_id", profileId);

  if (error) throw error;
  return (data ?? []).length > 0;
}

// 좋아요 카운트
export async function fetchReviewLikeCount(reviewId: number) {
  const { count, error } = await supabase
    .from("review_likes")
    .select("id", { count: "exact", head: true })
    .eq("review_id", reviewId);

  if (error) throw error;
  return count ?? 0;
}

// 좋아요 추가
export async function addReviewLike(reviewId: number, profileId: string) {
  const { error } = await supabase.from("review_likes").insert({
    review_id: reviewId,
    profile_id: profileId,
  });
  if (error) throw error;
}

// 좋아요 삭제
export async function removeReviewLike(reviewId: number, profileId: string) {
  const { error } = await supabase
    .from("review_likes")
    .delete()
    .eq("review_id", reviewId)
    .eq("profile_id", profileId);
  if (error) throw error;
}

// 영화 리뷰로 자체 평점
export async function movieAvgRating(movieId: number): Promise<number | null> {
  const { data, error } = await supabase
    .from("movie_reviews")
    .select("rating")
    .eq("movie_id", movieId);

  if (error) {
    console.error("평점 불러오기 실패:", error.message);
    return null;
  }

  const ratings = data.map((r) => r.rating).filter((r) => r !== null);
  if (ratings.length === 0) return null;

  const avg = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

  // 소수점 첫째자리까지만
  return parseFloat(avg.toFixed(1));
}
