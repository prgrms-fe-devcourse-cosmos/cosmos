import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { PuzzleConfig } from "../../../../types/puzzle";
import Picker from "react-mobile-picker";

const selections: Record<"category" | "difficulty", string[]> = {
  category: ["space", "film"],
  difficulty: ["easy", "medium", "hard"],
};

export default function PuzzleConfig() {
  const navigate = useNavigate();
  const { onStart } = useOutletContext<{
    onStart: (config: PuzzleConfig) => void;
  }>();

  const [pickerValue, setPickerValue] = useState<{
    category: string;
    difficulty: string;
  }>({
    category: "space",
    difficulty: "easy",
  });

  return (
    <div className="relative w-[768px] h-[560px] overflow-hidden text-[color:var(--primary-300)]">
      <div className="absolute inset-0 bg-[url('/images/puzzle/puzzle_start.png')] brightness-50 bg-cover" />

      <div className="relative w-[768px] h-[560px] z-10 flex flex-col py-20 px-8 font-[yapari] justify-between">
        <div className="w-full flex justify-center items-center text-4xl">
          <h1>SELECT MODE</h1>
        </div>

        <Picker
          value={pickerValue}
          onChange={setPickerValue}
          wheelMode="normal"
          className="picker"
          height={240}
          itemHeight={60}
        >
          {(Object.keys(selections) as (keyof typeof selections)[]).map(
            (name) => (
              <Picker.Column key={name} name={name}>
                {selections[name].map((option) => (
                  <Picker.Item
                    key={option}
                    value={option}
                    className="cursor-pointer"
                  >
                    {({ selected }) => (
                      <div
                        className={` transition-colors ${
                          selected
                            ? "text-[color:var(--primary-300)] text-3xl"
                            : "text-[color:var(--primary-200)] text-xl"
                        }`}
                      >
                        {option.toUpperCase()}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            )
          )}
        </Picker>

        <div className="w-full flex justify-center items-center gap-10 ">
          <button
            className="w-[160px] z-20 cursor-pointer py-1 text-[color:var(--gray-200)] hover:text-[color:var(--primary-300)]"
            onClick={() => navigate(-1)}
          >
            BACK
          </button>
          <button
            className="px-10 py-2 cursor-pointer border-1 rounded-lg  hover:text-[color:var(--bg-color)] hover:bg-[color:var(--primary-300)] hover:font-medium z-20 transition-all duration-300"
            onClick={() => onStart(pickerValue)}
          >
            LAUNCH
          </button>
        </div>
      </div>
    </div>
  );
}
