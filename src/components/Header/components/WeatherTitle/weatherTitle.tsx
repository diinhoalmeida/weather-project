import { Flex, Image, Text } from "@chakra-ui/react";
import BrazilFlag from "../../../../assets/brazil-flag.png";

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
      <Flex w="100%" justifyContent="center">
        <Image
          src={BrazilFlag}
          alt="brazil-flag"
          width={{ base: "50px", md: "70px" }}
          style={{ borderRadius: "5px" }}
        />
      </Flex>
    </Flex>
  );
}

export default WeatherTitle;
