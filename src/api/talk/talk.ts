// talk 게시글
import supabase from "../../utils/supabase";

// 게시글 등록
export async function addTalkPost(
  title: string,
  content: string,
  profile_id: string
) {
  const { data, error } = await supabase.from("posts").insert([
    {
      title,
      content,
      profile_id,
      post_type: "talk",
    },
  ]);

  if (error) throw error;
  return data;
}

// 게시글 리스트 조회
export async function fetchTalkPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username, avatar_url)")
    .eq("post_type", "talk")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
