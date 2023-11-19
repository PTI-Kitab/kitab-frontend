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
import { useEffect, useState } from "react";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";

type Article101 = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

const IndexPage = () => {
  // hooks
  const api = useApi();
  const errorHandler = useToastErrorHandler();

  // [Articles]
  const [articles, setArticles] = useState<Article101[]>([]);
  const [isLoadCandidate, setIsLoadCandidate] = useState<boolean>(true);

  useEffect(() => {
    api
      .get<ResponseModel<Article101[]>>("/articles?page=1")
      .then((res) => {
        if (res.data.data.length < 5) {
          setIsLoadCandidate(false);
        }

        setArticles(res.data.data);
      })
      .catch(errorHandler);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLoadMoreButton = () => {
    api
      .get<ResponseModel<Article101[]>>(
        `/articles?page=${~~(articles.length / 5) + 1}`
      )
      .then((res) => {
        if (res.data.data.length < 5) {
          setIsLoadCandidate(false);
        }

        setArticles([...articles, ...res.data.data]);
      })
      .catch(errorHandler);
  };

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
            GambarKamar: ["home/kamar_kos.png"],
          },
          {
            id: 2,
            namaKamar: "Kost Best",
            GambarKamar: ["home/kamar_kos.png"],
          },
          {
            id: 3,
            namaKamar: "Kost 2",
            GambarKamar: ["home/kamar_kos.png"],
          },
        ]}
      />
      <Kost101
        articles={articles}
        isLoadCandidate={isLoadCandidate}
        onLoadMoreButton={onLoadMoreButton}
      />
    </Stack>
  );
};

export default IndexPage;
