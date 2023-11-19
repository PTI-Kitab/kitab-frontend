import { Stack, Text, Spinner, Image } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Stack
      pos={"fixed"}
      top={0}
      zIndex={9999}
      direction={"column"}
      justify={"center"}
      align={"center"}
      w={"100%"}
      h={"100vh"}
      bgImage={"/background/main.webp"}
      bgPosition={"top"}
      bgRepeat={"no-repeat"}
    >
      <Stack justify={"center"} align={"center"} color={"white"}>
        <Image src={"/logo/logo_footer.png"} w={"12em"} alt="logo-kitab" />
        <Stack direction={"row"} justify={"center"} align={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="#0198BD"
            color="#01108D"
            size="md"
          />
          <Text fontWeight={"bold"} fontSize={"xl"}>
            Loading...
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoadingScreen;
