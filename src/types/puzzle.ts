export type Difficulty = "easy" | "medium" | "hard";
export type Category = "space" | "film";

export type PuzzleConfig = {
  category: Category;
  difficulty: Difficulty;
};

export const difficultyMap: Record<Difficulty, { rows: number; cols: number }> =
  {
    easy: { rows: 3, cols: 3 },
    medium: { rows: 4, cols: 4 },
    hard: { rows: 5, cols: 5 },
  };

export const difficultyTimeLimit: Record<Difficulty, number> = {
  easy: 1 * 60 * 1000,
  medium: 2 * 60 * 1000,
  hard: 3 * 60 * 1000,
};
export const difficultyMultiplier: Record<Difficulty, number> = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};
