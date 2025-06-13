import supabase from "../utils/supabase";

// 팔로우 여부 확인
export const getFollowStatus = async (
  followerId: string,
  followingId: string
) => {
  const { data, error } = await supabase
    .from("follows")
    .select("follower_id")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
};

// 팔로우 추가
export const followUser = async (followerId: string, followingId: string) => {
  const { error } = await supabase
    .from("follows")
    .insert({ follower_id: followerId, following_id: followingId });

  if (error) throw error;
};

// 언팔
export const unfollowUser = async (followerId: string, followingId: string) => {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);

  if (error) throw error;
};
