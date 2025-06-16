import { CommentType } from "../components/common/RealtimeComments";
import supabase from "../utils/supabase";

export const fetchCommentsByPostId = async (
  postId: number
): Promise<CommentType[]> => {
  try {
    const { data, error } = await supabase
      .from("comment")
      .select(`*, profiles:profile_id (id, username, avatar_url, usercode)`)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("fetch comments failed : ", error);
    }
    return data || ([] as CommentType[]);
  } catch (e) {
    console.error("fetchCommentsByPostId 실패 : ", e);
    throw e;
  }
};

export const createComment = async (
  post_id: number,
  content: string,
  profile_id: string
): Promise<CommentType | undefined> => {
  try {
    const { data, error } = await supabase
      .from("comment")
      .insert([
        {
          content: content.trim(),
          post_id: post_id,
          profile_id: profile_id,
        },
      ])
      .select(
        `*,
          profiles:profile_id (
            id,
            username,
            avatar_url,
            usercode
          )`
      )
      .single();
    if (error) {
      console.error("댓글 작성 실패: ", error);
    }
    return data as CommentType;
  } catch (e) {
    console.error("댓글 작성 실패 : ", e);
  }
};

export const deleteComment = async (
  commentId: number,
  profileId: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("comment")
      .delete()
      .eq("id", commentId)
      .eq("profile_id", profileId);
    if (error) {
      console.error("댓글 삭제 실패 : ", error);
    }
  } catch (e) {
    console.error("delete comment failed : ", e);
  }
};

export const updateComment = async (
  commentId: number,
  updatedContent: string
): Promise<CommentType | undefined> => {
  try {
    const { data, error } = await supabase
      .from("comment")
      .update({ content: updatedContent })
      .eq("id", commentId)
      .select(
        `*,
          profiles:profile_id (
            id,
            username,
            avatar_url,
            usercode
          )`
      )
      .single();

    if (error) {
      console.error("댓글 업데이트 실패: ", error);
    }

    return data as CommentType;
  } catch (e) {
    console.error("update comment failed : ", e);
  }
};
