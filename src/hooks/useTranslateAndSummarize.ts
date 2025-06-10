import { useEffect, useState } from "react";
import { getPromptFromOverview } from "./getPromptFromOverview";
import { summarizeAndTranslateContent } from "../api/openai/getSummarizeAndTranslateByGPT";

export const useTranslateAndSummarize = (content: string | null) => {
  const [translatedSummary, setTranslatedSummary] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!content) return;

    const fetchTranslatedSummary = async () => {
      setIsLoading(true);
      try {
        const prompt = getPromptFromOverview(content);

        const result = await summarizeAndTranslateContent(prompt);
        setTranslatedSummary(result);
      } catch (e) {
        console.error("ChatGPT 번역&요약 실패 : ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTranslatedSummary();
  }, [content]);
  return { translatedSummary: translatedSummary, isLoading };
};
