// talk 게시글
import supabase from "../../utils/supabase";

// 게시글 리스트 조회
export async function fetchTalkPosts() {
  const { data, error } = await supabase
    .from("talk_posts_with_counts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// 게시글 삭제
// 추가 개선 사항
// post의 좋아요가 있으면 좋아요 삭제
// post의 댓글이 있으면 댓글 삭제
export const deleteTalkPostById = async (postId: number) => {
  // 좋아요 삭제
  const { error: likeError } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId);

  if (likeError) {
    console.error("좋아요 삭제 실패:", likeError.message);
    return { success: false, message: "좋아요 삭제 중 오류 발생" };
  }

  // 댓글 삭제
  const { error: commentError } = await supabase
    .from("comment")
    .delete()
    .eq("post_id", postId);

  if (commentError) {
    console.error("댓글 삭제 실패:", commentError.message);
    return { success: false, message: "댓글 삭제 중 오류 발생" };
  }

  // 게시글 삭제
  const { error: postError } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (postError) {
    console.error("게시글 삭제 실패:", postError.message);
    return { success: false, message: "게시글 삭제 중 오류 발생" };
  }

  return { success: true, message: "게시글 삭제 완료" };
};

// 게시글 댓글 수 가져오기
export async function fetchTalkCommentCount(postId: number): Promise<number> {
  const { count, error } = await supabase
    .from("comment")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) {
    console.error("댓글 수 가져오기 실패:", error.message);
    return 0;
  }

  return count ?? 0;
}
