import React, { useState } from "react";

type Props = {
  onStart: (config: {
    category: "space" | "film";
    difficulty: "easy" | "medium" | "hard";
  }) => void;
};
export default function PuzzleConfig({ onStart }: Props) {
  const [category, setCategory] = useState<"space" | "film">("space");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  return (
    <>
      <div className="flex flex-col py-10 px-8 w-[768px] h-[432px] bg-[color:var(--primary-300)] text-[color:var(--bg-color)] font-[yapari] justify-between">
        <div className="w-full flex justify-center items-center font-medium text-2xl">
          <h1>SELECT MODE</h1>
        </div>
        <div className="flex w-full justify-center gap-20">
          <div className="flex flex-col gap-4">
            <h2 className="border-1 border-[color:var(--bg-color)] px-3 py-1 font-medium rounded-xl">
              Category
            </h2>
            <div className="flex flex-col gap-2">
              <button
                className={`cursor-pointer hover:font-medium ${
                  category === "space" ? "font-medium" : ""
                }`}
                onClick={() => setCategory("space")}
              >
                Space
              </button>
              <button
                className={`cursor-pointer hover:font-medium ${
                  category === "film" ? "font-medium" : ""
                }`}
                onClick={() => setCategory("film")}
              >
                Film
              </button>
            </div>
          </div>
          <div className="flex flex-col  gap-4">
            <h2 className="border-1 border-[color:var(--bg-color)] px-3 py-1 font-medium rounded-xl">
              Difficulty
            </h2>
            <div className="flex flex-col gap-2">
              <button
                className={`cursor-pointer hover:font-medium ${
                  difficulty === "easy" ? "font-medium" : ""
                }`}
                onClick={() => setDifficulty("easy")}
              >
                Easy
              </button>
              <button
                className={`cursor-pointer hover:font-medium ${
                  difficulty === "medium" ? "font-medium" : ""
                }`}
                onClick={() => setDifficulty("medium")}
              >
                Medium
              </button>
              <button
                className={`cursor-pointer hover:font-medium ${
                  difficulty === "hard" ? "font-medium" : ""
                }`}
                onClick={() => setDifficulty("hard")}
              >
                Hard
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            className="bg-[color:var(--bg-color)] w-[160px] text-white cursor-pointer"
            onClick={() => onStart({ category, difficulty })}
          >
            START
          </button>
        </div>
      </div>
    </>
  );
}
