import axios from 'axios';

const newsAPI = axios.create({
  baseURL: 'https://api.spaceflightnewsapi.net/v4/articles',
});

export default newsAPI;
