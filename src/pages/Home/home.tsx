import { Flex, Grid, Text } from "@chakra-ui/react";
import { Header, WeatherList } from "../../components";
import { brazilianCapitals } from "../../constants/brazilData";
import { useState, useEffect, useRef } from "react";
import { handleWeatherData } from "../../services/weatherApi";
import { WeatherData } from "../../interfaces/weatherApi";
import { fetchWeatherDataForCapitals } from "../../utils/weatherForCapitals";

function Home() {
  const [braziliarCapitalsWeatherData, setBrazilianCapitalsWeatherData] =
    useState<WeatherData[]>([]);
  const [statesLength, setStatesLength] = useState<number>(
    brazilianCapitals.length
  );
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchWeatherDataForCapitals({
      brazilianCapitals,
      setBrazilianCapitalsWeatherData,
    })
      .then()
      .catch((err) => console.log(err));
    function updateWindowWidth() {
      if (flexRef.current) {
        setWindowWidth(flexRef.current.clientWidth);
      }
    }
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <Flex
      width="100vw"
      minH={{ base: "max-content", md: "100vh" }}
      bgGradient="linear(to-b, #FF7F00, #FFBB00)"
      justifyContent="center"
      alignItems="center"
      ref={flexRef}
    >
      <Flex
        alignItems="center"
        padding={10}
        flexDirection="column"
        w={{ base: "full", md: "750px" }}
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
            <WeatherList
              capitalsToList={
                windowWidth > 768
                  ? braziliarCapitalsWeatherData.slice(
                      0,
                      Math.ceil(brazilianCapitals.length) / 2 + 1
                    )
                  : braziliarCapitalsWeatherData.slice(0, statesLength)
              }
            />
            <WeatherList
              capitalsToList={braziliarCapitalsWeatherData.slice(
                Math.floor(Math.ceil(braziliarCapitalsWeatherData.length) / 2) +
                  1,
                brazilianCapitals.length
              )}
              display={{ base: "none", md: "block" }}
            />
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Home;
