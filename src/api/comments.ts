import { CommentType } from "../components/common/RealtimeComments";
import supabase from "../utils/supabase";

export const fetchCommentsByPostId = async (
  postId: number
): Promise<CommentType[]> => {
  try {
    const { data, error } = await supabase
      .from("comment")
      .select(`*, profiles:profile_id (id, username, avatar_url)`)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("fetch comments failed : ", error);
    }
    return data || [];
  } catch (e) {
    console.error("fetchCommentsByPostId 실패 : ", e);
    throw e;
  }
};
