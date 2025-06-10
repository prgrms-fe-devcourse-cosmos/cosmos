import React, { useEffect, useState } from "react";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import Timer from "../../../../components/lab/puzzle/Timer";
import PuzzleResultModal from "../../../../components/lab/puzzle/PuzzleResultModal";
import { PuzzleConfig } from "../../../../types/puzzle";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { usePuzzleSolver } from "../../../../hooks/usePuzzleSolver";
import { usePuzzleSetup } from "../../../../hooks/usePuzzleSetup";
import { LoaderData } from "../../../../types/daily";

export default function PuzzleScreen() {
  const navigate = useNavigate();
  const config = useOutletContext<PuzzleConfig>();
  const { nasa } = useLoaderData() as LoaderData;

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);

  const { imageUrl, imageLoaded, puzzleGrid, timeLimit, setup } =
    usePuzzleSetup(config, nasa);
  const { solve, score, totalScore } = usePuzzleSolver(
    config,
    timeLeft!,
    () => {
      setIsTimerRunning(false);
      setShowResultModal(true);
    }
  );

  useEffect(() => {
    setup();
  }, [config]);

  useEffect(() => {
    if (timeLimit) setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft <= 0) solve();
  }, [timeLeft]);

  const closeHandler = () => {
    setShowResultModal(false);
    navigate("/lab");
  };

  const decrementTime = () => {
    setTimeLeft((prev) => Math.max(prev! - 1000, 0));
  };

  if (!config || !imageUrl || !imageLoaded) {
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
          onSolved={solve}
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
