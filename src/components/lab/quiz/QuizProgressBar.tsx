interface QuizProgressBarProps {
  currentIndex: number;
  total: number;
}

export default function QuizProgressBar({ currentIndex, total }: QuizProgressBarProps) {
  const percentage = ((currentIndex + 1) / total) * 100;

  return (
    <div className="flex justify-center items-center w-full mb-8">
      <div className="w-[304px] h-1.5 bg-[color:var(--white)]/30 rounded">
        <div
          className="h-full bg-[color:var(--primary-300)] rounded"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}