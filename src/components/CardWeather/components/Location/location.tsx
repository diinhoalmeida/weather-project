import { Flex, Text } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

const Location = () => {
  return (
    <Flex w="full" alignItems="center" justifyContent="space-between" mb="10px">
      <Text fontWeight="semibold">Niterói, RJ - Brasil</Text>
      <AiOutlineClose
        style={{ color: "#FF9A00", fontSize: "20px", cursor: "pointer" }}
      />
    </Flex>
  );
};

export default Location;
