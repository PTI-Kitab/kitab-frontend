import useTitle from "@/hooks/useTitle";
import { Stack, Text, Badge, Image, Wrap } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  useTitle("KITAB - About Us");
  return (
    <>
      <Stack
        bgColor={"whiteAlpha.200"}
        backdropFilter={"blur(4px)"}
        borderRadius={"1em"}
        p={["2em", "2em", "4em", "4em", "4em"]}
        mx={["2em", "2em", "8em", "8em", "8em"]}
        minH={"20em"}
        color={"white"}
        align={"center"}
      >
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
            bgGradient="linear(to-t, #0198BD, #01108D)"
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
            About Us !
          </Text>
        </motion.div>
        <Wrap
          mx={"3em"}
          my={"2em"}
          flexDirection={"row"}
          spacing={"1em"}
          textAlign={"center"}
          justify={"center"}
        >
          <Stack minH={"10em"} border={"black"} align={"center"}>
            <Badge colorScheme="purple" p={"0.5em"}>
              Team Lead
            </Badge>
            <Image
              src="/avatar/fathan.png"
              objectFit={"cover"}
              w={"10em"}
            ></Image>
            <Text fontSize={"xl"}>Fathan Ridwan</Text>
            <Text fontSize={"md"} lineHeight={"0.1em"}>
              00000069524
            </Text>
          </Stack>
          <Stack minH={"10em"} border={"black"} align={"center"}>
            <Badge colorScheme="red" p={"0.5em"}>
              Member 1
            </Badge>
            <Image
              src="/avatar/dimas.png"
              objectFit={"cover"}
              w={"10.3em"}
            ></Image>
            <Text fontSize={"xl"}>Dimas Takeda</Text>
            <Text fontSize={"md"} lineHeight={"0.1em"}>
              00000068930
            </Text>
          </Stack>
          <Stack minH={"10em"} border={"black"} align={"center"}>
            <Badge colorScheme="red" p={"0.5em"}>
              Member 2
            </Badge>
            <Image
              src="/avatar/alvin.png"
              objectFit={"cover"}
              w={"9em"}
            ></Image>
            <Text fontSize={"xl"}>Alvin Yohanes</Text>
            <Text fontSize={"md"} lineHeight={"0.1em"}>
              00000069115
            </Text>
          </Stack>
          <Stack minH={"10em"} border={"black"} align={"center"}>
            <Badge colorScheme="green" p={"0.5em"}>
              Member 3
            </Badge>
            <Image
              src="/avatar/rafael.png"
              objectFit={"cover"}
              w={"10.5em"}
            ></Image>
            <Text fontSize={"xl"}>Rafael Herdani</Text>
            <Text fontSize={"md"} lineHeight={"0.1em"}>
              00000076381
            </Text>
          </Stack>
          <Stack minH={"10em"} border={"black"} align={"center"}>
            <Badge colorScheme="green" p={"0.5em"}>
              Member 4
            </Badge>
            <Image
              src="/avatar/sifa.png"
              objectFit={"cover"}
              w={"10.8em"}
            ></Image>
            <Text fontSize={"xl"}>Sifa Nur</Text>
            <Text fontSize={"md"} lineHeight={"0.1em"}>
              00000082044
            </Text>
          </Stack>
        </Wrap>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: "3em" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            delay: 1,
          }}
        >
          <Stack w={"100%"} h={"100%"} align={"center"}>
            <Text
              fontWeight={"bold"}
              whiteSpace={"nowrap"}
              as={"span"}
              bgGradient={"linear(to-b, #FFFFFF, #07799B) "}
              bgClip="text"
              fontSize={["md", "lg", "x-large", "xx-large", "xx-large"]}
            >
              KITAB (Kost Information To Anak Baru)
            </Text>
            <Text
              fontWeight={"thin"}
              fontSize={["xs", "sm", "md", "md", "md"]}
              textAlign={"center"}
            >
              Sebuah aplikasi berbasis web yang dirancang khusus untuk membantu{" "}
              mahasiswa baru di Universitas Multimedia Nusantara (UMN) dalam
              mencari dan memilih kost-kostan yang sesuai dengan kebutuhan
              mereka. Tujuan utama dari aplikasi ini adalah memudahkan mahasiswa
              baru, terutama mereka yang datang dari luar kota, dalam menemukan
              kost yang dekat dengan kampus UMN.
            </Text>
            <br />
            <Text
              fontWeight={"bold"}
              whiteSpace={"nowrap"}
              as={"span"}
              bgGradient={"linear(to-b, #FFFFFF, #07799B) "}
              bgClip="text"
              fontSize={["md", "lg", "x-large", "xx-large", "xx-large"]}
            >
              Projek UAS
            </Text>
            <Text
              fontWeight={"thin"}
              fontSize={["xs", "sm", "md", "md", "md"]}
              textAlign={"center"}
            >
              Aplikasi KITAB dirancang dan dibangun untuk keperluan projek UAS.
              Bentuk final exam dari matakuliah Intro to the Internet (PTI)
              adalah Projek KITAB ini. Tidak ada maksud ataupun kegunaan lain
              selain sebagai tugas final exam dan KITAB sepenuhnya digunakan
              sebagai acuan penilaian UAS.
            </Text>
          </Stack>
        </motion.div>
      </Stack>
    </>
  );
};

export default AboutUsPage;
