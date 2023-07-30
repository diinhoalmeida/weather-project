import { Flex } from "@chakra-ui/react";
import { CardWeather } from "..";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { handleWeatherData } from "../../services/weatherApi";
import { handleLocationsByGeonameId } from "../../services/locationsByGeonameIdApi";
import { GeonameProps } from "../../interfaces/geoname";
import { StateSelect, WeatherSearch, WeatherTitle } from "./components";
import { WeatherData } from "../../interfaces/weatherApi";
import { loadStatesByCountry } from "./utils/stateActions";

function Header() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [statesList, setStatesList] = useState<GeonameProps[]>([]);
  const [citysList, setCitysList] = useState<GeonameProps[]>([]);
  const [copyCitysList, setCopyCitysList] = useState<GeonameProps[]>([]);
  const [stateName, setStateName] = useState<string>();
  const [cityName, setCityName] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");
  const [abreviationState, setAbreviationState] = useState<string>("");
  const [stateGeonameId, setStateGeonameId] = useState<number>(0);
  const [countryGeonameId, setCountryGeonameId] = useState<number>(3469034);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [citysSugestions, setCitysSugestions] = useState<boolean>(false);
  const [openCardWeather, setOpenCardWeather] = useState<boolean>(false);

  useEffect(() => {
    loadStatesByCountry(countryGeonameId)
      .then((statesListFromApi) => {
        setStatesList(statesListFromApi);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (stateGeonameId) {
      handleLoadCitysByState()
        .then(() => {
          // Tratamento em caso de sucesso
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [stateGeonameId]);

  const handleLoadCitysByState = async () => {
    const listCityByState = await handleLocationsByGeonameId(stateGeonameId);
    setCopyCitysList(listCityByState);
    setCitysList(listCityByState);
  };

  const handleChangeState = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGeonameId = event.target.value;
    setStateGeonameId(Number(selectedGeonameId));
    const selectedIndex = event.target.selectedIndex;
    const stateSelected = statesList.filter(
      (item) => item.adminName1 === event.target.options[selectedIndex].text
    )[0];
    setAbreviationState(stateSelected.adminCodes1.ISO3166_2);
    setCountryName(stateSelected.countryName);
    const stateName = event.target.options[selectedIndex].text;
    setStateName(stateName);
  };

  const handleSubmitWeatherData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleWeatherData(
      `${cityName} ${countryName} ${stateName ? stateName : ""}`
    ).then((weatherCallReturn) => {
      setOpenCardWeather(true);
      setWeatherData(weatherCallReturn);
    });
  };

  return (
    <Flex
      width="full"
      borderBottom="1px"
      borderColor="white"
      paddingBottom={10}
      flexDirection="column"
      alignItems="center"
      gap={35}
    >
      <WeatherTitle />
      {openCardWeather && (
        <CardWeather
          weatherData={weatherData as WeatherData}
          abreviationState={abreviationState}
          setOpenCardWeather={setOpenCardWeather}
          openCardWeather={openCardWeather}
          countryName={countryName}
          cityName={cityName}
        />
      )}
      <StateSelect statesList={statesList} onStateChange={handleChangeState} />
      <WeatherSearch
        statesList={statesList}
        citysList={citysList}
        setCityName={setCityName}
        setCopyCitysList={setCopyCitysList}
        setCitysSugestions={setCitysSugestions}
        onCitySubmit={handleSubmitWeatherData}
        citysSugestions={citysSugestions}
        cityName={cityName}
        selectedItemIndex={selectedItemIndex}
        setSelectedItemIndex={setSelectedItemIndex}
        copyCitysList={copyCitysList}
        countryName={countryName}
        stateName={stateName as string}
        setWeatherData={setWeatherData}
      />
    </Flex>
  );
}

export default Header;
