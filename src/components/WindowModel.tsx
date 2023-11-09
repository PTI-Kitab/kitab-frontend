import { ReactNode } from "react";
import { Stack, Box } from "@chakra-ui/react";

export const MacWindowModel = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Stack h={"16em"} w={"24em"} bgColor={"gray.800"} rounded={"xl"}>
        <Stack direction={"row"} m={"1em"}>
          <Box h={"1em"} w={"1em"} rounded={"full"} bgColor={"red.400"} />
          <Box h={"1em"} w={"1em"} rounded={"full"} bgColor={"yellow.400"} />
          <Box h={"1em"} w={"1em"} rounded={"full"} bgColor={"green.400"} />
        </Stack>

        <Stack direction={"column"} flex={1} align="center" justify={"center"}>
          {children}
        </Stack>
      </Stack>
    </>
  );
};
