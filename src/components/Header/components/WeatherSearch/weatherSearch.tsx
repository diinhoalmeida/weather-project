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
import { useRef, useEffect } from "react";
import { handleWeatherData } from "../../../../services/weatherApi";
import {
  handleKeyDown,
  handleSelectCityWithClick,
  handleWeatherByCity,
} from "../../utils/cityActions";
import { WeatherSearchProps } from "../../interfaces/weatherSearchProps";

function WeatherSearch({
  citysList,
  setOpenCardWeather,
  onCitySubmit,
  setCityName,
  setSelectedItemIndex,
  setCitysSugestions,
  setWeatherData,
  citysSugestions,
  copyCitysList,
  countryName,
  stateName,
  setLoadingWeatherCall,
  setCopyCitysList,
  cityName,
  selectedItemIndex,
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
            onChange={(event) => {
              handleWeatherByCity({
                event,
                citysList,
                setCityName,
                setCitysSugestions,
                setCopyCitysList,
              });
              setOpenCardWeather(false);
            }}
            onKeyDown={(event) =>
              handleKeyDown({
                event,
                setLoadingWeatherCall,
                selectedItemIndex,
                setCitysSugestions,
                setOpenCardWeather,
                setSelectedItemIndex,
                copyCitysList,
                setCityName,
                handleSelectCityWithClick,
                cityName,
                countryName,
                stateName,
                handleWeatherData,
                setWeatherData,
              })
            }
            focusBorderColor="transparent"
            type="text"
            placeholder="Insira o nome da cidade"
            autoComplete="off"
          />
          <Button type="submit">
            <AiOutlineSearch size={25} />
          </Button>
        </Box>
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
          {copyCitysList?.map((item, index) => (
            <ListItem
              key={index}
              w="full"
              px={5}
              py={2}
              _hover={{ backgroundColor: "gray.200", cursor: "pointer" }}
              bg={index === selectedItemIndex ? "gray.200" : "transparent"}
              rounded="lg"
              onClick={() => {
                handleSelectCityWithClick({
                  citySelected: item.toponymName,
                  setCityName,
                  setSelectedItemIndex,
                });
                setCitysSugestions(false);
              }}
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
