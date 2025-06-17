import axios from 'axios';

export const newsAPI = axios.create({
  baseURL: 'https://api.spaceflightnewsapi.net/v4/articles',
});
