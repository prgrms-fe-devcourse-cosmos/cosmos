import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type PuzzleConfigType = {
  category: "space" | "film";
  difficulty: "easy" | "medium" | "hard";
} | null;

export default function LabPuzzle() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<PuzzleConfigType>(null);

  const handleStart = (config: NonNullable<PuzzleConfigType>) => {
    setConfig(config);
    navigate("play");
  };
  return (
    <div className=" w-full flex flex-col items-center pt-10">
      <Outlet context={{ onStart: handleStart, config }} />
    </div>
  );
}
