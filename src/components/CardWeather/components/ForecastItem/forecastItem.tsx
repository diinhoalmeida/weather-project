import { Flex, Text } from "@chakra-ui/react";

const ForecastItem = ({ day, minTemp, maxTemp }) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontWeight="semibold">{day}</Text>
      <Flex>
        <Text color="#FFA900" fontWeight="bold">
          {minTemp}º
        </Text>
        <Text color="#FFA900" fontWeight="bold">
          {maxTemp}º
        </Text>
      </Flex>
    </Flex>
  );
};

export default ForecastItem;
