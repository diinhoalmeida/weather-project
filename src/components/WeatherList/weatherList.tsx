import { Flex, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { WeatherData } from "../../interfaces/weatherApi";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export interface Capital {
  state: string;
  capital: string;
  country: string;
}

interface WeatherListProps {
  capitalsToList: WeatherData[];
  display?: {
    base: string;
    md: string;
  };
}

function WeatherList({ capitalsToList, display }: WeatherListProps) {
  return (
    <OrderedList
      listStyleType="none"
      margin={0}
      padding={0}
      spacing={2}
      display={display}
    >
      <ListItem display="flex" flexDirection="row" gap={8}>
        <Text>Min</Text>
        <Text>Max</Text>
      </ListItem>
      {capitalsToList.map((item, index) => (
        <ListItem key={index} display="flex" flexDirection="row" gap={5}>
          <Flex flexDirection="row" alignItems="center" w="40px">
            <AiOutlineArrowDown style={{ color: "white" }} />
            <Text fontWeight="bold" color="blackAlpha.900">
              {Math.floor(
                Number(item?.forecast?.forecastday[0].day?.mintemp_c)
              )}
              º
            </Text>
          </Flex>
          <Flex flexDirection="row" alignItems="center" w="40px">
            <AiOutlineArrowUp style={{ color: "white" }} />
            <Text fontWeight="bold" color="blackAlpha.900">
              {Math.floor(
                Number(item?.forecast?.forecastday[0].day?.maxtemp_c)
              )}
              º
            </Text>
          </Flex>
          <Text fontWeight="bold" color="blackAlpha.900">
            {item?.location?.name}
          </Text>
        </ListItem>
      ))}
    </OrderedList>
  );
}

export default WeatherList;
