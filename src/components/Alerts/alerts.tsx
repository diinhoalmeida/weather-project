import { Alert, AlertIcon, Text } from "@chakra-ui/react";

interface AnimatedAlertProps {
  type: "success" | "error" | undefined;
  show: boolean;
}

const AnimatedAlert = ({ type, show }: AnimatedAlertProps) => {
  return (
    <Alert
      status={type === "success" ? "success" : "error"}
      position="fixed"
      top={0}
      borderRadius="md"
      width="max-content"
      justifyContent="center"
      alignItems="center"
      p={4}
      color="white"
      transform={`translateY(${show ? "-0%" : "-100%"})`}
      transition="transform 0.7s ease-in-out, background-color 0.7s ease-in-out"
    >
      <AlertIcon mr={2} />
      <Text color="black" fontWeight="semibold">
        {type === "success"
          ? "Localização encontrada com sucesso!"
          : "Localização não encontrada!"}
      </Text>
    </Alert>
  );
};

export default AnimatedAlert;
