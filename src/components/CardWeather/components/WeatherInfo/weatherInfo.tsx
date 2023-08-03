import { Flex, Text } from "@chakra-ui/react";

interface WeatherInfoProps {
  humidity: number;
  feelsLike: number;
}

const WeatherInfo = ({ humidity, feelsLike }: WeatherInfoProps) => {
  return (
    <>
      <Flex flexDirection="column">
        <Flex flexDirection="row" gap={0.5}>
          <Text fontWeight="light">Sensação</Text>
          <Text fontWeight="semibold">{Math.floor(feelsLike)}ºC</Text>
        </Flex>
        <Flex flexDirection="row" gap={0.5}>
          <Text fontWeight="light">Humidade</Text>
          <Text fontWeight="semibold">{`${Math.floor(humidity)}%`}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default WeatherInfo;
