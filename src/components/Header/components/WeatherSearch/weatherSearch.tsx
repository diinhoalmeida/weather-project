// components/Header/WeatherSearch.tsx
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { GeonameProps } from "../../../../interfaces/geoname";

interface WeatherSearchProps {
  statesList: GeonameProps[];
  citysList: GeonameProps[];
  onCityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCitySubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCitySelect: (citySelected: string) => void;
  cityName: string;
  citysSugestions: boolean;
  selectedItemIndex: number;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function WeatherSearch({
  citysList,
  onCityChange,
  onCitySubmit,
  citysSugestions,
  onCitySelect,
  cityName,
  selectedItemIndex,
  handleKeyDown,
}: WeatherSearchProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current && selectedItemIndex >= 0) {
      const itemHeight = 36; // Adjust this value as needed based on the item height in pixels
      const visibleItems = Math.floor(250 / itemHeight); // Calculate the number of visible items
      const scrollIndex =
        selectedItemIndex >= visibleItems
          ? selectedItemIndex - Math.floor(visibleItems / 2)
          : 0;
      listRef.current.scrollTop = scrollIndex * itemHeight;
    }
  }, [selectedItemIndex]);

  return (
    <Flex flexDirection="column" width="full" position="relative">
      <form onSubmit={onCitySubmit}>
        <FormControl>
          <Box
            bgColor="white"
            rounded="lg"
            height="50px"
            display="flex"
            borderColor="#FF7F00"
            alignItems="center"
            px={2}
          >
            <Input
              value={cityName}
              bgColor="transparent"
              p={2}
              borderColor="transparent"
              onChange={onCityChange}
              onKeyDown={handleKeyDown}
              focusBorderColor="transparent"
              type="text"
              placeholder="Insira o nome da cidade"
              autoComplete="off"
            />
            <Button type="submit">
              <AiOutlineSearch size={25} />
            </Button>
          </Box>
        </FormControl>
      </form>
      {citysList && cityName.length > 0 && citysSugestions && (
        <UnorderedList
          ref={listRef}
          display="flex"
          position="absolute"
          flexDirection="column"
          listStyleType="none"
          w="full"
          m={0}
          top="60px"
          zIndex={10}
          rounded="lg"
          bgColor="white"
          p={0}
          maxHeight="250px"
          scrollBehavior="smooth"
          overflowY="scroll"
        >
          {citysList?.map((item, index) => (
            <ListItem
              key={index}
              w="full"
              px={5}
              py={2}
              _hover={{ backgroundColor: "gray.200", cursor: "pointer" }}
              bg={index === selectedItemIndex ? "gray.200" : "transparent"}
              rounded="lg"
              onClick={() => onCitySelect(item.toponymName)}
            >
              {item.toponymName}
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Flex>
  );
}

export default WeatherSearch;
