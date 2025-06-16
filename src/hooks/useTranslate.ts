import { useEffect, useState } from "react";
import { summarizeAndTranslateByAi } from "../api/ai/getSummarizeAndTranslateByAI";

export const useTranslate = (content: string | null, date: string) => {
  const [translation, setTranslation] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!content || !date) return;
    const fetchTranslation = async () => {
      setIsLoading(true);
      try {
        const { translated } = await summarizeAndTranslateByAi(content, date);
        setTranslation(translated);
      } catch (e) {
        console.error("번역 실패 : ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTranslation();
  }, [content, date]);
  return { translation: translation, isLoading };
};
