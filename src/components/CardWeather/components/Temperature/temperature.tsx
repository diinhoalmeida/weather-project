import { Flex, Text } from "@chakra-ui/react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const Temperature = () => {
  return (
    <>
      <Text fontWeight="semibold" mb="10px" fontSize="3xl">
        20ºC NUBLADO
      </Text>
      <Flex flexDirection="row" gap={8}>
        <Flex flexDirection="row" gap={4}>
          <Flex flexDirection="row" alignItems="center">
            <AiOutlineArrowUp style={{ color: "#FF9A00" }} />
            <Text fontWeight="semibold">16º</Text>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <AiOutlineArrowDown style={{ color: "#FF9A00" }} />
            <Text fontWeight="semibold">16º</Text>
          </Flex>
        </Flex>
        <Flex flexDirection="row" gap={0.5}>
          <Text fontWeight="light">Sensação</Text>
          <Text fontWeight="semibold">19ºC</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Temperature;
