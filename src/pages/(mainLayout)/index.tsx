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

import { motion, useScroll, useTransform } from "framer-motion";
import useTitle from "@/hooks/useTitle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Article101 = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

const IndexPage = () => {
  useTitle("KITAB - Home");
  // hooks
  const api = useApi();
  const errorHandler = useToastErrorHandler();

  // animation
  const { scrollYProgress } = useScroll();
  // [Articles]
  const [articles, setArticles] = useState<Article101[]>([]);
  const [isLoadCandidate, setIsLoadCandidate] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm<{ title: string }>();

  const nav = useNavigate();

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
      <motion.div
        style={{
          scale: useTransform(scrollYProgress, [0, 0.15], [1.25, 1]),
          height: useTransform(scrollYProgress, [0, 0.15], ["75vh", "5vh"]),
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: "-1em" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
            delay: 0.5,
          }}
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
            fontWeight={"semibold"}
          >
            Kost Information to
          </Text>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: "-1em" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
            delay: 1.0,
          }}
        >
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
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: "-2em" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
            delay: 1.5,
          }}
        >
          <Text textColor={"white"} align={"center"}>
            membantu mahasiswa baru untuk beradaptasi
          </Text>
        </motion.div>
      </motion.div>
      <motion.div
        style={{
          scale: useTransform(scrollYProgress, [0, 0.15], [0.85, 1]),
        }}
      >
        <Image
          w={["16em", "16em", "32em", "32em", "32em"]}
          my={"4em"}
          fontSize={"md"}
          src="/home/kamar.png"
        />
      </motion.div>
      <motion.div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        viewport={{ once: true }}
        initial={{ opacity: 0, y: "-2em" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
          delay: 0.5,
        }}
      >
        <Text pb={"1em"} textColor={"white"}>
          cari apa yang kamu butuhkan!
        </Text>
        <Stack
          as={"form"}
          w={"full"}
          align={"center"}
          color={"white"}
          onSubmit={handleSubmit((e) => {
            nav(`/listings?search=${e.title}`);
          })}
        >
          <InputGroup w={"60%"} bgColor={"whiteAlpha.200"} rounded={"1em"}>
            <Input
              {...register("title", {
                required: "Search tidak boleh kosong",
              })}
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
      </motion.div>
      <motion.div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        viewport={{ once: true }}
        initial={{ opacity: 0, y: "-2em" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
          delay: 1,
        }}
      >
        <Leaderboard
          kosts={[
            {
              id: 5,
              namaKamar: "PakCe Kost",
              GambarKamar: [
                "https://kitab.jamu.online/api/public/fef82255-ab80-4737-bbe1-cdd76437f309.jpg",
              ],
            },
            {
              id: 6,
              namaKamar: "Treasure Kost",
              GambarKamar: [
                "https://kitab.jamu.online/api/public/d120cd1b-f19b-4a1f-ade7-e10685d2c55b.jpg",
              ],
            },
            {
              id: 8,
              namaKamar: "Kost Medang Lestari",
              GambarKamar: [
                "https://kitab.jamu.online/api/public/e3efdda0-38b1-46e4-b998-1775a71f1451.jpeg",
              ],
            },
          ]}
        />
      </motion.div>
      <Kost101
        articles={articles}
        isLoadCandidate={isLoadCandidate}
        onLoadMoreButton={onLoadMoreButton}
      />
    </Stack>
  );
};

export default IndexPage;
