export const translateContentByDeepL = async (text: string) => {
  try {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${import.meta.env.VITE_DEEPL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: [text],
        target_lang: "KO",
      }),
    });
    const data = await response.json();
    const translation = data.translations[0].text;
    return translation;
  } catch (e) {
    console.error("번역 실패 : ", e);
  }
};
