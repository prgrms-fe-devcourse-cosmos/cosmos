interface NavigationButtonsProps {
  currentIndex: number;
  total: number;
  isSubmitted: boolean;
  selected: string | null;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  total,
  isSubmitted,
  selected,
  onPrev,
  onNext,
  onSubmit,
}) => {
  const isLastQuestion = currentIndex + 1 === total;
  const isAnswered = selected !== null;

  return (
    <>
      <div className="z-10 mt-6 flex justify-center items-center gap-27">
        <button
          className={`text-[color:var(--white)] text-sm tracking-widest ${
            currentIndex === 0
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          &lt; PREV
        </button>

        {isLastQuestion ? (
          <button
            className="text-sm tracking-widest text-[color:var(--gray-300)] cursor-not-allowed"
            disabled
          >
            NEXT &gt;
          </button>
        ) : (
          <button
            className={`text-sm tracking-widest flex items-center ${
              isAnswered ? "cursor-pointer" : "text-[color:var(--gray-300)] cursor-not-allowed"
            }`}
            onClick={onNext}
            disabled={!isAnswered}
          >
            NEXT &gt;
          </button>
        )}
      </div>

      {isLastQuestion && !isSubmitted && (
        <div className="z-10 mt-10 w-full flex justify-center">
          <button
            className={`text-lg tracking-widest px-6 py-2 rounded-lg transition-all duration-300 ${
              isAnswered
                ? "text-[color:var(--white)] hover:text-[color:var(--primary-300)] cursor-pointer"
                : "text-[color:var(--gray-300)] cursor-not-allowed"
            }`}
            onClick={onSubmit}
            disabled={!isAnswered || isSubmitted}
          >
            SUBMIT
          </button>
        </div>
      )}
    </>
  );
};

export default NavigationButtons;