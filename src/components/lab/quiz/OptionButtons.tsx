import { QuizQuestion } from "../../../types/quiz";
import { getOptionStyle } from "../../../utils/quiz";

interface OptionButtonsProps {
  currentQuestion: QuizQuestion;
  userSelected: string | null;
  isSubmitted: boolean;
  onSelect: (option: string) => void;
}

export default function OptionButtons({
  currentQuestion,
  userSelected,
  isSubmitted,
  onSelect,
}: OptionButtonsProps) {
  const isBoolean = currentQuestion.type === "ox";

  if (isBoolean) {
    return (
      <div className="w-[480px] mx-auto flex justify-between gap-8">
        {["O", "X"].map((option) => {
          const { borderClass, bgClass, textClass } = getOptionStyle({
            option,
            correctAnswer: currentQuestion.correct_answer,
            userSelected,
            isSubmitted,
          });

          return (
            <button
              key={option}
              disabled={isSubmitted}
              onClick={() => onSelect(option)}
              className={`w-[460px] h-[200px] flex items-center justify-center text-3xl rounded-lg transition-all duration-300 border 
                ${isSubmitted ? "" : "cursor-pointer"} 
                ${borderClass} ${bgClass} ${textClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-[480px] flex flex-col gap-6 mx-auto text-sm">
      {currentQuestion.options.map((option) => {
        const { borderClass, bgClass, textClass } = getOptionStyle({
          option,
          correctAnswer: currentQuestion.correct_answer,
          userSelected,
          isSubmitted,
        });

        return (
          <button
            key={option}
            disabled={isSubmitted}
            onClick={() => onSelect(option)}
            className={`w-[480px] h-[44px] pl-6 rounded-lg text-left transition-all duration-300 border 
              ${isSubmitted ? "" : "cursor-pointer"} 
              ${borderClass} ${bgClass} ${textClass}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
