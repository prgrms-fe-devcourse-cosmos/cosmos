import { useState, useEffect } from "react";
import { QuizQuestion } from "../types/quiz";
import supabase from "../utils/supabase";

function getRandomQuestions(arr: QuizQuestion[], n: number): QuizQuestion[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
}

export function useQuiz(difficulty: string, profileId: string) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!difficulty) return;

    let mounted = true;

    async function fetchQuestions() {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("difficulty", difficulty);

      if (mounted && !error && data) {
        const selected = getRandomQuestions(data as QuizQuestion[], 10);
        setQuestions(selected);
        setSelectedOptions(Array(selected.length).fill(null));
        setCurrentIndex(0);
        setIsSubmitted(false);
      }
    }

    fetchQuestions();

    return () => {
      mounted = false;
    };
  }, [difficulty]);

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

  const saveAnswers = async () => {
    const answerRecords = questions.map((q, idx) => ({
      profile_id: profileId,
      question_id: q.id,
      selected_answer: selectedOptions[idx] ?? "",
      is_correct: selectedOptions[idx] === q.correct_answer,
      answered_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("quiz_answers").insert(answerRecords);

    if (error) {
      console.error("퀴즈 정답 저장 실패", error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    setCurrentIndex(0);

    await saveAnswers();

    const totalScore = score;
    const correctCount = selectedOptions.filter(
      (opt, idx) => opt === questions[idx]?.correct_answer
    ).length;

    const level1Correct = questions.reduce(
      (acc, q, idx) =>
        acc +
        (q.difficulty === "1" && selectedOptions[idx] === q.correct_answer
          ? 1
          : 0),
      0
    );
    const level2Correct = questions.reduce(
      (acc, q, idx) =>
        acc +
        (q.difficulty === "2" && selectedOptions[idx] === q.correct_answer
          ? 1
          : 0),
      0
    );
    const level3Correct = questions.reduce(
      (acc, q, idx) =>
        acc +
        (q.difficulty === "3" && selectedOptions[idx] === q.correct_answer
          ? 1
          : 0),
      0
    );

    const { data: existingScores, error: fetchError } = await supabase
      .from("quiz_scores")
      .select("*")
      .eq("profile_id", profileId)
      .maybeSingle();

    if (fetchError && fetchError.details !== "Results contain 0 rows") {
      console.error("기존 점수 조회 실패", fetchError);
      return;
    }

    const newTotalScore = (existingScores?.total_score || 0) + totalScore;
    const newCorrectCount = (existingScores?.correct_count || 0) + correctCount;
    const newLevel1Correct =
      (existingScores?.level1_correct || 0) + level1Correct;
    const newLevel2Correct =
      (existingScores?.level2_correct || 0) + level2Correct;
    const newLevel3Correct =
      (existingScores?.level3_correct || 0) + level3Correct;

    const { error } = await supabase.from("quiz_scores").upsert(
      {
        profile_id: profileId,
        total_score: newTotalScore,
        correct_count: newCorrectCount,
        level1_correct: newLevel1Correct,
        level2_correct: newLevel2Correct,
        level3_correct: newLevel3Correct,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "profile_id" }
    );

    if (error) {
      console.error("퀴즈 점수 저장 실패", error);
    }
  };

  const handleRetry = () => {
    const reloaded = getRandomQuestions(questions, 10);
    setQuestions(reloaded);
    setSelectedOptions(Array(reloaded.length).fill(null));
    setCurrentIndex(0);
    setIsSubmitted(false);
  };

  const score = selectedOptions.reduce((acc, selected, idx) => {
    if (questions[idx] && selected === questions[idx].correct_answer) {
      const level = questions[idx].difficulty;
      const point = level === "1" ? 1 : level === "2" ? 2 : 3;
      return acc + point;
    }
    return acc;
  }, 0);

  const maxPossibleScore = questions.reduce((acc, q) => {
    const level = q.difficulty;
    const point = level === "1" ? 1 : level === "2" ? 2 : 3;
    return acc + point;
  }, 0);

  return {
    questions,
    currentIndex,
    selectedOptions,
    isSubmitted,
    score,
    maxPossibleScore,
    currentQuestion: questions.length > 0 ? questions[currentIndex] : null,
    handleOptionClick,
    handleNext,
    handlePrev,
    handleSubmit,
    handleRetry,
  };
}