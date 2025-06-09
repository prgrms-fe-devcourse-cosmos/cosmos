import { useState } from "react";
import {
  difficultyMap,
  difficultyTimeLimit,
  PuzzleConfig,
} from "../types/puzzle";
import { fetchFilmPuzzleImages } from "../loader/puzzle.loader";
import { ApodData } from "../types/types";

export const usePuzzleSetup = (config: PuzzleConfig, nasa: ApodData) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [puzzleGrid, setPuzzleGrid] = useState<{ rows: number; cols: number }>({
    rows: 1,
    cols: 1,
  });
  const [timeLimit, setTimeLimit] = useState(0);

  const loadImage = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => setImageLoaded(true);
    setImageUrl(url);
  };

  const setup = async () => {
    if (config.category === "space" && nasa.media_type === "image") {
      loadImage(nasa.url);
    } else {
      const images = await fetchFilmPuzzleImages();
      if (!images?.length) return;
      const random = images[Math.floor(Math.random() * images.length)];
      if (random?.image_url) {
        loadImage(random.image_url);
      }
    }
    const { rows, cols } = difficultyMap[config.difficulty];
    setPuzzleGrid({ rows, cols });
    setTimeLimit(difficultyTimeLimit[config.difficulty]);
  };
  return { imageUrl, imageLoaded, puzzleGrid, timeLimit, setup };
};
