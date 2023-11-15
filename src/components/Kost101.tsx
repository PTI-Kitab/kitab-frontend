import { Stack, Text, Divider, Image } from "@chakra-ui/react";

const Kost101 = () => {
  return (
    <Stack
      bgColor={"white"}
      borderTopRadius={"2em"}
      // boxShadow={"0px 5px 5px 2px rgba(0,0,0,0.24) inset"}
      boxShadow={"0px 5px 24px 8px rgba(0,0,0,0.3) inset"}
      paddingStart={"7em"}
      paddingEnd={"7em"}
      paddingTop={"1.5em"}
    >
      <Stack flexDirection={"row"}>
        <Text fontSize={"4xl"} as={"b"} flex={"1"} textAlign={"right"}>
          How to
        </Text>
        <Text
          fontSize={"4xl"}
          as={"b"}
          flex={"1"}
          bgGradient={"linear(to-t, #0198BD, #01108D)"}
          bgClip="text"
          paddingBottom={"3vh"}
        >
          Kost101.
        </Text>
      </Stack>

      <Stack paddingBottom={"12vh"}>
        <Divider border={"1px"} borderColor={"#171229"} variant={"solid"} />

        <Stack flexDirection={"row"} paddingBottom={"3vh"} paddingTop={"3vh"}>
          <Image src="home/ArticleDotList.png" w={"1.4em"} />
          {/* isi judul artikel lo dibawah disini cok */}
          <Text
            fontSize={"1xl"}
            marginLeft={"1.4em"}
            fontWeight={"semibold"}
            color={"rgba(0, 0, 0, 0.6)"}
          >
            Surviving "Kost" Life : A Beginner's Guide to Independent Living
          </Text>
        </Stack>

        <Divider border={"1px"} borderColor={"#171229"} variant={"solid"} />

        <Stack flexDirection={"row"} paddingBottom={"3vh"} paddingTop={"3vh"}>
          <Image src="home/ArticleDotList.png" w={"1.4em"} />
          {/* isi judul artikel lo dibawah disini cok */}
          <Text
            fontSize={"1xl"}
            marginLeft={"1.4em"}
            fontWeight={"semibold"}
            color={"rgba(0, 0, 0, 0.6)"}
          >
            Budgeting Like a Pro : Financial Hacks for Students
          </Text>
        </Stack>

        <Divider border={"1px"} borderColor={"#171229"} variant={"solid"} />
      </Stack>
    </Stack>
  );
};

export default Kost101;
