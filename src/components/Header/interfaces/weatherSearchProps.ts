import { Dispatch, FormEvent } from "react";
import { GeonameProps } from "../../../interfaces/geoname";
import { WeatherData } from "../../../interfaces/weatherApi";

export interface WeatherSearchProps {
  statesList: GeonameProps[];
  citysList: GeonameProps[];
  setCopyCitysList: (arg: GeonameProps[]) => void;
  onCitySubmit: (event: FormEvent<HTMLFormElement>) => void;
  cityName: string;
  countryName: string;
  stateName: string;
  setCityName: (arg: string) => void;
  setCitysSugestions: (arg: boolean) => void;
  citysSugestions: boolean;
  selectedItemIndex: number;
  setSelectedItemIndex: Dispatch<React.SetStateAction<number>>;
  copyCitysList: GeonameProps[];
  setWeatherData: (arg: WeatherData) => void;
}
