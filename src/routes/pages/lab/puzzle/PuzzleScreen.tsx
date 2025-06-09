import React, { startTransition, useEffect, useRef, useState } from "react";
import {
  fetchCurrentUserPuzzleScore,
  fetchFilmPuzzleImages,
} from "../../../../loader/puzzle.loader";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { LoaderData } from "../../../../types/types";
import Timer from "../../../../components/lab/puzzle/Timer";
import PuzzleResultModal from "../../../../components/lab/puzzle/PuzzleResultModal";
import {
  difficultyMap,
  difficultyTimeLimit,
  PuzzleConfig,
} from "../../../../types/puzzle";
import { calculatePuzzleScore } from "../../../../utils/score";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import supabase from "../../../../utils/supabase";

export default function PuzzleScreen() {
  const navigate = useNavigate();
  const config = useOutletContext<PuzzleConfig>();
  const { nasa } = useLoaderData() as LoaderData;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(1);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const isSolvedRef = useRef(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [puzzleGrid, setPuzzleGrid] = useState<{ rows: number; cols: number }>({
    rows: 1,
    cols: 1,
  });

  const solvedHandler = () => {
    if (isSolvedRef.current) return;
    isSolvedRef.current = true;

    setIsTimerRunning(false);
    const finalScore = calculatePuzzleScore(config.difficulty, timeLeft);
    setScore(finalScore);

    startTransition(async () => {
      const { data } = await supabase.from("puzzle_scores").insert([
        {
          score: finalScore,
          profile_id: "24ebfed1-5c40-4d11-8647-1df1d1eaa7c4",
        },
      ]);

      if (data) {
        alert("점수 등록 완료");
      }
      const total = await fetchCurrentUserPuzzleScore({
        userId: "24ebfed1-5c40-4d11-8647-1df1d1eaa7c4",
      });
      setTotalScore(total ?? 0);
      setShowResultModal(true);
    });
  };

  const closeHandler = () => {
    setShowResultModal(false);
    navigate("/lab");
  };

  const decrementTime = () => {
    setTimeLeft((prev) => Math.max(prev - 1000, 0));
  };

  const loadImage = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => setImageLoaded(true);
    setImageUrl(url);
  };

  useEffect(() => {
    if (timeLeft <= 0 && !isSolvedRef.current) {
      isSolvedRef.current = true;
      setIsTimerRunning(false);
      setShowResultModal(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!config) return;

    const setupPuzzle = async () => {
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
      setTimeLeft(difficultyTimeLimit[config.difficulty]);
      const { rows, cols } = difficultyMap[config.difficulty];
      setPuzzleGrid({ rows, cols });
    };

    setupPuzzle();
  }, [config, nasa]);

  if (!config || !imageUrl || !imageLoaded) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="w-full h-full flex gap-8 flex-col justify-center items-center text-[color:var(--primary-300)] font-[yapari] z-50">
        <Timer
          timeLeft={timeLeft}
          countTime={decrementTime}
          isRunning={isTimerRunning}
        />
        <JigsawPuzzle
          imageSrc={imageUrl}
          // rows={puzzleGrid.rows}
          // columns={puzzleGrid.cols}
          rows={2}
          columns={2}
          onSolved={() => solvedHandler()}
        />
      </div>
      {showResultModal && (
        <PuzzleResultModal
          onClose={closeHandler}
          score={score}
          totalScore={totalScore}
        />
      )}
    </>
  );
}
