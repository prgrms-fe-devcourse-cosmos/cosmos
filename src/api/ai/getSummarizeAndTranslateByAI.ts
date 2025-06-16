import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import supabase from "../../utils/supabase";
import { getOpenaiPrompt } from "../../hooks/getOpenaiPrompt";
import { getGeminiPrompt } from "../../hooks/getGeminiPrompt";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const openai = new OpenAI({
  apiKey: window.location.hostname
    ? import.meta.env.VITE_OPENAI_API_KEY
    : "/api",
  dangerouslyAllowBrowser: true,
});

const activeRequests = new Set<string>(null);

export const summarizeAndTranslateByAi = async (
  content: string,
  date: string
): Promise<{ summary: string; translated: string }> => {
  if (activeRequests.has(date)) {
    console.error(`${date} 요청 진행 중`);
  }

  activeRequests.add(date);

  try {
    const { data } = await supabase
      .from("translations")
      .select("translated, translated_summary")
      .eq("date", date)
      .maybeSingle();

    if (data?.translated && data?.translated_summary) {
      return {
        summary: data.translated_summary,
        translated: data.translated,
      };
    }

    const openaiPrompt = getOpenaiPrompt(content);

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [{ role: "user", content: openaiPrompt }],
    });

    const summary = openaiResponse.choices[0].message.content || "";

    const geminiPrompt = getGeminiPrompt(content);
    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: geminiPrompt,
    });

    const translated = geminiResponse.text || "";

    await supabase.from("translations").insert([
      {
        date,
        original: content,
        translated_summary: summary,
        translated: translated,
      },
    ]);

    return { summary, translated };
  } catch (e) {
    console.error("번역 및 요약 실패 :", e);
    throw e;
  } finally {
    activeRequests.delete(date);
  }
};
