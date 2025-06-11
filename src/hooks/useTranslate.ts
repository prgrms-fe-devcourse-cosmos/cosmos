import { useEffect, useState } from "react";
import { translateContentByGemini } from "../api/translator/getTranslationByGemini";
import { getPromptFromContent } from "./getPromptFromContent";

export const useTranslate = (content: string | null) => {
  const [translation, setTranslation] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!content) return;
    const fetchTranslation = async () => {
      setIsLoading(true);
      try {
        const prompt = getPromptFromContent(content);
        const result = await translateContentByGemini(prompt);
        setTranslation(result);
      } catch (e) {
        console.error("번역 실패 : ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTranslation();
  }, [content]);
  return { translation: translation, isLoading };
};
