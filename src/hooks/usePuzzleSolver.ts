import { useRef, useState } from "react";
import { PuzzleConfig } from "../types/puzzle";
import { calculatePuzzleScore } from "../utils/score";
import supabase from "../utils/supabase";
import { fetchCurrentUserPuzzleScore } from "../loader/puzzle.loader";

export function usePuzzleSolver(
  config: PuzzleConfig,
  timeLeft: number,
  onDone: () => void
) {
  const isSolvedRef = useRef(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const solve = async () => {
    if (isSolvedRef.current) return;
    isSolvedRef.current = true;

    const finalScore = calculatePuzzleScore(config.difficulty, timeLeft);
    setScore(finalScore);

    const { error } = await supabase.from("puzzle_scores").insert([
      {
        score: finalScore,
        profile_id: "24ebfed1-5c40-4d11-8647-1df1d1eaa7c4",
      },
    ]);

    if (error) {
      console.error("Score insert error:", error);
    }
    const total = await fetchCurrentUserPuzzleScore({
      userId: "24ebfed1-5c40-4d11-8647-1df1d1eaa7c4",
    });
    setTotalScore(total ?? 0);
    onDone();
  };
  return { solve, score, totalScore };
}
