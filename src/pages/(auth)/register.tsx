import useApi, { useToastErrorHandler } from "@/hooks/useApi";
import useTitle from "@/hooks/useTitle";
import { useNavigate } from "@/router";
import {
  Text,
  Stack,
  Link,
  Input,
  Button,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Select,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

type RegisterDto = {
  firstName: string;
  lastName: string;
  noHp: string;
  email: string;
  gender: "pria" | "wanita";
  password: string;
};

const RegisterPanel = ({
  type,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: "client" | "pemilik";
}) => {
  useTitle("KITAB - Register");
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<
    RegisterDto & {
      type: "client" | "pemilik";
      confirmPassword: string;
    }
  >();

  const api = useApi();
  const navigate = useNavigate();
  const toast = useToast();
  const handleError = useToastErrorHandler();

  useEffect(() => {
    setValue("type", type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <form
      onSubmit={handleSubmit((dataRaw) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, type, ...data } = dataRaw;
        if (dataRaw.type === "client") {
          api
            .post("/auth/register/client", data)
            .then(() => {
              toast({
                title: "Berhasil mendaftar",
                description: "Silahkan login untuk melanjutkan",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              navigate("/login");
            })
            .catch(handleError);
          return;
        }

        api
          .post("/auth/register/pemilik", data)
          .then(() => {
            toast({
              title: "Berhasil mendaftar",
              description: "Silahkan login untuk melanjutkan",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            navigate("/login");
          })
          .catch(handleError);
      })}
    >
      <Stack direction={"column"}>
        <Stack direction={"row"} justify={"space-between"}>
          <FormControl isInvalid={!!errors.firstName}>
            <Input
              {...register("firstName", {
                required: "Nama Depan harus diisi",
                minLength: {
                  value: 3,
                  message: "Nama Depan minimal 3 karakter",
                },
                maxLength: {
                  value: 20,
                  message: "Nama Depan maksimal 20 karakter",
                },
              })}
              color={"white"}
              placeholder="Nama Depan"
              rounded={"1em"}
              borderColor={"gray.500"}
              bgColor={"whiteAlpha.200"}
            />
            <FormErrorMessage>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.lastName}>
            <Input
              {...register("lastName", {})}
              color={"white"}
              placeholder="Nama Belakang"
              rounded={"1em"}
              borderColor={"gray.500"}
              bgColor={"whiteAlpha.200"}
            />
            <FormErrorMessage>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <FormControl isInvalid={!!errors.email}>
          <Input
            {...register("email", {
              required: "Email harus diisi",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email tidak valid",
              },
            })}
            color={"white"}
            placeholder="Email"
            rounded={"1em"}
            borderColor={"gray.500"}
            bgColor={"whiteAlpha.200"}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.noHp}>
          <Input
            {...register("noHp", {
              required: "Nomor HP harus diisi",
              pattern: {
                value: /^(\\+62|62|0)8[1-9][0-9]{6,9}$/,
                message: "Nomor HP tidak valid",
              },
            })}
            color={"white"}
            placeholder="No. Handphone"
            rounded={"1em"}
            borderColor={"gray.500"}
            bgColor={"whiteAlpha.200"}
          />
          <FormErrorMessage>
            {errors.noHp && errors.noHp.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <Input
            {...register("password", {
              required: "Password harus diisi",
              minLength: {
                value: 8,
                message: "Password minimal 8 karakter",
              },
              maxLength: {
                value: 20,
                message: "Password maksimal 20 karakter",
              },
            })}
            color={"white"}
            placeholder="Password"
            rounded={"1em"}
            borderColor={"gray.500"}
            bgColor={"whiteAlpha.200"}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <Input
            {...register("confirmPassword", {
              required: "Konfirmasi password harus diisi",
              minLength: {
                value: 8,
                message: "Konfirmasi password minimal 8 karakter",
              },
              maxLength: {
                value: 20,
                message: "Konfirmasi password maksimal 20 karakter",
              },
              validate: (value) =>
                value === getValues("password") ||
                "Konfirmasi password tidak sama dengan password",
            })}
            color={"white"}
            placeholder="Confirm Password"
            rounded={"1em"}
            borderColor={"gray.500"}
            bgColor={"whiteAlpha.200"}
          />
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.gender}>
          <Controller
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            control={control as any}
            name="gender"
            rules={{
              required: "Jenis Kelamin harus diisi",
            }}
            render={({ field }) => (
              <Select
                {...field}
                color={"white"}
                placeholder="Jenis Kelamin"
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              >
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
              </Select>
            )}
          />
          <FormErrorMessage>
            {errors.gender && errors.gender.message}
          </FormErrorMessage>
        </FormControl>

        <Text fontSize={"sm"} color={"whiteAlpha.500"}>
          Baca syarat dan ketentuan kami di{" "}
          <Link
            as={RouterLink}
            to={"/terms"}
            color={"#017DB4"}
            textDecor={"underline"}
          >
            sini
          </Link>
        </Text>

        <Stack my={"2em"} align={"center"} w={"full"}>
          {/* jangan lupa type submit */}
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
            Daftar
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
    </form>
  );
};

const RegisterPage = () => {
  return (
    <Stack direction={"column"} justify={"center"} align={"center"}>
      <Text fontSize={["lg", "xl", "lg", "2xl", "3xl"]} color={"white"}>
        Selamat Datang di
      </Text>
      <Text
        textColor={"white"}
        fontSize={["2xl", "3xl", "xl", "3xl", "3xl"]}
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

      <Tabs
        variant="soft-rounded"
        defaultIndex={0}
        // display={"flex"}
        align="center"
        // justifyContent={"center"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <TabList
          justifyContent={"center"}
          bgColor={"rgba(255, 255, 255, 0.1)"}
          rounded={"2em"}
          p={"0.25em"}
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
            <RegisterPanel type="client" />
          </TabPanel>
          <TabPanel>
            <RegisterPanel type="pemilik" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default RegisterPage;
