import { create } from "zustand";
import { PuzzleConfig } from "../types/puzzle";

type PuzzleStore = {
  config: PuzzleConfig | null;
  setConfig: (config: PuzzleConfig) => void;
};

export const usePuzzleStore = create<PuzzleStore>((set) => ({
  config: null,
  setConfig: (config) => set({ config }),
}));
