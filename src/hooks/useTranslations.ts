import { useEffect, useState } from "react";
import { getPromptFromOverview } from "./getPromptFromOverview";
import { translateContentByGpt } from "../api/openai/getTranslationByGPT";

export const useTranslations = (content: string | null) => {
  const [translations, setTranslations] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!content) return;

    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const prompt = getPromptFromOverview(content);

        const translatedContent = await translateContentByGpt(prompt);
        setTranslations(translatedContent);
      } catch (e) {
        console.error("번역 실패 : ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTranslations();
  }, [content]);
  return { translations, isLoading };
};
