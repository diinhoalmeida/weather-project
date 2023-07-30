import axios, { AxiosResponse } from "axios";
import { WeatherData } from "../interfaces/weatherApi";

const handleWeatherData = async (
  citySelected: string
): Promise<WeatherData> => {
  const options = {
    method: "GET",
    url: "http://api.weatherapi.com/v1/forecast.json?key=bed0d7cb6f574708b6e140054232007",
    params: {
      q: citySelected,
      days: 14,
      aqi: "no",
      alerts: "no",
      lang: "pt",
      forecastday: "day",
    },
    headers: {
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response: AxiosResponse<WeatherData> = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export { handleWeatherData };
