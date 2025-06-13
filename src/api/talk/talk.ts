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
