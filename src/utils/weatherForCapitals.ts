import { WeatherData } from "../interfaces/weatherApi";
import { handleWeatherData } from "../services/weatherApi";

interface FetchWeatherDataForCapitalsProps {
  brazilianCapitals: { state: string; capital: string; country: string }[];
  setBrazilianCapitalsWeatherData: (arg: WeatherData[]) => void;
}

export const fetchWeatherDataForCapitals = ({
  brazilianCapitals,
  setBrazilianCapitalsWeatherData,
}: FetchWeatherDataForCapitalsProps) => {
  const weatherDataPromises = brazilianCapitals.map(async (capitalInfo) => {
    try {
      const weatherData = await handleWeatherData(capitalInfo.capital);
      return weatherData;
    } catch (error) {
      return null;
    }
  });

  return Promise.all(weatherDataPromises)
    .then((weatherDataPromisesResults) => {
      setBrazilianCapitalsWeatherData(
        weatherDataPromisesResults as WeatherData[]
      );
    })
    .catch(() => {
      throw new Error("Failed to fetch weather data");
    });
};
