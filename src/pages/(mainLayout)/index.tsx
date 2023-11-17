import {
  Text,
  Stack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Leaderboard from "@/components/Leaderboard";
import Kost101 from "@/components/Kost101";

const IndexPage = () => {
  return (
    <Stack
      direction={"column"}
      justify={"center"}
      align={"center"}
      mt={["2em", "2em", "4em", "4em", "4em"]}
    >
      <Text
        textColor={"white"}
        fontSize={[
          "xx-large",
          "xx-large",
          "xxx-large",
          "xxx-large",
          "xxx-large",
        ]}
        fontWeight={"extrabold"}
      >
        Kost Information to
      </Text>
      <Text
        bgGradient="linear(to-b, #FFFFFF, #07799B)"
        bgClip="text"
        fontSize={[
          "xx-large",
          "xx-large",
          "xxx-large",
          "xxx-large",
          "xxx-large",
        ]}
        fontWeight={"extrabold"}
        mt={"-0.5em"}
      >
        Anak baru.
      </Text>
      <Text textColor={"white"} align={"center"}>
        membantu mahasiswa baru untuk beradaptasi
      </Text>

      <Image
        w={["16em", "16em", "32em", "32em", "32em"]}
        my={"4em"}
        fontSize={"md"}
        src="/home/kamar.png"
      />
      <Text pb={"1em"} textColor={"white"}>
        cari apa yang kamu butuhkan!
      </Text>
      <InputGroup w={"60%"} bgColor={"whiteAlpha.200"} rounded={"1em"}>
        <Input
          rounded={"1em"}
          borderColor={"gray.500"}
          placeholder="Treasure Kost, Warteg Murah, Kost terdekat dari UMN"
          textOverflow={"ellipsis"}
        />
        <InputRightElement>
          <SearchIcon pr={"1em"} boxSize={"10"} color={"gray.500"} />
        </InputRightElement>
      </InputGroup>
      <Leaderboard
        kosts={[
          {
            id: 1,
            namaKamar: "Kost 1",
            GambarKamar: ["/home/kamar_kos.png"],
          },
          {
            id: 2,
            namaKamar: "Kost Best",
            GambarKamar: ["/home/kamar_kos.png"],
          },
          {
            id: 3,
            namaKamar: "Kost 2",
            GambarKamar: ["/home/kamar_kos.png"],
          },
        ]}
      />
      <Kost101
        articles={[
          {
            id: 1,
            title: "Kost101 Example Page",
            createdAt: "2021-10-10",
            updatedAt: "2021-10-10",
          },
        ]}
        isLoadCandidate={true}
      />
    </Stack>
  );
};

export default IndexPage;
