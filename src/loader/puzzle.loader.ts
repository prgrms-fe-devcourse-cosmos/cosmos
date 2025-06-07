import supabase from "../utils/supabase";

export const fetchSpacePuzzleImages = async () => {
  try {
    const { data: puzzle_images } = await supabase
      .from("puzzle_images")
      .select("image_url")
      .eq("category", "space");
    return puzzle_images;
  } catch (e) {
    console.error(e);
  }
};

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
