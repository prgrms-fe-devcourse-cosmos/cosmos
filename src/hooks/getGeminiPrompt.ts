export const getGeminiPrompt = (content: string): string => {
  if (!content || content.length === 0) {
    throw new Error("내용 없음");
  }
  return `아래 영어 문장을 한국어로 자연스럽고 정확하게 번역해 주세요. 서두나 설명 없이 번역된 한국어 문장만 출력해 주세요.

영어 원문:
${content}`;
};
