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

export async function updateImage(file: File, userId: string) {
  const fileName = `${userId}-${Date.now()}`;
  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) {
    console.error("이미지 업데이트 에러 : ", error);
  }

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

export async function resetImage(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ avatar_url: "" })
    .eq("id", userId)
    .select();

  if (error) throw error;
  return data[0];
}
