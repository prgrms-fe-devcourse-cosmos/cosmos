interface GetOptionStyleParams {
  option: string;
  correctAnswer: string;
  userSelected: string | null;
  isSubmitted: boolean;
}

export function getOptionStyle({
  option,
  correctAnswer,
  userSelected,
  isSubmitted,
}: GetOptionStyleParams) {
  const isAnswer = option === correctAnswer;
  const isSelected = option === userSelected;

  let borderClass = "border border-white/40";
  let bgClass = isSubmitted ? "bg-none" : "bg-white/15"
  let textClass = "text-white/80";

  if (isSubmitted) {
    if (isAnswer) {
      borderClass = "border-2 border-[color:var(--primary-300)]";
      textClass = "text-[color:var(--primary-300)] font-medium";
    }
    if (isSelected && !isAnswer) {
      borderClass = "border-2 border-[color:var(--red)]";
      textClass = "text-[color:var(--red)] font-medium";
    }
  } else {
    if (isSelected) {
      borderClass = "border-2 border-[color:var(--primary-300)]";
      textClass = "text-[color:var(--primary-300)] font-semibold";
    } 
  }

  return { borderClass, bgClass, textClass };
}