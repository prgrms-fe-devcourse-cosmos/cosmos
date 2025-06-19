import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useQuiz } from "../../../../hooks/useQuiz";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import QuizProgressBar from "../../../../components/lab/quiz/QuizProgressBar";
import QuestionBlock from "../../../../components/lab/quiz/QuestionBlock";
import OptionButtons from "../../../../components/lab/quiz/OptionButtons";
import NavigationButtons from "../../../../components/lab/quiz/NavigationButtons";
import { useAuthStore } from "../../../../stores/authStore";
import Button from "../../../../components/common/Button";

export default function QuizScreen() {
  const navigate = useNavigate();
  const { config } =
    useOutletContext<{ config: { difficulty: string } }>() ?? {};
  const difficulty = config?.difficulty ?? "";

  const userData = useAuthStore((state) => state.userData);
  const profileId = userData?.id;

  const {
    questions,
    currentIndex,
    selectedOptions,
    isSubmitted,
    score,
    maxPossibleScore,
    currentQuestion,
    handleOptionClick,
    handleNext,
    handlePrev,
    handleSubmit,
    handleRetry,
  } = useQuiz(difficulty, profileId!);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (questions.length === 0) {
    return showLoader ? <LoadingSpinner /> : null;
  }

  return (
    <div className="relative w-[480px] h-[525px] text-[color:var(--white)] font-[yapari] flex flex-col">
      <div className="absolute inset-0 bg-[url('/images/puzzle/quiz_play_bg.png')] bg-cover brightness-75 z-0" />

      {currentIndex === 0 && !isSubmitted && (
        <button
          className="absolute top-[-70px] left-[-260px] z-20 flex items-center gap-1 text-sm text-[color:var(--gray-100)] hover:text-[color:var(--primary-300)] transition duration-200"
          onClick={() => navigate("/lab/quiz/config")}
        >
          <ArrowLeft size={16} className="relative -top-[1px]" />
          <span className="relative top-[1px] cursor-pointer">BACK</span>
        </button>
      )}

      <div className="z-10 flex flex-col flex-grow">
        {!isSubmitted && (
          <QuizProgressBar
            currentIndex={currentIndex}
            total={questions.length}
          />
        )}

        {isSubmitted && (
          <div className="text-center text-[color:var(--primary-300)] mt-[-70px] mb-6">
            <p className="text-2xl mb-3">MY SCORE</p>
            <p className="text-xl">
              {score} / {maxPossibleScore}
            </p>
          </div>
        )}

        {currentQuestion && (
          <QuestionBlock
            currentIndex={currentIndex}
            currentQuestion={currentQuestion}
            isSubmitted={isSubmitted}
          />
        )}

        {currentQuestion && (
          <OptionButtons
            currentQuestion={currentQuestion}
            userSelected={selectedOptions[currentIndex]}
            isSubmitted={isSubmitted}
            onSelect={handleOptionClick}
          />
        )}

        <NavigationButtons
          currentIndex={currentIndex}
          total={questions.length}
          isSubmitted={isSubmitted}
          selected={selectedOptions[currentIndex]}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />

        {isSubmitted && (
          <div className="w-full mt-10 flex justify-center items-center gap-10 ">
            <div className="group">
              <Button variant="back" onClick={handleRetry}>
                RETRY
              </Button>
            </div>
            <div className="group">
              <Button
                variant="hover_fill"
                onClick={() => navigate("/lab/rank?tab=quiz")}
              >
                RANK
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
