import Layout from "@/components/layouts/Layout";
import { Button, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Layout>
      <Stack
        w={"full"}
        align={"center"}
        justify={"center"}
        color={"white"}
        my={"4em"}
      >
        <Stack my={"1em"} align={"center"} justify={"center"}>
          <Text
            bgGradient="linear(to-b, #FFFFFF, #07799B)"
            bgClip="text"
            fontSize={"8xl"}
            fontWeight={"extrabold"}
          >
            Oops.
          </Text>
          <Text fontWeight={"bold"} fontSize={"xl"} mt={"-1em"}>
            404 - Page Not Found
          </Text>
        </Stack>

        <Text>
          Halaman yang anda cari tidak dapat ditemukan, seperti kisah cinta
          developernya :(
        </Text>

        <Button as={Link} to={"/"}>
          Kembali ke Beranda
        </Button>
      </Stack>
    </Layout>
  );
};

export default NotFoundPage;
