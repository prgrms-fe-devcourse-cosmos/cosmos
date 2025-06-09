import React from "react";

export default function PuzzleResultModal({
  onClose,
  score,
}: {
  onClose: () => void;
  score: number;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-100 flex justify-center items-center ">
        <div className="bg-[color:var(--bg-color)] p-10 rounded-3xl shadow-lg text-center  flex flex-col items-center justify-between h-[240px] ">
          <p className="text-2xl">Game Over</p>
          <p className="text-xl">Score : {score}</p>
          <div className="flex justify-center w-full gap-10">
            <button
              className="w-[160px] z-20 cursor-pointer py-1 text-[color:var(--gray-200)] hover:text-[color:var(--primary-300)]"
              onClick={onClose}
            >
              RETRY
            </button>
            <button
              className="text-xs px-10 py-2 cursor-pointer border-1 rounded-lg  hover:text-[color:var(--bg-color)] hover:bg-[color:var(--primary-300)] hover:font-medium z-20 transition-all duration-300"
              onClick={onClose}
            >
              HOME
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
