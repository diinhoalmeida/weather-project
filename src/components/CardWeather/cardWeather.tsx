import { Box, Flex } from "@chakra-ui/react";
import { Forecast, Location, Temperature, WeatherInfo } from "./components";
import { WeatherData } from "../../interfaces/weatherApi";

interface CardWeatherProps {
  weatherData: WeatherData;
  abreviationState: string;
  setOpenCardWeather: (arg: boolean) => void;
  openCardWeather: boolean;
  countryName: string;
  cityName: string;
}

const CardWeather = ({
  weatherData,
  setOpenCardWeather,
  openCardWeather,
  cityName,
  abreviationState,
  countryName,
}: CardWeatherProps) => {
  return (
    <Box padding={10} h="max-content" bgColor="#FFF2E4" rounded="md" w="full">
      <Box w="full" color="#505050">
        <Box
          w="full"
          paddingLeft={5}
          paddingRight={5}
          borderBottom="1px"
          borderColor="#FF9A00"
          paddingBottom="5"
        >
          <Box>
            <Location
              abreviationState={abreviationState}
              setOpenCardWeather={setOpenCardWeather}
              countryName={countryName}
              cityName={cityName}
              temperature={weatherData?.current.temp_c}
              condition={weatherData?.current.condition?.text}
            />
            <Flex flexWrap="wrap" gap="6">
              <Temperature
                minTemp={weatherData?.forecast?.forecastday[0]?.day?.mintemp_c}
                maxTemp={weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c}
                windVelocity={weatherData?.current.wind_kph}
              />
              <WeatherInfo
                humidity={weatherData?.current?.humidity}
                feelsLike={weatherData?.current.feelslike_c}
              />
            </Flex>
          </Box>
        </Box>
        <Forecast forecastDay={weatherData?.forecast?.forecastday} />
      </Box>
    </Box>
  );
};

export default CardWeather;
