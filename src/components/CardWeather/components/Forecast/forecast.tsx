import { Flex } from "@chakra-ui/react";
import ForecastItem from "../ForecastItem/forecastItem";
import { ForecastDayPropsArrayProps } from "../../../../interfaces/weatherApi";
import { formatDateToDDMM } from "../../../../utils/dateFormat";
import { useEffect, useState } from "react";

interface ForecastProps {
  forecastDay: ForecastDayPropsArrayProps[];
}

interface ForecastDataMoldedProps {
  day: string;
  minTemp: number;
  maxTemp: number;
}

const Forecast = ({ forecastDay }: ForecastProps) => {
  const [forecastData, setForecastData] = useState<ForecastDataMoldedProps[]>();

  useEffect(() => {
    teste();
  }, [forecastDay]);

  const teste = () => {
    const forecastDataMolded = forecastDay?.map((item) => ({
      day: item.date,
      minTemp: item.day.mintemp_c,
      maxTemp: item.day.maxtemp_c,
    }));
    console.log("q", forecastDataMolded);
    setForecastData(forecastDataMolded);
  };

  return (
    <Flex marginTop={5} w="full" justifyItems="flex-end" gap={3}>
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        {forecastData?.map((item, index) => (
          <ForecastItem
            key={index}
            day={formatDateToDDMM(item?.day)}
            minTemp={item?.minTemp}
            maxTemp={item?.maxTemp}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Forecast;
