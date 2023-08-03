import { Box, Spinner } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="9999"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#F3F3F3"
      opacity="0.6"
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default LoadingScreen;
