import { useEffect, useState } from "react";
import { summarizeAndTranslateByAi } from "../api/ai/getSummarizeAndTranslateByAI";

export const useTranslateAndSummarize = (
  content: string | null,
  date: string | null
) => {
  const [translatedSummary, setTranslatedSummary] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!content || !date) return;

    const fetchTranslatedSummary = async () => {
      setIsLoading(true);
      try {
        const { summary } = await summarizeAndTranslateByAi(content, date);
        setTranslatedSummary(summary);
      } catch (e) {
        console.error("ChatGPT 번역&요약 실패 : ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTranslatedSummary();
  }, [content, date]);
  return { translatedSummary: translatedSummary, isLoading };
};
