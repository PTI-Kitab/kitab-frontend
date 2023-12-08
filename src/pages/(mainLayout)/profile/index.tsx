import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import useTitle from "@/hooks/useTitle";
import { useNavigate } from "@/router";
import {
  Text,
  Avatar,
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  useToast,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

type ProfileDto = {
  firstName: string;
  lastName: string;
  noHp: string;
  email: string;
  gender: "pria" | "wanita";
  password: string;
};

const UserProfile = () => {
  useTitle("KITAB - Edit Profil");
  // hooks
  const auth = useAuth();
  const navigate = useNavigate();
  const api = useApi();
  const toast = useToast();
  const handleError = useToastErrorHandler();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<Partial<ProfileDto>>();

  const {
    handleSubmit: handleSubmitPassword,
    register: registerPassword,
    formState: { errors: errorsPassword },
  } = useForm<Pick<ProfileDto, "password">>();

  // state
  const [modalState, setModalState] = useState<Partial<ProfileDto> | null>(
    null
  );

  console.log(modalState);

  // effect
  useEffect(() => {
    if (auth.status === "unauthenticated") {
      toast({
        title: "Error",
        description: "Anda belum masuk, silahkan masuk terlebih dahulu",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    }

    if (auth.status === "authenticated") {
      api
        .get<
          ResponseModel<
            ProfileDto & { id: number; balance: number; role: string }
          >
        >("/users/profile")
        .then((res) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, balance, role, ...data } = res.data.data;
          reset(data);
        })
        .catch(handleError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Stack
      flex={1}
      align={"center"}
      justify={"center"}
      px={["2em", "2em", "8em", "16em", "24em"]}
      my={"1em"}
    >
      <Stack
        minH={"50vh"}
        w={"full"}
        direction={"column"}
        bgColor={"whiteAlpha.200"}
        backdropFilter={"blur(6px)"}
        rounded={"2xl"}
        p={"2em"}
      >
        <Text fontWeight={"semibold"} fontSize={"2xl"} color={"white"}>
          Edit Profil
        </Text>

        <Stack
          direction={"column"}
          // w={"full"}
          my={"1em"}
          mx={"2em"}
          align={"center"}
          justify={"center"}
        >
          <Avatar
            src={`https://api.multiavatar.com/${auth.user?.firstName}.svg`}
            size={"2xl"}
          />

          <form
            onSubmit={handleSubmit((data) => {
              if (data.password === "") {
                delete data.password;
              }

              setModalState(data);
            })}
          >
            <Stack
              direction={["column", "column", "row", "row", "row"]}
              my={"0.5em"}
            >
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel color={"white"}>Nama Depan</FormLabel>
                <Input
                  {...register("firstName", {
                    required: "First Name tidak boleh kosong",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Nama depan harus berbentuk alfabet tanpa spasi",
                    },
                    minLength: {
                      value: 3,
                      message: "Nama depan minimal 3 karakter",
                    },
                    maxLength: {
                      value: 255,
                      message: "Nama depan maksimal 255 karakter",
                    },
                    // value: user?.firstName,
                  })}
                  color={"white"}
                  rounded={"1em"}
                  borderColor={"gray.500"}
                  bgColor={"whiteAlpha.200"}
                ></Input>
                <FormErrorMessage>
                  {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel color={"white"}>Nama Belakang</FormLabel>
                <Input
                  {...register("lastName", {
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        "Nama belakang harus berbentuk alfabet tanpa spasi",
                    },
                    minLength: {
                      value: 3,
                      message: "Nama belakang minimal 3 karakter",
                    },
                    maxLength: {
                      value: 255,
                      message: "Nama belakang maksimal 255 karakter",
                    },
                    // value: user?.lastName,
                  })}
                  color={"white"}
                  rounded={"1em"}
                  borderColor={"gray.500"}
                  bgColor={"whiteAlpha.200"}
                ></Input>
                <FormErrorMessage>
                  {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>

            <FormControl my={"0.5em"} isInvalid={!!errors.email}>
              <FormLabel color={"white"}>Email</FormLabel>
              <Input
                {...register("email", {
                  required: "Email tidak boleh kosong",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Bentuk email tidak valid",
                  },
                  // value: user?.email,
                })}
                color={"white"}
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              ></Input>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl my={"0.5em"} isInvalid={!!errors.noHp}>
              <FormLabel color={"white"}>No. Handphone</FormLabel>
              <Input
                {...register("noHp", {
                  required: "No. Handphone tidak boleh kosong",
                  pattern: {
                    value: /^(\\+62|62|0)8[1-9][0-9]{6,9}$/,
                    message: "Bentuk No. Handphone tidak valid",
                  },
                  // value: user?.noHp,
                })}
                color={"white"}
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              ></Input>
              <FormErrorMessage>
                {errors.noHp && errors.noHp.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl my={"0.5em"} isInvalid={!!errors.gender}>
              <FormLabel color={"white"}>Gender</FormLabel>
              <Controller
                control={control}
                name="gender"
                // rules={{
                //   required: "Gender harus dipilih",
                // }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    color={"white"}
                    bgColor={"whiteAlpha.200"}
                    rounded={"1em"}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    name={name}
                    value={value}
                  >
                    <option value={"pria"}>Pria</option>
                    <option value={"wanita"}>Wanita</option>
                  </Select>
                )}
              />
              <FormErrorMessage>
                {errors.gender && errors.gender.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl my={"0.5em"} isInvalid={!!errors.password}>
              <FormLabel color={"white"}>Password Baru</FormLabel>
              <Input
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password minimal 8 karakter",
                  },
                  maxLength: {
                    value: 255,
                    message: "Password maksimal 255 karakter",
                  },
                })}
                placeholder="Buat password baru"
                color={"white"}
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
              ></Input>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Stack align={"center"} mt={"2em"}>
              <Button
                type="submit"
                w={"fit-content"}
                color={"white"}
                _hover={{
                  opacity: "1",
                }}
                bgGradient="linear(to-r, rgb(1, 16, 141), rgb(1, 152, 189))"
              >
                Perbaharui
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>

      <Modal isOpen={!!modalState} onClose={() => setModalState(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi Edit Profil</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={handleSubmitPassword((data) => {
              api
                .post<ResponseModel>("/auth/login", {
                  email: auth.user?.email,
                  password: data.password,
                })
                .then(() => {
                  api
                    .put("/users/profile", modalState)
                    .then(() =>
                      toast({
                        title: "Berhasil",
                        description: "Profil berhasil diubah",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      })
                    )
                    .catch(handleError)
                    .finally(() => setModalState(null));
                })
                .catch(handleError)
                .finally(() => setModalState(null));
            })}
          >
            <ModalBody>
              <Text>
                Untuk mengubah profil, anda perlu mengkonfirmasi password anda.
              </Text>
              <FormControl isInvalid={!!errorsPassword.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...registerPassword("password", {
                    required: "Password tidak boleh kosong",
                    minLength: {
                      value: 8,
                      message: "Password minimal 8 karakter",
                    },
                  })}
                  type={"password"}
                />
                <FormErrorMessage>
                  {errorsPassword.password && errorsPassword.password.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit">Ubah</Button>
              <Button ml={3} onClick={() => setModalState(null)}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default UserProfile;
