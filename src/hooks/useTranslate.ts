import { useEffect, useState } from "react";
import { translateContentByDeepL } from "../api/translator/getTranslationByDeepL";

export const useTranslate = (content: string | null) => {
  const [translation, setTranslation] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!content) return;
    const fetchTranslation = async () => {
      setIsLoading(true);
      try {
        const result = await translateContentByDeepL(content);
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
