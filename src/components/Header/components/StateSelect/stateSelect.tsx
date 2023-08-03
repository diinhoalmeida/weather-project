import { Select } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { GeonameProps } from "../../../../interfaces/geoname";

interface StateSelectProps {
  statesList: GeonameProps[];
  onStateChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function stateSelect({ statesList, onStateChange }: StateSelectProps) {
  return (
    <Select
      placeholder="Estado"
      size="md"
      onChange={onStateChange}
      bgColor="white"
    >
      {statesList?.map((item, index) => (
        <option key={index} value={item?.geonameId}>
          {item?.name}
        </option>
      ))}
    </Select>
  );
}

export default stateSelect;
