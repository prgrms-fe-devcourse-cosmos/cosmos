import React, { useEffect, useState } from "react";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import { useLoaderData, useNavigate } from "react-router-dom";
import Timer from "../../../../components/lab/puzzle/Timer";
import PuzzleResultModal from "../../../../components/lab/puzzle/PuzzleResultModal";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { usePuzzleSolver } from "../../../../hooks/usePuzzleSolver";
import { usePuzzleSetup } from "../../../../hooks/usePuzzleSetup";
import { LoaderData } from "../../../../types/daily";
import { useTranslateAndSummarize } from "../../../../hooks/useTranslateAndSummarize";
import { usePuzzleStore } from "../../../../stores/puzzleStore";

export default function PuzzleScreen() {
  const navigate = useNavigate();
  const { config } = usePuzzleStore();
  const { nasa } = useLoaderData() as LoaderData;

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);

  const {
    imageUrl,
    title,
    date,
    explanation,
    imageLoaded,
    puzzleGrid,
    timeLimit,
    setup,
  } = usePuzzleSetup(config, nasa);
  const { solve, score } = usePuzzleSolver(config, timeLeft!, () => {
    setIsTimerRunning(false);
    setShowResultModal(true);
  });
  const { translatedSummary: translatedSummary, isLoading } =
    useTranslateAndSummarize(explanation, date!);

  useEffect(() => {
    if (config == null) {
      navigate("/lab");
    }
  }, [config]);

  useEffect(() => {
    setup();
  }, [config]);

  useEffect(() => {
    if (timeLimit) setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft <= 0) {
      solve();
    }
  }, [timeLeft]);

  const closeHandler = () => {
    setShowResultModal(false);
    navigate("/lab");
  };

  const decrementTime = () => {
    setTimeLeft((prev) => Math.max(prev! - 1000, 0));
  };

  if (!config || !imageUrl || !imageLoaded || isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="w-full h-full flex gap-8 flex-col justify-center items-center text-[color:var(--primary-300)] font-[yapari] z-50">
        <Timer
          timeLeft={timeLeft!}
          countTime={decrementTime}
          isRunning={isTimerRunning}
        />
        <JigsawPuzzle
          imageSrc={imageUrl}
          rows={puzzleGrid.rows}
          columns={puzzleGrid.cols}
          // rows={2}
          // columns={2}
          onSolved={solve}
        />
      </div>
      {showResultModal && (
        <PuzzleResultModal
          onClose={closeHandler}
          score={score}
          title={title!}
          imgSrc={imageUrl}
          explanation={translatedSummary!}
        />
      )}
    </>
  );
}
