import { Stack } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      minH={"100vh"}
      direction={"column"}
      bgImage={"/background/main.webp"}
      bgPosition={"top"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      justifyContent={"space-between"}
    >
      <NavBar />
      <Stack direction={"column"} flex={1}>
        {children}
      </Stack>
      <Footer />
    </Stack>
  );
};

export default Layout;
