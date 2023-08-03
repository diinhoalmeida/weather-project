import { Center, Spinner, Flex } from "@chakra-ui/react";

const WeatherListLoading = () => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      height="300px"
      zIndex="modal"
    >
      <Center>
        <Spinner size="xl" color="blue.500" />
      </Center>
    </Flex>
  );
};

export default WeatherListLoading;
