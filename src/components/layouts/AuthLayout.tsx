import { Stack, Image } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      minH={"100vh"}
      direction={"column"}
      bgImage={[
        "/background/bg_sign_mobile.png",
        "/background/bg_sign_mobile.png",
        "/background/bg_sign_desktop.png",
        "/background/bg_sign_desktop.png",
        "/background/bg_sign_desktop.png",
      ]}
      pos={"relative"}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      px={["2em", "3em", "8em", "8em", "8em"]}
      overflow={"hidden"}
      justify={"space-between"}
    >
      <Stack
        h={"6em"}
        justify={"center"}
        align={["center", "center", "start", "start", "start"]}
      >
        <RouterLink to="/">
          <Image src="/logo/logo_kitab_navbar.png" />
        </RouterLink>
      </Stack>

      <Image
        src="/house.png"
        display={["none", "none", "block", "block", "block"]}
        boxSize={["none", "none", "40em", "48em", "56em"]}
        pos={"absolute"}
        bottom={"-6em"}
        right={"-8em"}
      />

      <Stack
        flex={1}
        align={["center", "center", "start", "start", "start"]}
        justify={"center"}
      >
        <Stack
          direction={"column"}
          flex={[0, 0, 1, 1, 1]}
          w={["full", "full", "50%", "50%", "50%"]}
          bgColor={"whiteAlpha.300"}
          backdropFilter={"blur(6px)"}
          roundedTop={"3xl"}
          roundedBottom={["3xl", "3xl", "none", "none", "none"]}
          outline={"1px solid white"}
          zIndex={2}
          p={["2em", "2em", "2em", "4em", "4em"]}
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AuthLayout;
