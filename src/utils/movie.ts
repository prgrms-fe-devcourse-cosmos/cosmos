import axios, { AxiosRequestConfig, Method } from "axios";

// 배포할때는 .env로 key 숨기기
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_ACCESS_TOKEN,
  },
});

export async function movieFetch<T>(
  url: string,
  method: Method = "get",
  payload?: Record<string, unknown>,
  headers: Record<string, string> = {}
): Promise<T | undefined> {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers: {
        ...axiosInstance.defaults.headers.common,
        ...headers,
      },
    };

    if (payload) {
      if (method.toLowerCase() === "get") {
        config.params = payload;
      } else {
        config.data = payload;
      }
    }

    const response = await axiosInstance<T>(config);
    // console.log("[movieFetch] 요청 성공 ✅");
    // console.log("요청 URL:", config.url);
    // console.log("요청 params:", config.params);
    // console.log("응답 전체 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
