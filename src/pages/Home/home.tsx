import { Flex, Grid, Text } from "@chakra-ui/react";
import { Header, WeatherList } from "../../components";
import { brazilianCapitals } from "../../constants/brazilData";
import { useState, useEffect, useRef } from "react";
import { WeatherData } from "../../interfaces/weatherApi";
import { fetchWeatherDataForCapitals } from "../../utils/weatherForCapitals";
import WeatherListLoading from "../../components/WeatherListLoading/weatherListLoading";
import AnimatedAlert from "../../components/Alerts/alerts";

function Home() {
  const [braziliarCapitalsWeatherData, setBrazilianCapitalsWeatherData] =
    useState<WeatherData[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [type, setType] = useState<"success" | "error">();
  const [statesLength, setStatesLength] = useState<number>(
    brazilianCapitals.length
  );
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [weatherCapitalsLoading, setWeatherCapitalsLoading] =
    useState<boolean>(false);
  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStatesLength(brazilianCapitals.length);
    setWeatherCapitalsLoading(true);
    fetchWeatherDataForCapitals({
      brazilianCapitals,
      setBrazilianCapitalsWeatherData,
    })
      .then(() => setWeatherCapitalsLoading(false))
      .catch(() => {
        setType("error");
        alertsApiReturn();
        setWeatherCapitalsLoading(false);
      });
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

  const alertsApiReturn = () => {
    setShow(true);
    const timeout = setTimeout(() => {
      setShow(false);
    }, 1500);
    return () => clearTimeout(timeout);
  };

  return (
    <Flex
      width="100vw"
      minH={{ base: "max-content", md: "100vh" }}
      bgGradient="linear(to-b, #FF7F00, #FFBB00)"
      justifyContent="center"
      ref={flexRef}
    >
      <Flex
        alignItems="center"
        padding={10}
        flexDirection="column"
        w={{ base: "full", md: "750px" }}
        h="100%"
        justifyContent="space-between"
      >
        <Header setType={setType} alertsApiReturn={alertsApiReturn} />
        <Flex flexDirection="column" width={{ base: "full", md: "95%" }}>
          <Text fontWeight="bold" color="whiteAlpha.900" fontSize="4xl">
            Capitais
          </Text>
          {!weatherCapitalsLoading ? (
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
                  Math.floor(
                    Math.ceil(braziliarCapitalsWeatherData.length) / 2
                  ) + 1,
                  brazilianCapitals.length
                )}
                display={{ base: "none", md: "block" }}
              />
            </Grid>
          ) : (
            <WeatherListLoading />
          )}
        </Flex>
      </Flex>
      <AnimatedAlert type={type} show={show} />
    </Flex>
  );
}

export default Home;
