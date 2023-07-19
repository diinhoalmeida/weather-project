import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

function Header() {
  return (
    <Flex
      width="full"
      borderBottom="1px"
      borderColor="white"
      paddingBottom={10}
      flexDirection="column"
      alignItems="center"
      gap={50}
    >
      <Text
        textAlign={{ base: "left", md: "center" }}
        fontSize={{ base: "5xl", md: "6xl" }}
        fontWeight="bold"
        color="whiteAlpha.900"
      >
        Previsão do tempo
      </Text>
      <Box
        bgColor="gray.300"
        rounded="lg"
        height="50px"
        display="flex"
        borderColor="#FF7F00"
        alignItems="center"
        px={2}
        width={{ base: "100%", md: "95%" }}
      >
        <Input
          bgColor="transparent"
          p={2}
          borderColor="transparent"
          focusBorderColor="transparent"
          type="text"
          placeholder="Insira o nome da cidade"
        />
        <AiOutlineSearch size={25} />
      </Box>
    </Flex>
  );
}

export default Header;
