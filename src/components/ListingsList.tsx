import {
  Stack,
  Text,
  Image,
  HStack,
  Button,
  Icon,
  Badge,
  Tooltip,
  Link,
} from "@chakra-ui/react";
import {
  FaLocationDot,
  FaPerson,
  FaPersonDress,
  FaShuffle,
} from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom";

type Kamar = {
  GambarKamar: string[];
  id: number;
  gender: "pria" | "wanita" | "campur";
  kost: {
    id: number;
    namaKost: string;
    alamat: string;
  };
  namaKamar: string;
  harga: number;
  ukuran: string;
  capacity: number;
};

const ListingsList = ({ kamar }: { kamar: Kamar }) => {
  return (
    <>
      <Stack
        bgColor={"whiteAlpha.200"}
        backdropFilter={"blur(4px)"}
        borderRadius={"1em"}
        border={"0.05em solid #718096"}
        flexDirection={"row"}
      >
        <Stack
          flex={1}
          bgImage={kamar.GambarKamar[0]}
          bgPos={"center"}
          bgSize={"cover"}
          rounded={"2xl"}
        ></Stack>

        <Stack flex={"1"}>
          <Stack
            paddingStart={"0.8em"}
            paddingTop={"0.6em"}
            paddingEnd={"0em"}
            paddingBottom={"0em"}
            color={"white"}
            w={"100%"}
            h={"100%"}
            direction={"column"}
            justify={"space-between"}
          >
            <Stack direction={"column"} gap={0}>
              <Stack direction={"row"} align={"center"}>
                <Link
                  as={RouterLink}
                  to={`/kost/${kamar.kost.id}/kamar/${kamar.id}`}
                  fontSize={["md", "xl", "2xl", "2xl", "2xl"]}
                >
                  {kamar.namaKamar}
                </Link>

                <Tooltip
                  label={`Kamar ini ${
                    kamar.gender !== "campur" ? "khusus " : ""
                  }${kamar.gender}`}
                >
                  <Stack>
                    <Icon
                      as={
                        kamar.gender === "pria"
                          ? FaPerson
                          : kamar.gender === "wanita"
                          ? FaPersonDress
                          : FaShuffle
                      }
                      color={"white"}
                    />
                  </Stack>
                </Tooltip>
              </Stack>

              <Link as={RouterLink} to={`/kost/${kamar.kost.id}`}>
                {kamar.kost.namaKost}
              </Link>

              <HStack>
                <Icon as={FaLocationDot} color={"white"} />
                <Text
                  fontSize={["xs", "xs", "sm", "sm", "sm"]}
                  fontWeight={"thin"}
                >
                  {kamar.kost.alamat}
                </Text>
              </HStack>
              <Stack spacing={"0em"} my={"1em"}>
                <Text fontSize={"xs"} fontWeight={"thin"}>
                  Harga mulai dari
                </Text>
                <Text
                  fontSize={["xs", "sm", "sm", "sm", "sm"]}
                  fontWeight={"semi"}
                >
                  {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(kamar.harga)}
                  /bln
                </Text>
              </Stack>
            </Stack>
            <Button
              as={RouterLink}
              to={`/kost/${kamar.kost.id}/kamar/${kamar.id}/`}
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
    </>
  );
};

export default ListingsList;
