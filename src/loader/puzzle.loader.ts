import supabase from "../utils/supabase";

export const fetchFilmPuzzleImages = async () => {
  try {
    const { data: puzzle_images } = await supabase
      .from("puzzle_images")
      .select("image_url")
      .eq("category", "film");
    return puzzle_images;
  } catch (e) {
    console.error(e);
  }
};

export const fetchCurrentUserPuzzleScore = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const { data } = await supabase
      .from("puzzle_scores")
      .select("score")
      .eq("profile_id", userId);
    console.log("🔍 fetched scores:", data);
    return data?.reduce((acc, curr) => acc + curr.score, 0);
  } catch (e) {
    console.error(e);
  }
};
