import { GeonameProps } from "../../../interfaces/geoname";
import { handleLocationsByGeonameId } from "../../../services/locationsByGeonameIdApi";
import {
  HandleKeyDownProps,
  HandleSelectCityWithClick,
  HandleWeatherByCityProps,
} from "../interfaces/actionsProps";

export const loadCitysByState = async (
  stateGeonameId: number
): Promise<GeonameProps[]> => {
  try {
    const listCityByState = await handleLocationsByGeonameId(stateGeonameId);
    return listCityByState;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch cities data");
  }
};

export const handleWeatherByCity = ({
  event,
  citysList,
  setCityName,
  setCitysSugestions,
  setCopyCitysList,
}: HandleWeatherByCityProps): void => {
  const cityName = event.target.value;
  setCityName(cityName);
  setCitysSugestions(true);

  const filteredCities = citysList.filter((item) =>
    item.toponymName.toLowerCase().includes(cityName.toLowerCase())
  );

  const sortedCities = filteredCities.sort((a, b) => {
    const aIndex = a.toponymName.toLowerCase().indexOf(cityName.toLowerCase());
    const bIndex = b.toponymName.toLowerCase().indexOf(cityName.toLowerCase());
    return aIndex - bIndex;
  });

  if (sortedCities.length > 0) {
    setCopyCitysList(sortedCities);
  }
};

export const handleSelectCityWithClick = ({
  citySelected,
  setCityName,
  setSelectedItemIndex,
}: HandleSelectCityWithClick): void => {
  setCityName(citySelected);
  setSelectedItemIndex(-1);
};

export const handleKeyDown = async ({
  event,
  selectedItemIndex,
  setCitysSugestions,
  setSelectedItemIndex,
  copyCitysList,
  setCityName,
  setOpenCardWeather,
  handleSelectCityWithClick,
  cityName,
  stateName,
  setCountryName,
  setAbreviationState,
  setLoadingWeatherCall,
  setType,
  alertsApiReturn,
  handleWeatherData,
  setWeatherData,
}: HandleKeyDownProps): Promise<void> => {
  if (event.key === "ArrowUp") {
    if (selectedItemIndex <= 0) {
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
      handleSelectCityWithClick({
        citySelected: selectedCity,
        setCityName,
        setSelectedItemIndex,
      });
    } else {
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
        .then((lastReturnPromiseWeatherCall) => {
          setSelectedItemIndex(-1);
          setLoadingWeatherCall(false);
          setOpenCardWeather(true);
          setWeatherData(lastReturnPromiseWeatherCall);
        })
        .catch(() => {
          setType("error");
          setLoadingWeatherCall(false);
          alertsApiReturn();
        });
    }
  }
};
