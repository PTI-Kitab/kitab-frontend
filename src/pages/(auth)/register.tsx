import { useAuth } from "@/hooks/useAuth";
import {
  Text,
  Stack,
  Link,
  FormControl,
  Input,
  FormErrorMessage,
  Checkbox,
  Button,
  InputGroup,
  InputRightElement,
  Icon,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom";

const RegisterPage = () => {
  // const navigate = useNavigate();
  const auth = useAuth();

  // 2. bikin form, masukin dto sebagai generic
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm<RegisterDto>()

  return (
    <Stack direction={"column"} justify={"center"} align={"center"}>
      <Text fontSize={["lg", "xl", "lg", "2xl", "3xl"]} color={"white"}>
        Selamat Datang di
      </Text>
      <Text
        textColor={"white"}
        fontSize={["2xl", "3xl", "xl", "3xl", "5xl"]}
        fontWeight={"semibold"}
      >
        Kost Information to
      </Text>
      <Text
        bgGradient="linear(to-b, #FFFFFF, #07799B)"
        bgClip="text"
        fontSize={["2xl", "3xl", "2xl", "3xl", "5xl"]}
        fontWeight={"extrabold"}
        mt={"-0.5em"}
      >
        Anak baru.
      </Text>
      <Tabs variant="soft-rounded" defaultIndex={1}>
        <TabList
          justifyContent={"center"}
          bgColor={"rgba(255, 255, 255, 0.1)"}
          rounded={"2em"}
          p={"0.25em"}
          ml={"25%"}
          w={"16em"}
        >
          <Tab
            _selected={{ bgGradient: "linear(to-br, #012F98, #0178B2)" }}
            textColor={"white"}
            fontWeight={"normal"}
          >
            Pencari Kost
          </Tab>
          <Tab
            _selected={{ bgGradient: "linear(to-br, #012F98, #0178B2)" }}
            textColor={"white"}
            fontWeight={"normal"}
          >
            Pemilik Kost
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack direction={"column"}>
              <Stack direction={"row"} justify={"space-between"}>
                <Input
                  color={"white"}
                  placeholder="Nama Depan"
                  rounded={"1em"}
                  borderColor={"gray.500"}
                  bgColor={"whiteAlpha.200"}
                />
                <Input
                  color={"white"}
                  placeholder="Nama Belakang"
                  rounded={"1em"}
                  borderColor={"gray.500"}
                  bgColor={"whiteAlpha.200"}
                />
              </Stack>
              <Input
                color={"white"}
                placeholder="Email"
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              />
              <Input
                color={"white"}
                placeholder="Password"
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              />
              <Input
                color={"white"}
                placeholder="Confirm Password"
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              />

              <Stack direction={"row"}>
                <Input
                  color={"white"}
                  placeholder="Alat Kelamin"
                  rounded={"1em"}
                  borderColor={"gray.500"}
                  bgColor={"whiteAlpha.200"}
                />

                <Button
                  variant={"outline"}
                  ml={"-8em"}
                  bgColor={"#013099"}
                  rounded={"1em"}
                  textColor={"white"}
                  fontWeight={"normal"}
                  borderColor={"gray.500"}
                >
                  Upload Foto
                </Button>
              </Stack>

              <Text fontSize={"sm"} color={"whiteAlpha.500"}>
                kami yang menentukan gender anda!
              </Text>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack direction={"column"}>
              <Stack direction={"row"} justify={"space-between"}>
                <Input
                  color={"white"}
                  placeholder="Nama Depan"
                  rounded={"1em"}
                  borderColor={"gray.500"}
                  bgColor={"whiteAlpha.200"}
                />
                <Input
                  color={"white"}
                  placeholder="Nama Belakang"
                  rounded={"1em"}
                  borderColor={"gray.500"}
                  bgColor={"whiteAlpha.200"}
                />
              </Stack>
              <Input
                color={"white"}
                placeholder="Email"
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              />
              <Input
                color={"white"}
                placeholder="Password"
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              />
              <Input
                color={"white"}
                placeholder="Confirm Password"
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              />

              <Stack direction={"row"}>
                <Input
                  color={"white"}
                  placeholder="Alat Kelamin"
                  rounded={"1em"}
                  borderColor={"gray.500"}
                  bgColor={"whiteAlpha.200"}
                />

                <Button
                  variant={"outline"}
                  ml={"-8em"}
                  bgColor={"#013099"}
                  rounded={"1em"}
                  textColor={"white"}
                  fontWeight={"normal"}
                  borderColor={"gray.500"}
                >
                  Upload Foto
                </Button>
              </Stack>

              <Text fontSize={"sm"} color={"whiteAlpha.500"}>
                kami yang menentukan gender anda!
              </Text>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Stack my={"2em"} align={"center"} w={"full"}>
        {/* jangan lupa type submit */}
        <Stack direction={"row"}>
          <Text fontSize={"sm"} color={"whiteAlpha.500"}>
            Baca syarat dan ketentuan kami di
          </Text>
          <Link fontSize={"sm"} color={"white"}>
            sini
          </Link>
        </Stack>
        <Button
          w={"full"}
          type="submit"
          variant={"solid"}
          colorScheme={"blue"}
          bgGradient="linear(to-r, rgb(1, 16, 141), rgb(1, 152, 189))"
          _hover={{
            opacity: "1",
          }}
          rounded={"2xl"}
        >
          Masuk
        </Button>
        <Text color={"whiteAlpha.500"}>
          Sudah punya akun?{" "}
          <Link
            as={RouterLink}
            to={"/login"}
            color={"#017DB4"}
            textDecor={"underline"}
          >
            Masuk disini!
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};

export default RegisterPage;
