import { Stack, Text, Divider, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type KostListing = {
  id: number;
  namaKamar: string;
  GambarKamar: string[];
};

const Leaderboard = ({ kosts }: { kosts: KostListing[] }) => {
  return (
    <Stack
      w={"full"}
      my={"2em"}
      align={"center"}
      justify={"center"}
      pos={"relative"}
    >
      <Stack
        direction={"column"}
        align={"center"}
        justify={"center"}
        w={"60%"}
        zIndex={2}
      >
        <Stack
          direction={"row"}
          align={"center"}
          justify={["center", "center", "start", "start", "start"]}
          w={"full"}
          mb={"4em"}
        >
          <Text
            fontSize={["2xl", "2xl", "2xl", "2xl", "2xl"]}
            textColor={"white"}
            // textAlign={["center", "center", "left", "left", "left"]}
            whiteSpace={"nowrap"}
          >
            Kost Terbaik{" "}
            <Text
              as="span"
              bgClip={"text"}
              fontWeight={"bold"}
              bgGradient="linear(to-b, #FFFFFF, #07799B)"
            >
              Bulan ini
            </Text>
          </Text>

          <Divider
            display={["none", "none", "block", "block", "block"]}
            orientation="horizontal"
            ml={"2em"}
          />
        </Stack>

        {/* mobile view */}
        <Stack
          w={"full"}
          direction={"column"}
          display={["flex", "flex", "none", "none", "none"]}
        >
          <Stack
            as={Link}
            to={`/kamar/${kosts[0].id}`}
            w={"full"}
            h={["18em", "18em", "16em", "24em", "24em"]}
            bgColor={"#D9D9D9"}
            rounded={"3xl"}
            gap={0}
          >
            <Image
              src={kosts[0].GambarKamar[0]}
              h={"75%"}
              objectFit={"cover"}
              rounded={"3xl"}
              boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.25)"}
            />
            <Stack h={"20%"} align={"center"} justify={"center"}>
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                {kosts[0].namaKamar}
              </Text>
            </Stack>
          </Stack>
          <Stack
            as={Link}
            to={`/kamar/${kosts[1].id}`}
            w={"full"}
            h={["16em", "16em", "14em", "18em", "18em"]}
            bgColor={"#D9D9D9"}
            rounded={"3xl"}
            gap={0}
          >
            <Image
              src={kosts[1].GambarKamar[0]}
              h={"80%"}
              objectFit={"cover"}
              rounded={"3xl"}
              boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.25)"}
            />
            <Stack h={"20%"} align={"center"} justify={"center"}>
              <Text fontWeight={"semibold"}>{kosts[1].namaKamar}</Text>
            </Stack>
          </Stack>
          <Stack
            as={Link}
            to={`/kamar/${kosts[2].id}`}
            w={"full"}
            h={["18em", "18em", "16em", "24em", "24em"]}
            bgColor={"#D9D9D9"}
            rounded={"3xl"}
            gap={0}
          >
            <Image
              src={kosts[2].GambarKamar[0]}
              h={"80%"}
              objectFit={"cover"}
              rounded={"3xl"}
              boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.25)"}
            />
            <Stack h={"20%"} align={"center"} justify={"center"}>
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                {kosts[2].namaKamar}
              </Text>
            </Stack>
          </Stack>
        </Stack>

        {/* desktop view */}
        <Stack
          direction={"row"}
          w={"full"}
          align={"end"}
          display={["none", "none", "flex", "flex", "flex"]}
        >
          <Stack
            as={Link}
            to={`/kamar/${kosts[0].id}`}
            w={"16em"}
            h={["16em", "16em", "14em", "18em", "18em"]}
            bgColor={"#D9D9D9"}
            rounded={"3xl"}
            gap={0}
            transition={"all 0.2s ease-in-out"}
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.25)",
            }}
          >
            <Image
              src={kosts[0].GambarKamar[0]}
              h={"80%"}
              objectFit={"cover"}
              rounded={"3xl"}
              boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.25)"}
            />
            <Stack h={"20%"} align={"center"} justify={"center"}>
              <Text fontWeight={"semibold"}>{kosts[0].namaKamar}</Text>
            </Stack>
          </Stack>
          <Stack
            as={Link}
            to={`/kamar/${kosts[1].id}`}
            w={"20em"}
            h={["18em", "18em", "16em", "24em", "24em"]}
            bgColor={"#D9D9D9"}
            rounded={"3xl"}
            gap={0}
            transition={"all 0.2s ease-in-out"}
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.25)",
            }}
          >
            <Image
              src={kosts[1].GambarKamar[0]}
              h={"80%"}
              objectFit={"cover"}
              rounded={"3xl"}
              boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.25)"}
            />
            <Stack h={"20%"} align={"center"} justify={"center"}>
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                {kosts[1].namaKamar}
              </Text>
            </Stack>
          </Stack>
          <Stack
            as={Link}
            to={`/kamar/${kosts[2].id}`}
            w={"16em"}
            h={["16em", "16em", "14em", "18em", "18em"]}
            bgColor={"#D9D9D9"}
            rounded={"3xl"}
            gap={0}
            transition={"all 0.2s ease-in-out"}
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.25)",
            }}
          >
            <Image
              src={kosts[2].GambarKamar[0]}
              h={"80%"}
              objectFit={"cover"}
              rounded={"3xl"}
              boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.25)"}
            />
            <Stack h={"20%"} align={"center"} justify={"center"}>
              <Text fontWeight={"semibold"}>{kosts[2].namaKamar}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        pos={"absolute"}
        zIndex={1}
        w={"80%"}
        h={"6em"}
        bottom={"9em"}
        bgColor={"rgba(255, 255, 255, 0.25)"}
        backdropFilter={"blur(6px)"}
        outlineColor={"white"}
        outline={"1px solid white"}
        rounded={"3xl"}
      />

      <Text textColor={"white"} my={"4em"} fontSize={"xl"}>
        Dipilih berdasarkan layanan terbaik
      </Text>
    </Stack>
  );
};
export default Leaderboard;
