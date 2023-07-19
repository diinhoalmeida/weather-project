import { Flex, Text } from "@chakra-ui/react";

const WeatherInfo = () => {
  return (
    <>
      <Flex flexDirection="row" gap={8}>
        <Flex flexDirection="row" gap={0.5}>
          <Text fontWeight="light">Vento</Text>
          <Text fontWeight="semibold">18km/h</Text>
        </Flex>
        <Flex flexDirection="row" gap={0.5}>
          <Text fontWeight="light">Humidade</Text>
          <Text fontWeight="semibold">89%</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default WeatherInfo;
