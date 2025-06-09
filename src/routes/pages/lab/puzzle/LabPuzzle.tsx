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
    <div className=" w-full flex flex-col items-center h-full pt-10">
      <Outlet context={{ onStart: handleStart, config }} />
    </div>
  );
}
