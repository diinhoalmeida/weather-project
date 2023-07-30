import { Flex, Text } from "@chakra-ui/react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface TemperatureProps {
  minTemp: number;
  maxTemp: number;
  windVelocity: number;
}

const Temperature = ({ minTemp, maxTemp, windVelocity }: TemperatureProps) => {
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row" gap={2}>
        <Flex flexDirection="row" alignItems="center">
          <AiOutlineArrowUp style={{ color: "#FF9A00" }} />
          <Text fontWeight="semibold">{Math.floor(minTemp)}º</Text>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <AiOutlineArrowDown style={{ color: "#FF9A00" }} />
          <Text fontWeight="semibold">{Math.floor(maxTemp)}º</Text>
        </Flex>
      </Flex>
      <Flex flexDirection="row" gap={0.5}>
        <Text fontWeight="light">Vento</Text>
        <Text fontWeight="semibold">{`${windVelocity}km/h`}</Text>
      </Flex>
    </Flex>
  );
};

export default Temperature;
