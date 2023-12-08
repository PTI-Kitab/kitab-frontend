import { useAuth } from "@/hooks/useAuth";
import useTitle from "@/hooks/useTitle";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom";

// 1. bikin model dto
type LoginDto = {
  email: string;
  password: string;
};

const LoginPage = () => {
  useTitle("KITAB - Login");
  // const navigate = useNavigate();
  const auth = useAuth();

  const [showPass, setShowPass] = useState(false);

  // 2. bikin form, masukin dto sebagai generic
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginDto>();

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

      <Stack my={"2em"} w={"full"}>
        <Text color={"whiteAlpha.500"} textAlign={"center"}>
          Silahkan login terlebih dahulu
        </Text>

        {/* bikin form */}
        <Stack
          as={"form"}
          w={"full"}
          gap={"1em"}
          onSubmit={handleSubmit((data) => {
            auth.login(data.email, data.password);
          })}
        >
          {/* 3. isInvalid form control */}
          <FormControl isInvalid={!!errors.email}>
            {/* 4. register input */}
            <Input
              {...register("email", {
                required: "Email tidak boleh kosong",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Bentuk email tidak valid",
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
          <FormControl isInvalid={!!errors.password}>
            <InputGroup>
              <Input
                {...register("password", {
                  required: "Password tidak boleh kosong",
                  minLength: {
                    value: 8,
                    message: "Password minimal 8 karakter",
                  },
                })}
                type={showPass ? "text" : "password"}
                color={"white"}
                placeholder="Password"
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              />

              <InputRightElement>
                {showPass ? (
                  <Icon
                    as={FaEyeSlash}
                    cursor={"pointer"}
                    color={"white"}
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <Icon
                    as={FaEye}
                    cursor={"pointer"}
                    color={"white"}
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/* gimmick */}
          <Checkbox color={"whiteAlpha.500"} borderColor={"gray.500"}>
            Ingat saya
          </Checkbox>

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
              Masuk
            </Button>
            <Text color={"whiteAlpha.500"}>
              Belum punya akun?{" "}
              <Link
                as={RouterLink}
                to={"/register"}
                color={"#017DB4"}
                textDecor={"underline"}
              >
                Daftar disini!
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
