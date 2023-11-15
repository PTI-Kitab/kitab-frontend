import {
  Stack,
  Text,
  Button,
  Image,
  Link,
  Avatar,
  DrawerBody,
  Divider,
  DrawerContent,
  // DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  Drawer,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack
      direction={"row"}
      justify={"space-between"}
      align={"center"}
      // bgColor={"blue.200"}
      px={["2em", "2em", "8em", "8em", "8em"]}
      h={"6em"}
    >
      <Button
        variant={"ghost"}
        color={"white"}
        display={["flex", "flex", "none", "none", "none"]}
        onClick={onOpen}
        _hover={{
          bgColor: "transparent",
        }}
      >
        <HamburgerIcon w={8} h={8} />
      </Button>

      <Link href="/" display={["none", "none", "flex", "flex", "flex"]}>
        <Image src="/logo/logo_kitab_navbar.png" />
      </Link>

      <Stack
        direction={"row"}
        display={["none", "none", "flex", "flex", "flex"]}
        align={"center"}
        // w={"36em"}
        w={"full"}
        justify={"space-evenly"}
        // mx={"4em"}
      >
        <Link
          href=""
          opacity={"0.5"}
          _hover={{
            opacity: "1",
          }}
          textColor={"white"}
          fontSize={"large"}
        >
          Cari Kosan
        </Link>
        <Link
          href=""
          opacity={"0.5"}
          _hover={{
            opacity: "1",
          }}
          textColor={"white"}
          fontSize={"large"}
        >
          Kost 101
        </Link>
        <Link
          href=""
          opacity={"0.5"}
          _hover={{
            opacity: "1",
          }}
          textColor={"white"}
          fontSize={"large"}
        >
          Tentang Kami
        </Link>
      </Stack>
      {!isLoggedIn && (
        <Button
          onClick={() => {
            setIsLoggedIn(!isLoggedIn);
          }}
          variant={"solid"}
          colorScheme={"blue"}
          w={"6em"}
          bgGradient="linear(to-r, rgb(1, 16, 141), rgb(1, 152, 189)),"
          _hover={{
            opacity: "1",
          }}
        >
          Masuk
        </Button>
      )}

      {isLoggedIn && (
        <Avatar
          onClick={() => {
            setIsLoggedIn(!isLoggedIn);
          }}
        />
      )}

      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerContent
          outlineColor={"gray.500"}
          outlineOffset={"-0.5px"}
          p={"1em"}
          bgColor={"rgba(56, 68, 100, 0.25)"}
          backdropFilter={"blur(4px)"}
          roundedRight={"2em"}
        >
          {/* <DrawerCloseButton /> */}
          <DrawerHeader
            my={"0.75em"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image src="/logo/logo_kitab_navbar.png" />
          </DrawerHeader>

          <DrawerBody>
            <Divider orientation="horizontal" />
            <Link
              href=""
              my={"1em"}
              opacity={"0.5"}
              _hover={{
                opacity: "1",
              }}
              textColor={"white"}
              fontSize={"medium"}
              display={"flex"}
              justifyContent={"center"}
            >
              Cari Kosan
            </Link>
            <Divider orientation="horizontal" />
            <Link
              href=""
              my={"1em"}
              opacity={"0.5"}
              _hover={{
                opacity: "1",
              }}
              textColor={"white"}
              fontSize={"medium"}
              display={"flex"}
              justifyContent={"center"}
            >
              Kost 101
            </Link>
            <Divider orientation="horizontal" />
            <Link
              href=""
              my={"1em"}
              opacity={"0.5"}
              _hover={{
                opacity: "1",
              }}
              textColor={"white"}
              fontSize={"medium"}
              display={"flex"}
              justifyContent={"center"}
            >
              Tentang Kami
            </Link>
            <Divider orientation="horizontal" />
          </DrawerBody>

          <DrawerFooter>
            <Text>ini footer ya xixixi</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default NavBar;
