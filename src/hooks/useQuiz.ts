import { useState, useEffect, useCallback, useRef } from "react";
import { QuizQuestion } from "../types/quiz";
import supabase from "../utils/supabase";

function getRandomQuestions(arr: QuizQuestion[], n: number): QuizQuestion[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
}

export function useQuiz(difficulty: string) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchQuestions = useCallback(async () => {
    if (!difficulty || hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const { data, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("difficulty", difficulty);

    if (!error && data) {
      const randomQuestions = getRandomQuestions(data as QuizQuestion[], 10);
      setQuestions(randomQuestions);
      setSelectedOptions(Array(randomQuestions.length).fill(null));
      setCurrentIndex(0);
      setIsSubmitted(false);
    }
  }, [difficulty]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleOptionClick = (option: string) => {
    if (isSubmitted) return;
    const updated = [...selectedOptions];
    updated[currentIndex] = option;
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setCurrentIndex(0);
  };

  const handleRetry = () => {
    hasFetchedRef.current = false;
    fetchQuestions();
  };

  const score = selectedOptions.reduce(
    (acc, selected, idx) =>
      questions[idx]?.correct_answer === selected ? acc + 1 : acc,
    0
  );

  return {
    questions,
    currentIndex,
    selectedOptions,
    isSubmitted,
    score,
    currentQuestion: questions.length > 0 ? questions[currentIndex] : null,
    handleOptionClick,
    handleNext,
    handlePrev,
    handleSubmit,
    handleRetry,
  };
}