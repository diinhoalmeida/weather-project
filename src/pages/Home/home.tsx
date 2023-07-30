import { Flex, Grid, Text } from "@chakra-ui/react";
import { Header, WeatherList } from "../../components";

function Home() {
  return (
    <Flex
      width="100vw"
      minH={{ base: "max-content", md: "100vh" }}
      bgGradient="linear(to-b, #FF7F00, #FFBB00)"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        alignItems="center"
        padding={10}
        flexDirection="column"
        w={{ base: "750px" }}
      >
        <Header />
        <Flex flexDirection="column" width={{ base: "full", md: "95%" }}>
          <Text fontWeight="bold" color="whiteAlpha.900" fontSize="4xl">
            Capitais
          </Text>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={5}
          >
            <WeatherList />
            <WeatherList display={{ base: "none", md: "block" }} />
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Home;
