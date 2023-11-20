import {
  Stack,
  Button,
  Image,
  Link,
  Avatar,
  DrawerBody,
  Divider,
  DrawerContent,
  // DrawerCloseButton,
  DrawerHeader,
  Drawer,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { FaPen, FaRightFromBracket } from "react-icons/fa6";

const NavBar = () => {
  const auth = useAuth();

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

      <Link
        as={RouterLink}
        to="/"
        display={["none", "none", "flex", "flex", "flex"]}
      >
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
          as={RouterLink}
          to="/listings/"
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
          href="/#kost101"
          // as={RouterLink}
          // to="/#kost101"
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
          as={RouterLink}
          to="/aboutus/"
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

      {auth.status === "unauthenticated" && (
        <Button
          as={RouterLink}
          to={"/login"}
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

      {auth.status === "authenticated" && (
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Avatar
              src={`https://api.multiavatar.com/${auth.user?.firstName}.svg`}
              cursor={"pointer"}
            />
          </PopoverTrigger>

          <PopoverContent bgColor={"transparent"} borderColor={"transparent"}>
            <Stack direction={"column"}>
              <Stack
                rounded={"3xl"}
                roundedTopEnd={"none"}
                bgColor={"#D9D9D9"}
                p={"1em"}
                align={"center"}
              >
                <Avatar
                  size={"2xl"}
                  src={`https://api.multiavatar.com/${auth.user?.firstName}.svg`}
                />
                <Button
                  as={RouterLink}
                  to={"/profile"}
                  size={"sm"}
                  variant={"outline"}
                  color={"blackAlpha.700"}
                  rounded={"2xl"}
                  // outlineColor={"blackAlpha.700"}
                  rightIcon={<Icon as={FaPen} />}
                >
                  Edit Profil
                </Button>

                <Text color={"blackAlpha.700"}>{auth.user?.email}</Text>
                <Text fontWeight={"bold"} fontSize={"xl"}>
                  {auth.user?.firstName} {auth.user?.lastName}
                </Text>
              </Stack>
              {auth.user?.role === "client" && (
                <Button
                  as={RouterLink}
                  to={"/client/myKost/"}
                  bgColor={"#D9D9D9"}
                  rounded={"2xl"}
                >
                  MyKost
                </Button>
              )}
              {auth.user?.role === "admin" && (
                <Button
                  as={RouterLink}
                  to={"/admin/"}
                  bgColor={"#D9D9D9"}
                  rounded={"2xl"}
                >
                  Admin Console
                </Button>
              )}
              {auth.user?.role === "pemilik" && (
                <Button
                  as={RouterLink}
                  to={"/pemilik/kostManager/"}
                  bgColor={"#D9D9D9"}
                  rounded={"2xl"}
                >
                  Pemilik Space
                </Button>
              )}

              <Button
                bgColor={"#D9D9D9"}
                color={"red.700"}
                rounded={"2xl"}
                rightIcon={<Icon as={FaRightFromBracket} />}
                onClick={() => {
                  auth.logout();
                }}
              >
                Log out
              </Button>
            </Stack>
          </PopoverContent>
        </Popover>
      )}

      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerContent
          outlineColor={"gray.500"}
          outlineOffset={"-0.5px"}
          p={"1em"}
          bgColor={"rgba(0, 0, 0, 0.5)"}
          backdropFilter={"blur(6px)"}
          roundedRight={"2em"}
        >
          {/* <DrawerCloseButton /> */}
          <DrawerHeader
            my={"0.75em"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Link as={RouterLink} to={"/"}>
              <Image src="/logo/logo_kitab_navbar.png" />
            </Link>
          </DrawerHeader>

          <DrawerBody>
            <Divider orientation="horizontal" />
            <Link
              as={RouterLink}
              to="/listings/"
              my={"1em"}
              opacity={"0.75"}
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
              as={RouterLink}
              to="/#kost101"
              my={"1em"}
              opacity={"0.75"}
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
              as={RouterLink}
              to="/aboutus/"
              my={"1em"}
              opacity={"0.75"}
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
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default NavBar;
