import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("difficulty", difficulty);

      if (!error && data) {
        const selected = getRandomQuestions(data as QuizQuestion[], 10);
        setQuestions(selected);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  useEffect(() => {
    setSelectedOptions(Array(questions.length).fill(null));
    setCurrentIndex(0);
    setIsSubmitted(false);
  }, [questions]);

  const handleOptionClick = (option: string) => {
    if (isSubmitted) return;
    const newSelections = [...selectedOptions];
    newSelections[currentIndex] = option;
    setSelectedOptions(newSelections);
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
    const reloaded = getRandomQuestions(questions, 10);
    setQuestions(reloaded);
  };

  const score = selectedOptions.reduce((acc, selected, idx) => {
    if (questions[idx] && selected === questions[idx].correct_answer) return acc + 1;
    return acc;
  }, 0);

  return {
    questions,
    currentIndex,
    selectedOptions,
    isSubmitted,
    score,
    currentQuestion: questions[currentIndex],
    handleOptionClick,
    handleNext,
    handlePrev,
    handleSubmit,
    handleRetry,
  };
}