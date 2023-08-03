import { Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

interface LocationProps {
  abreviationState: string;
  countryName: string;
  cityName: string;
  temperature: number;
  setOpenCardWeather: (arg: boolean) => void;
  condition: string;
}

const Location = ({
  abreviationState,
  countryName,
  temperature,
  condition,
  setOpenCardWeather,
  cityName,
}: LocationProps) => {
  return (
    <Flex flexDirection="column">
      <Flex w="full" alignItems="center" mb="10px" position="relative">
        <Text fontWeight="semibold">
          {`${cityName}, ${abreviationState} - ${countryName}`}
        </Text>
        <Box
          position="absolute"
          right={{ base: -12, sm: 0 }}
          top={{ base: -7, sm: 0 }}
          onClick={() => setOpenCardWeather(false)}
        >
          <AiOutlineClose
            style={{ color: "#FF9A00", fontSize: "20px", cursor: "pointer" }}
          />
        </Box>
      </Flex>
      <Text fontWeight="semibold" mb="10px" fontSize="3xl">
        {`${Math.floor(temperature)}ºC ${condition}`}
      </Text>
    </Flex>
  );
};

export default Location;
