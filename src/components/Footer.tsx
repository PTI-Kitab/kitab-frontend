import { Stack, Image, Divider } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Stack
        bgColor={"#171229"}
        px={["2em", "2em", "8em", "8em", "8em"]}
        h={"100%"}
        flexDirection={"column"}
        paddingStart={"4em"}
        paddingEnd={"4em"}
        paddingTop={"6vh"}
        paddingBottom={"6vh"}
      >
        <Stack w={"100%"} h={"100%"}>
          <Stack>
            <Image src="logo/logo_footer.png" w={"8em"} paddingBottom={"1vh"} />
          </Stack>
          <Stack
            w={"100%"}
            h={"100%"}
            color={"rgba(255, 255, 255, 0.6)"}
            paddingBottom={"10vh"}
          >
            <Stack flex={"1"} py={"1em"}>
              <p>KITAB (kost Information To Anak Baru).</p>
              <p>Menyediakan solusi inovatif dalam pencarian</p>
              <p>tempat tinggal bagi mahasiswa baru.</p>
            </Stack>
          </Stack>
        </Stack>
        <Divider orientation="horizontal" />
        <Stack
          w={"100%"}
          h={"100%"}
          color={"rgb(255, 255, 255)"}
          paddingTop={"2vh"}
        >
          <p>&copy; 2023 KITAB. All right reserved.</p>
        </Stack>
      </Stack>
    </>
  );
};

export default Footer;
