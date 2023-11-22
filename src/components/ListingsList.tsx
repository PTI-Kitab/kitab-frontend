import { Stack, Text, Image, HStack, Button } from "@chakra-ui/react";

const ListingsList = () => {
  return (
    <>
      <Stack
        bgColor={"whiteAlpha.200"}
        flex={"1"}
        borderRadius={"1em"}
        border={"0.05em solid #718096"}
        flexDirection={"row"}
      >
        <Stack flex={"0.8"}>
          <Image
            src="/home/kamar_kos.png"
            borderRadius={"1em"}
            w={"100%"}
            h={"100%"}
            objectFit={"cover"}
          />
        </Stack>

        <Stack flex={"1"}>
          <Stack
            paddingStart={"0.8em"}
            paddingTop={"0.6em"}
            paddingEnd={"0em"}
            paddingBottom={"0em"}
            color={"white"}
            w={"100%"}
            h={"100%"}
          >
            <Text fontSize={["md", "xl", "2xl", "2xl", "2xl"]}>
              Treasure Kost
            </Text>
            <HStack paddingBottom={["0.2em", "0.8em", "1em", "1em", "1em"]}>
              <Image src="/logo/LocationIcon.png" w={"0.7em"} />
              <Text
                fontSize={["xs", "xs", "sm", "sm", "sm"]}
                fontWeight={"thin"}
              >
                Desa Curug Sangereng, Kelapa Dua
              </Text>
            </HStack>
            <Stack spacing={"0em"}>
              <Text fontSize={"xs"} fontWeight={"thin"}>
                Harga mulai dari
              </Text>
              <Text
                fontSize={["xs", "sm", "sm", "sm", "sm"]}
                fontWeight={"semi"}
              >
                Rp. 1.470.000,00/bln
              </Text>
            </Stack>
            <Stack
              direction={"column"}
              display={"flex"}
              justifyContent={"end"}
              w={"100%"}
              paddingTop={["0.5em", "1.5em", "1.8em", "1.8em", "0em"]}
            >
              <Button
                w={"10em"}
                fontSize={"xs"}
                fontWeight={"semi"}
                color={"white"}
                ml={"auto"}
                borderBottomEndRadius={"1em"}
                borderBottomStartRadius={"0em"}
                borderTopStartRadius={"1em"}
                borderTopEndRadius={"0em"}
                bgGradient={"linear(to-l, #0198BD, #01108D)"}
              >
                Booking Sekarang!
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ListingsList;
