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

  const categories: ("space" | "film")[] = ["space", "film"];
  const difficulties: ("easy" | "medium" | "hard")[] = [
    "easy",
    "medium",
    "hard",
  ];

  return (
    <div className="relative w-[768px] h-[432px] overflow-hidden text-[color:var(--primary-300)]">
      <div className="absolute inset-0 bg-[url('/images/puzzle/puzzle_start.png')] brightness-50 bg-cover" />

      <div className="relative w-[768px] h-[432px] z-10 flex flex-col py-20 px-8 font-[yapari] justify-between">
        <div className="w-full flex justify-center items-center text-2xl">
          <h1>SELECT MODE</h1>
        </div>
        <div className="flex w-full justify-center gap-20 text-white">
          <div className="flex flex-col gap-4">
            <h2 className="border-b-1 px-3 py-1 ">Category</h2>
            <div className="flex flex-col gap-2 text-sm ">
              {categories.map((item) => (
                <button
                  className={`cursor-pointer hover:text-[color:var(--primary-300)] ${
                    category === item
                      ? "font-medium text-[color:var(--primary-300)]"
                      : ""
                  }`}
                  onClick={() => setCategory(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col  gap-4">
            <h2 className="border-b-1 px-3 py-1 ">Difficulty</h2>
            <div className="flex flex-col gap-2 ">
              {difficulties.map((item) => (
                <button
                  className={`cursor-pointer hover:text-[color:var(--primary-300)] ${
                    difficulty === item
                      ? "font-medium text-[color:var(--primary-300)]"
                      : ""
                  }`}
                  onClick={() => setDifficulty(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            className="w-[160px] cursor-pointer border-1 py-1 rounded-lg text-sm hover:text-[color:var(--bg-color)] hover:bg-[color:var(--primary-300)] hover:font-medium z-20 transition-all duration-300"
            onClick={() => onStart({ category, difficulty })}
          >
            LAUNCH
          </button>
        </div>
      </div>
    </div>
  );
}
