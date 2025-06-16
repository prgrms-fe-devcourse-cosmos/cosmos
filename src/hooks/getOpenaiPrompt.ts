export const getOpenaiPrompt = (overview: string): string => {
  if (!overview || overview.length === 0) {
    throw new Error("내용 없음");
  }
  return `
    아래 영어 문단을 한국어로 자연스럽게 **딱 두 문장**으로 요약해 주세요. 반드시 두 문장으로 제한하며, 그 외 문장은 작성하지 마세요. 번역된 요약문만 출력해 주세요.
    
     ${overview}`;
};
