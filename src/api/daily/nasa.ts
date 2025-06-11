import axios from 'axios';

const nasaAPI = axios.create({
  baseURL: 'https://api.nasa.gov/planetary',
  params: {
    api_key: import.meta.env.VITE_NASA_API_KEY,
  },
});

export default nasaAPI;
