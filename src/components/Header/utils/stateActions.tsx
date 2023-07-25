import { ChangeEvent } from "react";
import { GeonameProps } from "../../../interfaces/geoname";
import { handleLocationsByGeonameId } from "../../../services/locationsByGeonameIdApi";

export const loadStatesByCountry = async (
  countryGeonameId: number
): Promise<GeonameProps[]> => {
  try {
    const statesListFromApi = await handleLocationsByGeonameId(
      countryGeonameId
    );
    return statesListFromApi;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch states data");
  }
};

export const handleChangeState = (
  event: ChangeEvent<HTMLSelectElement>,
  statesList: GeonameProps[]
) => {
  const selectedGeonameId = event.target.value;
  const selectedIndex = event.target.selectedIndex;
  const stateSelected = statesList.filter(
    (item) => item.adminName1 === event.target.options[selectedIndex].text
  )[0];

  return {
    stateGeonameId: Number(selectedGeonameId),
    abreviationState: stateSelected.adminCodes1.ISO3166_2,
    countryName: stateSelected.countryName,
    stateName: event.target.options[selectedIndex].text,
  };
};
