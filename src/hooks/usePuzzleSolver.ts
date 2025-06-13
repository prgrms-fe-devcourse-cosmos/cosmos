import { useRef, useState } from 'react';
import { PuzzleConfig } from '../types/puzzle';
import { calculatePuzzleScore } from '../utils/score';
import supabase from '../utils/supabase';
import { fetchCurrentUserPuzzleScore } from '../loader/puzzle.loader';
import { useAuthStore } from '../stores/authStore';

export function usePuzzleSolver(
  config: PuzzleConfig | null,
  timeLeft: number,
  onDone: () => void
) {
  const isSolvedRef = useRef(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const userId = useAuthStore((state) => state.id);

  const solve = async () => {
    if (!config || !userId) return;

    if (isSolvedRef.current) return;
    isSolvedRef.current = true;

    const finalScore = calculatePuzzleScore(config.difficulty, timeLeft);
    setScore(finalScore);

    const { error } = await supabase.from('puzzle_scores').insert([
      {
        score: finalScore,
        profile_id: userId,
      },
    ]);

    if (error) {
      console.error('Score insert error:', error);
    }
    const total = await fetchCurrentUserPuzzleScore({
      userId: userId!,
    });
    setTotalScore(total ?? 0);
    onDone();
  };
  return { solve, score, totalScore };
}
