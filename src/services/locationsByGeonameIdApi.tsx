import axios, { AxiosResponse } from "axios";
import {
  GeoNameResponseCountryForStates,
  GeonameProps,
} from "../interfaces/geoname";

const handleLocationsByGeonameId = async (
  geonameId: number
): Promise<GeonameProps[]> => {
  const options = {
    method: "GET",
    url: `https://www.geonames.org/childrenJSON?geonameId=${geonameId}`,
  };

  try {
    const response: AxiosResponse<GeoNameResponseCountryForStates> =
      await axios.request(options);
    console.log(response.data.geonames);
    return response.data.geonames;
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao obter dados da API.");
  }
};

export { handleLocationsByGeonameId };
