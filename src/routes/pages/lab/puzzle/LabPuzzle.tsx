import React, { useEffect, useState } from "react";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import PuzzleScreen from "./PuzzleScreen";
import PuzzleConfig from "./PuzzleConfig";
import IntroScreen from "./IntroScreen";
import { useLocation } from "react-router-dom";

export default function LabPuzzle() {
  const [mode, setMode] = useState<{
    category: "space" | "film";
    difficulty: "easy" | "medium" | "hard";
  } | null>(null);

  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShowIntro(true);
    setMode(null);
  }, [location.key]);
  return (
    <div className=" w-full flex flex-col items-center pt-10">
      {showIntro ? (
        <IntroScreen onLaunch={() => setShowIntro(false)} />
      ) : mode === null ? (
        <PuzzleConfig
          onStart={setMode}
          onBack={() => {
            setShowIntro(true);
            setMode(null);
          }}
        />
      ) : (
        <PuzzleScreen category={mode.category} difficulty={mode.difficulty} />
      )}
    </div>
  );
}
