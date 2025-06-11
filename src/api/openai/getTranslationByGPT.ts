import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: window.location.hostname
    ? import.meta.env.VITE_OPENAI_API_KEY
    : "/api",
  dangerouslyAllowBrowser: true,
});

let isRequseting = false;

export const translateContentByGpt = async (
  prompt: string
): Promise<string> => {
  if (isRequseting) throw new Error("이미 요청 진행 중");
  try {
    isRequseting = true;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0].message.content || "";

    return text;

    throw new Error("잘못된 응답 형식");
  } catch (e) {
    console.error("번역 실패 : ", e);
    throw e;
  } finally {
    isRequseting = false;
  }
};
