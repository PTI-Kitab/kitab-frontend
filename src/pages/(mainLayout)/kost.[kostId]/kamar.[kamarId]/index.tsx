import { Text, Stack, Image, Show, Icon, Button } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";

const KamarPage = () => {
  return (
    <>
      <Stack direction={"row"}>
        <Stack flex={"2"} marginEnd={"2em"}>
          <Stack
            marginStart={["2em", "2em", "8em", "8em", "8em"]}
            my={"1em"}
            bgColor={"rgba(255, 255, 255, 0.15)"}
            backdropFilter={"blur(4px)"}
            rounded={"2xl"}
            color={"white"}
            textShadow={"md"}
            p={"1em"}
            px={["1em", "1em", "1em", "1em", "1em"]}
            position={"relative"}
          >
            <Stack>
              <Stack position="relative">
                <Image
                  src="/background/pic1.png"
                  w="100%"
                  h="auto"
                  zIndex={0}
                />
                <Button
                  position="absolute"
                  bottom={0}
                  right={0}
                  bgColor="white"
                  color="black"
                  zIndex={1}
                  rounded={"full"}
                  fontWeight={"light"}
                  marginBottom={"0.8em"}
                  marginEnd={"1em"}
                  boxShadow={"dark-lg"}
                  w={["10em", "10em", "10em", "10em", "11em"]}
                  h={["2em", "2.5em", "2.2em", "2.5em", "3em"]}
                  fontSize={["0.6em", "1em", "0.7em", "1em", "1em"]}
                >
                  Lihat Foto Lainnya
                </Button>
              </Stack>

              <Stack direction={"row"}>
                <Image src="/background/pic2.png" flex={"1"} w="48%" h="auto" />
                <Image src="/background/pic3.png" flex={"1"} w="48%" h="auto" />
              </Stack>
            </Stack>
          </Stack>

          {/* Mobile Settings */}
          <Show breakpoint="(max-width: 766px)">
            <Stack
              marginStart={["2em", "2em", "8em", "8em", "8em"]}
              my={"1em"}
              bgColor={"rgba(255, 255, 255, 0.15)"}
              backdropFilter={"blur(4px)"}
              rounded={"2xl"}
              color={"white"}
              textShadow={"md"}
              p={"1em"}
              px={["1em", "1em", "1em", "1em", "1em"]}
              position={"relative"}
            >
              <Stack>
                <Text>Bonang number 1</Text>
              </Stack>
            </Stack>
          </Show>

          <Stack
            marginStart={["2em", "2em", "8em", "8em", "8em"]}
            my={"1em"}
            bgColor={"rgba(255, 255, 255, 0.15)"}
            backdropFilter={"blur(4px)"}
            rounded={"2xl"}
            color={"white"}
            textShadow={"md"}
            p={"1em"}
            px={["1em", "1em", "1em", "4em", "4em"]}
          >
            <Text fontSize={"5xl"}>Treasure Kost</Text>
            <Stack direction={"row"} align="center" py={"0.4em"}>
              <Icon as={FaLocationDot} />
              <Text fontSize={"md"} fontWeight={"thin"}>
                Desa Curug Sangereng, Kelapa Dua
              </Text>
            </Stack>
            <Text fontSize={"3xl"}>Detail</Text>
            <Text fontWeight={"thin"}>detail lo ada disiniiii</Text>

            <Stack py={"1em"} fontWeight={"thin"}>
              <Text fontSize={"2xl"} fontWeight={"normal"}>
                Detail Kamar
              </Text>
              <Text>Tipe Kamar 3x3</Text>
              <Text>Kamar mandi dalam</Text>
              <Text>Listrik (Tidak termasuk)</Text>
              <Text>Air (Termasuk)</Text>
            </Stack>
            <Stack py={"1em"} fontWeight={"thin"}>
              <Text fontSize={"2xl"} fontWeight={"normal"}>
                Fasilitas Umum
              </Text>
              <Text>WiFi</Text>
              <Text>Mesin cuci</Text>
              <Text>Jemuran</Text>
              <Text>Pendingin Ruangan (AC)</Text>
            </Stack>
            <Stack py={"1em"} fontWeight={"thin"}>
              <Text fontSize={"2xl"} fontWeight={"normal"}>
                Peraturan Kamar
              </Text>
              <Text>Tidak diperbolehkan menginap</Text>
              <Text>Tidak diperbolehkan membawa hewan peliharaan</Text>
              <Text>Batas tamu berkunjung sampai dengan jam 10 malam</Text>
            </Stack>
          </Stack>
        </Stack>

        {/* Desktop Settings */}
        <Show breakpoint="(min-width: 766px)">
          <Stack flex={"1"}>
            <Stack
              minH={"60vh"}
              marginEnd={["2em", "2em", "8em", "8em", "8em"]}
              my={"1em"}
              bgColor={"rgba(255, 255, 255, 0.15)"}
              backdropFilter={"blur(4px)"}
              rounded={"2xl"}
              color={"white"}
              textShadow={"md"}
              p={"1em"}
              px={["1em", "1em", "4em", "4em", "4em"]}
              // top={"0"}
              // right={"0"}
              // position={""}
            >
              <Text>Bonang</Text>
            </Stack>
          </Stack>
        </Show>
      </Stack>
    </>
  );
};

export default KamarPage;
