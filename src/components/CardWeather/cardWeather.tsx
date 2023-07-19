import { Box } from "@chakra-ui/react";
import { Forecast, Location, Temperature, WeatherInfo } from "./components";

const CardWeather = () => {
  return (
    <Box padding={10} h="max-content" bgColor="#FFF2E4">
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
            <Location />
            <Temperature />
            <WeatherInfo />
          </Box>
        </Box>
        <Forecast />
      </Box>
    </Box>
  );
};

export default CardWeather;
