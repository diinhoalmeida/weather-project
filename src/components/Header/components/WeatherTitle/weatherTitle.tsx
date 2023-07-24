// components/Header/WeatherTitle.tsx
import { Flex, Text } from "@chakra-ui/react";
import { AiFillInstagram } from "react-icons/ai";

function WeatherTitle() {
  return (
    <Flex
      textAlign={{ base: "left", md: "center" }}
      fontSize={{ base: "5xl", md: "6xl" }}
      fontWeight="bold"
      color="whiteAlpha.900"
      flexDirection="column"
      alignItems={{ base: "left", md: "center" }}
      gap={2}
    >
      <Text>Previsão do tempo</Text>
      <Flex>
        <AiFillInstagram />
      </Flex>
    </Flex>
  );
}

export default WeatherTitle;
