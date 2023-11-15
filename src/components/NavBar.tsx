import { Stack, Text, Button, Image, Link } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Stack
      direction={"row"}
      justify={"space-between"}
      align={"center"}
      bgColor={"blue.200"}
      px={"8em"}
      h={"6em"}
    >
      <Link href="/">
        <Image src="/logo/logo_kitab_navbar.png" />
      </Link>
      <Stack
        direction={"row"}
        align={"center"}
        w={"36em"}
        justify={"space-between"}
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
          About Us
        </Link>
      </Stack>
      <Stack>
        <Button
          variant={"solid"}
          colorScheme={"blue"}
          bgGradient="linear(to-r, rgb(1, 16, 141), rgb(1, 152, 189)),"
          _hover={{
            opacity: "1",
          }}
        >
          Masuk
        </Button>
      </Stack>
    </Stack>
  );
};

export default NavBar;
