import { Flex } from "@chakra-ui/react";
import { CardWeather } from "..";

import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import { handleWeatherData } from "../../services/weatherApi";
import { handleLocationsByGeonameId } from "../../services/locationsByGeonameIdApi";
import { GeonameProps } from "../../interfaces/geoname";
import { StateSelect, WeatherSearch, WeatherTitle } from "./components";

function Header() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [statesList, setStatesList] = useState<GeonameProps[]>([]);
  const [citysList, setCitysList] = useState<GeonameProps[]>([]);
  const [copyCitysList, setCopyCitysList] = useState<GeonameProps[]>([]);
  const [stateName, setStateName] = useState<string>();
  const [cityName, setCityName] = useState<string>("");
  const [stateGeonameId, setStateGeonameId] = useState<number>(0);
  const [countryGeonameId, setCountryGeonameId] = useState<number>(3469034);
  const [citysSugestions, setCitysSugestions] = useState<boolean>(false);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    handleLoadStatesByCountry()
      .then(() => {
        // Tratamento em caso de sucesso
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

  const handleLoadStatesByCountry = async () => {
    const statesListFromApi = await handleLocationsByGeonameId(
      countryGeonameId
    );
    setStatesList(statesListFromApi);
  };

  const handleChangeState = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGeonameId = event.target.value;
    setStateGeonameId(Number(selectedGeonameId));
    const selectedIndex = event.target.selectedIndex;
    const stateName = event.target.options[selectedIndex].text;
    setStateName(stateName);
  };

  const handleWeatherByCity = (event: ChangeEvent<HTMLInputElement>) => {
    const cityName = event.target.value;
    setCityName(cityName);
    setCitysSugestions(true);

    const filteredCities = citysList.filter((item) =>
      item.toponymName.toLowerCase().includes(cityName.toLowerCase())
    );

    const sortedCities = filteredCities.sort((a, b) => {
      const aIndex = a.toponymName
        .toLowerCase()
        .indexOf(cityName.toLowerCase());
      const bIndex = b.toponymName
        .toLowerCase()
        .indexOf(cityName.toLowerCase());
      return aIndex - bIndex;
    });

    if (sortedCities.length > 0) {
      setCopyCitysList(sortedCities);
    }
  };

  const handleSelectCityWithClick = (citySelected: string) => {
    setCityName(citySelected);
  };

  const handleSubmitWeatherData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const weatherCall = await handleWeatherData(
      `${cityName} Brasil ${stateName ? stateName : ""}`
    );
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.key === "ArrowUp") {
      if (selectedItemIndex === 0) {
        setCitysSugestions(false);
        setSelectedItemIndex((prevIndex) => Math.max(prevIndex - 1, -1));
        return;
      }
      setCitysSugestions(true);
      setSelectedItemIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === "ArrowDown") {
      setCitysSugestions(true);
      setSelectedItemIndex((prevIndex) =>
        Math.min(prevIndex + 1, copyCitysList.length - 1)
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedItemIndex >= 0) {
        const selectedCity = copyCitysList[selectedItemIndex].toponymName;
        setCitysSugestions(false);
        handleSelectCityWithClick(selectedCity);
        setSelectedItemIndex(-1);
      } else {
        const weatherCall = await handleWeatherData(
          `${cityName} Brasil ${stateName ? stateName : ""}`
        );
      }
    }
  };

  useEffect(() => {
    if (listRef.current && selectedItemIndex >= 0) {
      const itemHeight = 36; // Adjust this value as needed based on the item height in pixels
      const visibleItems = Math.floor(250 / itemHeight); // Calculate the number of visible items
      const scrollIndex =
        selectedItemIndex >= visibleItems
          ? selectedItemIndex - Math.floor(visibleItems / 1.5)
          : 0;
      listRef.current.scrollTop = scrollIndex * itemHeight;
    }
  }, [selectedItemIndex]);

  return (
    <Flex
      width="full"
      borderBottom="1px"
      borderColor="white"
      paddingBottom={10}
      flexDirection="column"
      alignItems="center"
      gap={42}
    >
      <WeatherTitle />
      {false && <CardWeather />}
      <StateSelect statesList={statesList} onStateChange={handleChangeState} />
      <WeatherSearch
        statesList={statesList}
        citysList={copyCitysList}
        onCityChange={handleWeatherByCity}
        onCitySubmit={handleSubmitWeatherData}
        citysSugestions={citysSugestions}
        onCitySelect={handleSelectCityWithClick}
        cityName={cityName}
        selectedItemIndex={selectedItemIndex}
        handleKeyDown={handleKeyDown}
      />
    </Flex>
  );
}

export default Header;
