export const getGeminiPrompt = (content: string): string => {
  if (!content || content.length === 0) {
    throw new Error("내용 없음");
  }
  return `You are a professional Korean translator. Translate the following English text into Korean, preserving its tone, context, and meaning. Make the Korean sound natural and culturally appropriate.

Text:
${content}`;
};
