interface QuizProgressBarProps {
  currentIndex?: number;
  total: number;
  variant?: 'default' | 'news';
  percentage?: number;
}

export default function QuizProgressBar({
  currentIndex = 0,
  total,
  variant = 'default',
  percentage,
}: QuizProgressBarProps) {
  const progress =
    percentage !== undefined ? percentage : ((currentIndex + 1) / total) * 100;
  const newWidth =
    variant === 'news'
      ? 'w-[270px] sm:w-[540px] md:w-[640px] lg:w-[920px] xl:w-[1080px]'
      : 'w-[304px]';

  return (
    <div className="flex justify-center items-center w-full mb-8">
      <div className={`${newWidth} h-1.5 bg-[color:var(--white)]/30 rounded`}>
        <div
          className="h-full bg-[color:var(--primary-300)] rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
