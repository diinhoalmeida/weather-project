import { Flex, Text } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

interface LocationProps {
  abreviationState: string;
  countryName: string;
  cityName: string;
}

const Location = ({
  abreviationState,
  countryName,
  cityName,
}: LocationProps) => {
  return (
    <Flex w="full" alignItems="center" justifyContent="space-between" mb="10px">
      <Text fontWeight="semibold">
        {`${cityName}, ${abreviationState} - ${countryName}`}
      </Text>
      <AiOutlineClose
        style={{ color: "#FF9A00", fontSize: "20px", cursor: "pointer" }}
      />
    </Flex>
  );
};

export default Location;
