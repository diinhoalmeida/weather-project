import { Flex, Text } from "@chakra-ui/react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface ForecastItem {
  day: string;
  minTemp: number;
  maxTemp: number;
}

const ForecastItem = ({ day, minTemp, maxTemp }: ForecastItem) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontWeight="bold">{day}</Text>
      <Flex>
        <Flex alignItems="center">
          <AiOutlineArrowDown style={{ color: "#FF9A00" }} />
          <Text color="#FFA900" fontWeight="medium" fontSize="sm">
            {Math.floor(minTemp)}º
          </Text>
        </Flex>
        <Flex alignItems="center">
          <AiOutlineArrowUp style={{ color: "#FF9A00" }} />
          <Text color="#FFA900" fontWeight="medium" fontSize="sm">
            {Math.floor(maxTemp)}º
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ForecastItem;
