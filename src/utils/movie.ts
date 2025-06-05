import axios, { AxiosRequestConfig, Method } from "axios";

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
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
