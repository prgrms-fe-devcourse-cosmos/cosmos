import supabase from "../utils/supabase";

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
    return data?.reduce((acc, curr) => acc + curr.score, 0);
  } catch (e) {
    console.error(e);
  }
};
