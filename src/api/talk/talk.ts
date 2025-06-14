// talk 게시글
import supabase from "../../utils/supabase";

// 게시글 리스트 조회
export async function fetchTalkPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(id, username, avatar_url)")
    .eq("post_type", "talk")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// 게시글 삭제
export const deleteTalkPostById = async (id: number) => {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  return { error };
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
