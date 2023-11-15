import {
  Text,
  Stack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const IndexPage = () => {
  return (
    <Stack
      direction={"column"}
      justify={"center"}
      align={"center"}
      my={["4em", "4em", "8em", "8em", "8em"]}
    >
      <Text
        textColor={"white"}
        fontSize={["x-large", "x-large", "xxx-large", "xxx-large", "xxx-large"]}
        fontWeight={"extrabold"}
      >
        Kost Information to
      </Text>
      <Text
        bgGradient="linear(to-b, #FFFFFF, #07799B)"
        bgClip="text"
        fontSize={["x-large", "x-large", "xxx-large", "xxx-large", "xxx-large"]}
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
        fontSize={["x-small", "x-small", "medium", "medium", "medium"]}
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
    </Stack>
  );
};

export default IndexPage;
