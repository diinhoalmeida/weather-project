import { Flex } from "@chakra-ui/react";
import ForecastItem from "../ForecastItem/forecastItem";

const Forecast = () => {
  const forecastData = [
    { day: "Segunda", minTemp: 18, maxTemp: 26 },
    { day: "Terça", minTemp: 18, maxTemp: 26 },
    { day: "Quarta", minTemp: 18, maxTemp: 26 },
    { day: "Quinta", minTemp: 18, maxTemp: 26 },
    { day: "Sexta", minTemp: 18, maxTemp: 26 },
    { day: "Sábado", minTemp: 18, maxTemp: 26 },
    { day: "Domingo", minTemp: 18, maxTemp: 26 },
  ];

  return (
    <Flex
      flexWrap="wrap"
      paddingLeft={5}
      paddingRight={5}
      alignItems="center"
      paddingTop={5}
      maxW="full"
      gap={3}
    >
      {forecastData.map((item, index) => (
        <ForecastItem
          key={index}
          day={item.day}
          minTemp={item.minTemp}
          maxTemp={item.maxTemp}
        />
      ))}
    </Flex>
  );
};

export default Forecast;
