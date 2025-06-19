import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../../components/common/Button";
import { useNavigate, useLocation } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import usePuzzleLeaderBoard from "../../../../hooks/usePuzzleLeaderBoard";
import useQuizLeaderBoard from "../../../../hooks/useQuizLeaderBoard";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

const tabs = [
  { id: "puzzle", label: "PUZZLE" },
  { id: "quiz", label: "QUIZ" },
];

export default function LabRank() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { puzzlePlayers, isLoading: puzzleLoading } = usePuzzleLeaderBoard();
  const { quizPlayers, isLoading: quizLoading } = useQuizLeaderBoard();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get("tab") ?? "puzzle";
  const [selected, setSelected] = useState(defaultTab);

  const [indicatorProps, setIndicatorProps] = useState<{
    left: number;
    width: number;
  }>({ left: 1, width: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const selectedTab = containerRef.current.querySelector(
      `[data-id="${selected}"]`
    );
    if (selectedTab) {
      const rect = (selectedTab as HTMLElement).getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setIndicatorProps({
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    }
  }, [selected]);

  return (
    <>
      <div className="w-full max-w-md mx-auto font-[yapari] h-full py-5 flex flex-col gap-6 justify-between">
        <div className="text-center text-xl flex flex-col gap-2">
          <p>TOP</p> <p>EXPLORERS</p>
        </div>
        <div
          ref={containerRef}
          className="flex bg-[#90909080] rounded-xl overflow-hidden select-none relative p-1"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-id={tab.id}
              onClick={() => setSelected(tab.id)}
              className={`relative flex-1 z-1 py-2 text-center transition-colors cursor-pointer text-sm ${
                selected === tab.id
                  ? "text-black font-medium"
                  : "text-[color:var(--bg-color-80)]"
              }`}
              role="tab"
              aria-selected={selected === tab.id}
            >
              {tab.label}
            </button>
          ))}
          <motion.div
            className="absolute top-1 bottom-1  z-0 rounded-xl bg-[color:var(--primary-300)]"
            layoutId="underline"
            initial={false}
            animate={{ left: indicatorProps.left, width: indicatorProps.width }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <div className="flex-1  min-h-0 overflow-y-auto">
          {puzzleLoading || quizLoading ? (
            <LoadingSpinner />
          ) : (
            <Leaderboard
              allPlayers={selected === "puzzle" ? puzzlePlayers : quizPlayers}
              isLoading={selected === "puzzle" ? puzzleLoading : quizLoading}
            />
          )}
        </div>
        <div className="flex w-full justify-center">
          <div className="group w-40">
            <Button variant="back" onClick={() => navigate("/lab")}>
              HOME
            </Button>
          </div>
          <div className="group">
            <Button
              variant="hover_fill"
              onClick={() => navigate(`/lab/${selected}`)}
            >
              TRY NOW
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
