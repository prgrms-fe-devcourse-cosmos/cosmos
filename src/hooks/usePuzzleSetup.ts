import { useState } from "react";
import {
  difficultyMap,
  difficultyTimeLimit,
  PuzzleConfig,
} from "../types/puzzle";
import { ApodData } from "../types/daily";
import { getSpaceMovies } from "../api/movie";

export const usePuzzleSetup = (config: PuzzleConfig, nasa: ApodData) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

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
    //space 선택 시
    if (config.category === "space" && nasa.media_type === "image") {
      loadImage(nasa.url);
      setExplanation(nasa.explanation);
      setTitle(nasa.title);
    } else {
      // film 선택 시
      const movies = await getSpaceMovies(1, "vote_average.desc");
      if (movies.length === 0) return;
      const random = movies[Math.floor(Math.random() * movies.length)];
      const fullPostUrl = `https://image.tmdb.org/t/p/w400${random.poster_path}`;
      loadImage(fullPostUrl);
      setTitle(random.title);
      setExplanation(random.overview);
    }
    const { rows, cols } = difficultyMap[config.difficulty];
    setPuzzleGrid({ rows, cols });
    setTimeLimit(difficultyTimeLimit[config.difficulty]);
  };
  return {
    imageUrl,
    title,
    explanation,
    imageLoaded,
    puzzleGrid,
    timeLimit,
    setup,
  };
};
