import { Dispatch, ChangeEvent, KeyboardEvent } from "react";
import { GeonameProps } from "../../../interfaces/geoname";
import { WeatherData } from "../../../interfaces/weatherApi";

export interface HandleWeatherByCityProps {
  event: ChangeEvent<HTMLInputElement>;
  citysList: GeonameProps[];
  setCityName: (arg: string) => void;
  setCitysSugestions: (arg: boolean) => void;
  setCopyCitysList: (arg: GeonameProps[]) => void;
}

export interface HandleSelectCityWithClick {
  citySelected: string;
  setCityName: (arg: string) => void;
}

export interface HandleKeyDownProps {
  event: KeyboardEvent<HTMLInputElement>;
  selectedItemIndex: number;
  setCitysSugestions: (value: boolean) => void;
  setSelectedItemIndex: Dispatch<React.SetStateAction<number>>;
  copyCitysList: GeonameProps[];
  setCityName: (cityName: string) => void;
  handleSelectCityWithClick: ({
    citySelected,
    setCityName,
  }: HandleSelectCityWithClick) => void;
  cityName: string;
  countryName: string;
  stateName: string;
  handleWeatherData: (query: string) => Promise<WeatherData>;
  setWeatherData: (weatherData: WeatherData) => void;
}
