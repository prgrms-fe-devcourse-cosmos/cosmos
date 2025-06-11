import { Outlet, useNavigate } from "react-router-dom";
import { PuzzleConfig } from "../../../../types/puzzle";
import { usePuzzleStore } from "../../../../stores/puzzleStore";

export default function LabPuzzle() {
  const navigate = useNavigate();
  const { setConfig } = usePuzzleStore();

  const handleStart = (config: PuzzleConfig) => {
    setConfig(config);
    navigate("play");
  };
  return (
    <div className=" w-full h-full flex flex-col items-center">
      <Outlet context={{ onStart: handleStart }} />
    </div>
  );
}
