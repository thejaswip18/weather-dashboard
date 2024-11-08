import axios from 'axios';

const API_KEY = '6d5e498436f7100742b90c3e55350705';
const API_URL = 'https://api.openweathermap.org/data/2.5';
const SERVER_URL = 'http://localhost:5000';

export const fetchWeatherData = async (city, unit = 'metric') => {
  const response = await axios.get(`${API_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
  return response.data;
};

export const fetchForecastData = async (city, unit = 'metric') => {
  const response = await axios.get(`${API_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await axios.get(`${SERVER_URL}/favorites`);
  return response.data;
};

export const addFavorite = async (city) => {
  await axios.post(`${SERVER_URL}/favorites`, { city });
};

export const removeFavorite = async (id) => {
  await axios.delete(`${SERVER_URL}/favorites/${id}`);
};
