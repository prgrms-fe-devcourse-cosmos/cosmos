import { QuizQuestion } from "../../../types/quiz";

interface QuestionBlockProps {
  currentIndex: number;
  currentQuestion: QuizQuestion;
  isSubmitted: boolean;
}

export default function QuestionBlock({
  currentIndex,
  currentQuestion,
  isSubmitted,
}: QuestionBlockProps) {
  return (
    <h2 className="text-center mb-10 font-medium ">
      <div className="h-[64px] flex items-center justify-center text-base leading-snug text-[color:var(--white)] text-center ">
        <span className="inline-block p-0">
          <span style={{ marginRight: "8px" }}>Q.{currentIndex + 1}</span>
          <span>{currentQuestion.question}</span>
        </span>
      </div>
      {isSubmitted && (
        <div className="text-sm text-center">
          <p>{currentQuestion.explanation}</p>
        </div>
      )}
    </h2>
  );
}
