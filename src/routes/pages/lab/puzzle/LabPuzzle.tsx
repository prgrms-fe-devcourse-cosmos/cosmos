import React, { useState } from "react";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import PuzzleScreen from "./PuzzleScreen";
import PuzzleConfig from "./PuzzleConfig";
import IntroScreen from "./IntroScreen";

export default function LabPuzzle() {
  const [mode, setMode] = useState<{
    category: "space" | "film";
    difficulty: "easy" | "medium" | "hard";
  } | null>(null);

  const [showIntro, setShowIntro] = useState(true);
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      {showIntro ? (
        <IntroScreen onLaunch={() => setShowIntro(false)} />
      ) : mode === null ? (
        <PuzzleConfig onStart={setMode} />
      ) : (
        <PuzzleScreen category={mode.category} difficulty={mode.difficulty} />
      )}
    </div>
  );
}
