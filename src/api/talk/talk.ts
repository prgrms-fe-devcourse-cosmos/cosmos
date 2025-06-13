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

// talk 게시글 좋아요 부분
// 현재 좋아요 가져오기
export const getTalkPostLike = async (
  postId: number,
  profileId: string
): Promise<boolean> => {
  const { data } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .eq("profile_id", profileId)
    .single();

  return !!data;
};

// 좋아요 추가
export const addTalkPostLike = async (postId: number, profileId: string) => {
  return await supabase
    .from("likes")
    .insert([{ post_id: postId, profile_id: profileId }]);
};

// 좋아요 취소
export const removeTalkPostLike = async (postId: number, profileId: string) => {
  return await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId)
    .eq("profile_id", profileId);
};
