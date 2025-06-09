// 리뷰 Supabase 관련 API

import supabase from "../utils/supabase";

// 임시 사용자 ID
const TEMP_PROFILE_ID = "0a3b30d8-1899-4eef-9cb7-6a9d8cc0b4da";

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
export async function deleteReviewById(reviewId: number): Promise<void> {
  // 좋아요 먼저 삭제
  await deleteLikesByReviewId(reviewId);

  // 리뷰 삭제
  const { error } = await supabase.from("movie_reviews").delete().match({
    id: reviewId,
    profile_id: TEMP_PROFILE_ID, // 나중에 로그인 유저 ID로 변경 예정
  });

  if (error) {
    console.error("리뷰 삭제 실패:", error);
  }
}
