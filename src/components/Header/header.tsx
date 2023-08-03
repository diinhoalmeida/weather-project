import { Flex } from "@chakra-ui/react";
import { CardWeather, LoadingScreen } from "..";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { handleWeatherData } from "../../services/weatherApi";
import { handleLocationsByGeonameId } from "../../services/locationsByGeonameIdApi";
import { GeonameProps } from "../../interfaces/geoname";
import { StateSelect, WeatherSearch, WeatherTitle } from "./components";
import { WeatherData } from "../../interfaces/weatherApi";
import { loadStatesByCountry } from "./utils/stateActions";

interface HeaderProps {
  setType: (arg: "success" | "error") => void;
  alertsApiReturn: () => void;
}

function Header({ setType, alertsApiReturn }: HeaderProps) {
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
  const [loadingWeatherCall, setLoadingWeatherCall] = useState<boolean>(false);

  useEffect(() => {
    setCountryGeonameId(3469034);
    loadStatesByCountry(countryGeonameId)
      .then((statesListFromApi) => {
        setStatesList(statesListFromApi);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setLoadingWeatherCall(true);
    if (stateGeonameId) {
      handleLoadCitysByState()
        .then(() => {
          setLoadingWeatherCall(false);
          setType("success");
          alertsApiReturn();
          // Tratamento em caso de sucesso
        })
        .catch((error) => {
          setType("error");
          alertsApiReturn();
          console.error(error);
        });
      return;
    }
    setLoadingWeatherCall(false);
  }, [stateGeonameId]);

  const handleLoadCitysByState = async () => {
    setLoadingWeatherCall(true);
    const listCityByState = await handleLocationsByGeonameId(
      stateGeonameId
    ).then((listCityByStateReturn) => {
      console.log("entrou na cidade");
      setLoadingWeatherCall(false);
      return listCityByStateReturn;
    });
    setCopyCitysList(listCityByState);
    setCitysList(listCityByState);
  };

  const handleChangeState = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGeonameId = event.target.value;
    setStateGeonameId(Number(selectedGeonameId));
    const selectedIndex = event.target.selectedIndex;
    const stateSelected = statesList.filter(
      (item) => item?.adminName1 === event.target.options[selectedIndex].text
    )[0];
    setAbreviationState(stateSelected?.adminCodes1?.ISO3166_2);
    setCountryName(stateSelected?.countryName);
    const stateName = event.target.options[selectedIndex].text;
    setCityName("");
    setCitysSugestions(false);
    setOpenCardWeather(false);
    if (event.target.value === "") {
      setStateName("");
      setCopyCitysList([]);
      setCitysList([]);
    } else {
      setStateName(stateName);
    }
  };

  const handleSubmitWeatherData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingWeatherCall(true);
    await handleWeatherData(`${cityName} ${stateName ? stateName : ""}`)
      .then((weatherCallReturn) => {
        setCityName(weatherCallReturn.location.name);
        setCountryName(weatherCallReturn.location.country);
        setAbreviationState(weatherCallReturn.location.region);
        setType("success");
        alertsApiReturn();
        return weatherCallReturn;
      })
      .then((weatherCallReturnReturn) => {
        setWeatherData(weatherCallReturnReturn);
        setLoadingWeatherCall(false);
        setCitysSugestions(false);
        setOpenCardWeather(true);
      })
      .catch(() => {
        setType("error");
        alertsApiReturn();
        setLoadingWeatherCall(false);
        setCitysSugestions(false);
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
      {loadingWeatherCall && <LoadingScreen />}
      <WeatherTitle />
      {openCardWeather && (
        <CardWeather
          weatherData={weatherData as WeatherData}
          abreviationState={abreviationState}
          setOpenCardWeather={setOpenCardWeather}
          countryName={countryName}
          cityName={cityName}
        />
      )}
      <StateSelect statesList={statesList} onStateChange={handleChangeState} />
      <WeatherSearch
        setOpenCardWeather={setOpenCardWeather}
        setCountryName={setCountryName}
        setAbreviationState={setAbreviationState}
        statesList={statesList}
        citysList={citysList}
        setLoadingWeatherCall={setLoadingWeatherCall}
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
