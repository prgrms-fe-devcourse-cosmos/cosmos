import {
  Difficulty,
  difficultyMultiplier,
  difficultyTimeLimit,
} from "../types/puzzle";

export function calculatePuzzleScore(
  difficulty: Difficulty,
  timeLeft: number
): number {
  const score =
    ((difficultyTimeLimit[difficulty] - timeLeft) /
      difficultyTimeLimit[difficulty]) *
    difficultyMultiplier[difficulty] *
    100;
  return Math.round(score);
}
