import React, { useEffect, useState } from "react";
import { fetchFilmPuzzleImages } from "../../../../loader/puzzle.loader";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { LoaderData } from "../../../../types/types";
import Timer from "../../../../components/lab/puzzle/Timer";
import PuzzleResultModal from "../../../../components/lab/puzzle/PuzzleResultModal";

type ContextType = {
  config: {
    category: "space" | "film";
    difficulty: "easy" | "medium" | "hard";
  } | null;
};

const difficultyMap = {
  easy: { rows: 3, cols: 4 },
  medium: { rows: 4, cols: 5 },
  hard: { rows: 5, cols: 6 },
};

export default function PuzzleScreen() {
  const navigate = useNavigate();
  const { config } = useOutletContext<ContextType>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { nasa } = useLoaderData() as LoaderData;
  const [showResultModal, setShowResultModal] = useState(false);
  const closeHandler = () => {
    setShowResultModal(false);
    navigate("/lab");
  };

  const MINUTES_IN_MS = 1 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);
  const countTime = () => {
    setTimeLeft((prevTime) => prevTime - INTERVAL);
  };

  const solvedHandler = () => {
    console.log("solved");
    setShowResultModal(true);
  };

  useEffect(() => {
    let isMounted = true;
    if (!config) return;

    if (
      config.category === "space" &&
      nasa.media_type === "image" &&
      isMounted
    ) {
      setImageUrl(nasa.url);
    } else {
      const loadImage = async () => {
        const fetcher = fetchFilmPuzzleImages;
        const images = await fetcher();
        if (isMounted && images?.length) {
          const random = images[Math.floor(Math.random() * images.length)];
          setImageUrl(random.image_url);
        }
      };
      loadImage();
    }
    return () => {
      isMounted = false;
    };
  }, [config, nasa]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResultModal(true);
    }
  }, [timeLeft]);

  if (!config || !imageUrl) {
    return <div>퍼즐 이미지를 불러오는 중입니다...</div>;
  }

  if (!imageUrl) {
    return <div>이미지 정보를 불러올 수 없습니다.</div>;
  }

  const { rows, cols } = difficultyMap[config.difficulty];
  return (
    <>
      <div className="w-full h-full flex gap-8 flex-col justify-center items-center text-[color:var(--primary-300)] font-[yapari] z-50">
        <Timer timeLeft={timeLeft} countTime={countTime} />
        <JigsawPuzzle
          imageSrc={imageUrl}
          rows={rows}
          columns={cols}
          onSolved={() => solvedHandler()}
        />
      </div>
      {showResultModal && <PuzzleResultModal onClose={closeHandler} />}
    </>
  );
}
