import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_KEY;
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const getAll = () => {
  const req = axios.get(`${baseUrl}/all`);
  return req.then((res) => res.data);
};

const getCountry = (country) => {
  const req = axios.get(`${baseUrl}/name/${country}`);
  return req.then((res) => res.data);
};

const getWeather = (lat, lng) => {
  const req = axios.get(
    `${weatherUrl}?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
  );
  return req.then((res) => res.data);
};

export default { getAll, getCountry, getWeather };
