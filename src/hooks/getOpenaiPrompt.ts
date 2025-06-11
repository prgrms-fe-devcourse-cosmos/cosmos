export const getOpenaiPrompt = (overview: string): string => {
  if (!overview || overview.length === 0) {
    throw new Error("내용 없음");
  }
  return `
    다음 내용을 한국어로 2문장으로 요약해주세요.
    
     ${overview}`;
};
