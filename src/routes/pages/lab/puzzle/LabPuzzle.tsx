import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PuzzleConfig } from "../../../../types/puzzle";

export default function LabPuzzle() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<PuzzleConfig | null>(null);

  const handleStart = (config: PuzzleConfig) => {
    setConfig(config);
    navigate("play");
  };
  return (
    <div className=" w-full h-full flex flex-col items-center">
      <Outlet context={{ onStart: handleStart, ...config }} />
    </div>
  );
}
