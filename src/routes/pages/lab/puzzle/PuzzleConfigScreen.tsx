import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { PuzzleConfig } from "../../../../types/puzzle";
import Picker from "react-mobile-picker";
import Button from "../../../../components/common/Button";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

const selections: Record<keyof PuzzleConfig, string[]> = {
  category: ["space", "film"],
  difficulty: ["easy", "medium", "hard"],
};

export default function PuzzleConfigScreen() {
  const navigate = useNavigate();
  const { onStart } = useOutletContext<{
    onStart: (config: PuzzleConfig) => void;
  }>();

  const [pickerValue, setPickerValue] = useState<PuzzleConfig>({
    category: "space",
    difficulty: "easy",
  });
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    // 살짝의 지연을 주어 Spinner가 보일 수 있게 함
    setTimeout(() => {
      onStart(pickerValue);
    }, 300); // 최소 300ms 이상은 되어야 스피너 표시됨
  };

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
          <div className="group">
            <Button
              variant="back"
              onClick={() => navigate(-1)}
              disabled={isLaunching}
            >
              BACK
            </Button>
          </div>

          <div className="group">
            <Button
              variant="hover_fill"
              onClick={handleLaunch}
              disabled={isLaunching}
            >
              LAUNCH
            </Button>
          </div>
        </div>
      </div>
      {isLaunching && <LoadingSpinner />}
    </div>
  );
}
