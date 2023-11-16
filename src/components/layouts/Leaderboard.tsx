import {
  Stack,
  Text,
  Divider,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@chakra-ui/react";

const Leaderboard = () => {
  return (
    <Stack
      direction={"column"}
      align={"center"}
      justifyContent={"space-between"}
      w={"60%"}
    >
      <Stack
        direction={"row"}
        align={"center"}
        justify={"space-evenly"}
        w={"100%"}
        pt={"4em"}
      >
        <Text as={"span"} overflow={"none"}>
          <Text
            as="span"
            fontSize={["medium", "medium", "x-large", "x-large", "x-large"]}
            textColor={"white"}
          >
            Kost Terbaik {}
          </Text>
          <Text
            as="span"
            fontSize={["medium", "medium", "x-large", "x-large", "x-large"]}
            bgClip={"text"}
            fontWeight={"extrabold"}
            bgGradient="linear(to-b, #FFFFFF, #07799B)"
          >
            Bulan ini
          </Text>
        </Text>
        <Divider
          orientation="horizontal"
          w={["20%", "40%", "40%", "50%", "70%"]}
        />
      </Stack>
      <Stack
        direction={"row"}
        justify={"space-evenly"}
        pt={"3em"}
        display={"flex"}
        alignItems={"baseline"}
        // minW={"0"}
      >
        <Stack>
          <Card border={"1em"} variant={"unstyled"} rounded={"25px"}>
            <CardBody boxSize={"100%"}>
              <Image w={"100%"} rounded={"xxl"} src="home/kos2.png" />
            </CardBody>
            <CardFooter
              display={"flex"}
              alignItems={"center"}
              justify={"center"}
            >
              <Text
                fontWeight={"bold"}
                fontSize={["small, small, large, large, large"]}
                py={"1em"}
                px={"0.5em"}
              >
                Allogio - B6 No.77
              </Text>
            </CardFooter>
          </Card>
        </Stack>
        <Stack>
          <Card border={"1em"} variant={"unstyled"} rounded={"25px"}>
            <CardBody boxSize={"100%"}>
              <Image w={"100%"} rounded={"2xl"} src="home/kos1.png" />
            </CardBody>
            <CardFooter
              display={"flex"}
              alignItems={"center"}
              justify={"center"}
            >
              <Text
                fontWeight={"bold"}
                fontSize={["small, small, large, large, large"]}
                py={"1em"}
                px={"0.5em"}
              >
                Treasure Kost
              </Text>
            </CardFooter>
          </Card>
        </Stack>
        <Stack>
          <Card border={"1em"} variant={"unstyled"} rounded={"25px"}>
            <CardBody boxSize={"100%"}>
              <Image w={"100%"} rounded={"xl"} src="home/kos3.png" />
            </CardBody>
            <CardFooter
              display={"flex"}
              alignItems={"center"}
              justify={"center"}
            >
              <Text
                fontWeight={"bold"}
                fontSize={["small, small, large, large, large"]}
                py={"1em"}
                px={"0.5em"}
              >
                Allogio depan kolam ajg
              </Text>
            </CardFooter>
          </Card>
        </Stack>
      </Stack>
      <Stack
        w={"100%"}
        h={"4em"}
        bgColor={"rgba(255, 255, 255, 0.2)"}
        rounded={"1.5em"}
        mt={"-3em"}
      />
    </Stack>
  );
};
export default Leaderboard;
