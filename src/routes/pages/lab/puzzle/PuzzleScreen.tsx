import React, { useEffect, useState } from "react";
import {
  fetchFilmPuzzleImages,
  fetchSpacePuzzleImages,
} from "../../../../loader/puzzle.loader";
import { JigsawPuzzle } from "react-jigsaw-puzzle";

type Props = {
  category: "space" | "film";
  difficulty: "easy" | "medium" | "hard";
};

const difficultyMap = {
  easy: { rows: 3, cols: 4 },
  medium: { rows: 4, cols: 5 },
  hard: { rows: 5, cols: 6 },
};

export default function PuzzleScreen({ category, difficulty }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      const fetcher =
        category === "space" ? fetchSpacePuzzleImages : fetchFilmPuzzleImages;
      const images = await fetcher();
      if (images?.length) {
        const random = images[Math.floor(Math.random() * images.length)];
        setImageUrl(random.image_url);
      }
    };
    loadImage();
  }, [category]);

  const { rows, cols } = difficultyMap[difficulty];
  return (
    <>
      <div className="w-full h-full flex gap-8 flex-col items-center text-[color:var(--primary-300)] font-[yapari]">
        <h1 className="text-2xl">LV.1</h1>
        <JigsawPuzzle
          imageSrc={imageUrl ?? ""}
          rows={rows}
          columns={cols}
          onSolved={() => alert("solved")}
        />
      </div>
    </>
  );
}
