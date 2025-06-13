import supabase from "../../utils/supabase";

export async function updateProfile(
  id: string,
  username: string,
  avatar_url: string,
  bio: string | null
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ username: username, avatar_url: avatar_url, bio: bio })
    .eq("id", id)
    .select();
  if (error) {
    console.error("Update Profile : ", error);
  }
  return data;
}
