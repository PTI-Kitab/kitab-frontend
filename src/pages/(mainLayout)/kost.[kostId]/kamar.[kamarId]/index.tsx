import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "@/router";
import {
  Text,
  Stack,
  Image,
  Show,
  Icon,
  Button,
  Input,
  useToast,
  Spinner,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Tooltip,
  Heading,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLocationDot } from "react-icons/fa6";

import { Link as RouterLink } from "react-router-dom";

type KamarDto = {
  occupancy: number;
  GambarKamar: string[];
  id: number;
  namaKamar: string;
  description: string;
  harga: number;
  fasilitas: string;
  ukuran: string;
  gender: "pria" | "wanita" | "campur";
  capacity: number;
  kostId: number;
  createdAt: Date;
  updatedAt: Date;
  kost: Kost;
};

type Kost = {
  id: number;
  namaKost: string;
  alamat: string;
  pemilik: Pemilik;
};

type Pemilik = {
  firstName: string;
  lastName: string | null;
  noHp: string;
  email: string;
};

type Booking = {
  checkIn: string; // iso date
  checkOut: string; // iso date
};

const BookingSection = ({ kamar }: { kamar: KamarDto }) => {
  const api = useApi();
  const toast = useToast();
  const errorHandler = useToastErrorHandler();
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Booking>();

  return (
    <Stack>
      <Text fontSize={"3xl"}>Booking</Text>

      <Text fontWeight={"semibold"}>Ukuran Kamar</Text>
      <Text>{kamar.ukuran}</Text>
      <Text fontWeight={"semibold"}>Gender Kamar</Text>
      {/* capitalize first word */}
      <Text>
        {kamar.gender
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")}
      </Text>
      <form
        onSubmit={handleSubmit((data) => {
          api
            .post(`/client/kost/${kamar.kostId}/kamar/${kamar.id}`, {
              checkIn: new Date(data.checkIn).toISOString(),
              checkOut: new Date(data.checkOut).toISOString(),
            })
            .then(() => {
              toast({
                title: "Berhasil booking",
                description: "Silahkan cek myKost melanjutkan pembayaran",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            })
            .catch(errorHandler);
        })}
      >
        <FormControl isInvalid={!!errors.checkIn}>
          <FormLabel>Tanggal Masuk</FormLabel>
          <Input
            type="date"
            {...register("checkIn", {
              required: "Check in date harus diisi",
              min: {
                value: new Date().toISOString().split("T")[0],
                message: "Check out date harus diatas dari hari ini",
              },
            })}
          ></Input>
          <FormErrorMessage>{errors.checkIn?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.checkOut}>
          <FormLabel>Tanggal Keluar</FormLabel>
          <Input
            type="date"
            {...register("checkOut", {
              required: "Check out date harus diisi",
              // minimum check out date is 1 month
              min: {
                value: new Date(new Date().setMonth(new Date().getMonth() + 1))
                  .toISOString()
                  .split("T")[0],
                message: "Minimal booking adalah 1 bulan",
              },
            })}
          ></Input>
          <FormErrorMessage>{errors.checkOut?.message}</FormErrorMessage>
        </FormControl>

        <Tooltip
          isDisabled={
            auth.status !== "unauthenticated" &&
            kamar.capacity !== kamar.occupancy
          }
          label={
            auth.status === "unauthenticated"
              ? "Login terlebih dahulu untuk booking kamar ini"
              : "Kamar sudah penuh"
          }
        >
          <Button
            mt={"1em"}
            type="submit"
            variant={"solid"}
            colorScheme={"blue"}
            w={"full"}
            bgGradient="linear(to-r, rgb(1, 16, 141), rgb(1, 152, 189)),"
            // _hover={{
            //   opacity: "1",
            // }}
            isDisabled={
              kamar.capacity === kamar.occupancy ||
              auth.status === "unauthenticated"
            }
          >
            Booking
          </Button>
        </Tooltip>
      </form>
    </Stack>
  );
};

const KamarPage = () => {
  const api = useApi();
  const toast = useToast();
  const errorHandler = useToastErrorHandler();
  const params = useParams("/kost/:kostId/kamar/:kamarId");

  const [kamar, setKamar] = useState<KamarDto>();
  const [isLoading, setIsLoading] = useState(true);
  const [currImage, setCurrentImage] = useState(0);

  useEffect(() => {
    api
      .get<ResponseModel<KamarDto>>(
        `/client/kost/${params.kostId}/kamar/${params.kamarId}`
      )
      .then((res) => setKamar(res.data.data))
      .catch(errorHandler)
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (isLoading) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Spinner size={"xl"} color="white" />
      </Stack>
    );
  }

  if (!kamar) {
    return (
      <Stack flex={1} align={"center"} justify={"center"} color={"white"}>
        <Text>Tidak dapat menemukan kamar</Text>
      </Stack>
    );
  }

  return (
    <>
      <Stack direction={"row"}>
        <Stack flex={"2"} marginEnd={"2em"}>
          <Stack
            marginStart={["2em", "2em", "8em", "8em", "8em"]}
            my={"1em"}
            bgColor={"rgba(255, 255, 255, 0.15)"}
            backdropFilter={"blur(4px)"}
            rounded={"2xl"}
            color={"white"}
            textShadow={"md"}
            p={"1em"}
            px={["1em", "1em", "1em", "1em", "1em"]}
            position={"relative"}
          >
            <Stack>
              <Image
                src={kamar.GambarKamar[currImage]}
                fit={"cover"}
                w="100%"
                h={["16em", "16em", "24em", "24em", "24em"]}
                rounded={"xl"}
                zIndex={0}
                transition={"all 0.3s ease"}
              />

              <Stack direction={"row"} align={"center"} justify={"center"}>
                {kamar?.GambarKamar.map((gambar, index) => (
                  <Image
                    key={index}
                    src={gambar}
                    alt={"Gambar kost"}
                    w={["full", "full", "8em", "12em", "12em"]}
                    h={"5em"}
                    objectFit={"cover"}
                    rounded={"xl"}
                    onClick={() => setCurrentImage(index)}
                    cursor={"pointer"}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>

          {/* Mobile Settings */}
          <Show breakpoint="(max-width: 766px)">
            <Stack
              marginStart={["2em", "2em", "8em", "8em", "8em"]}
              my={"1em"}
              bgColor={"rgba(255, 255, 255, 0.15)"}
              backdropFilter={"blur(4px)"}
              rounded={"2xl"}
              color={"white"}
              textShadow={"md"}
              p={"1em"}
              position={"relative"}
            >
              {/* checkout */}
              <BookingSection kamar={kamar} />
            </Stack>
          </Show>

          <Stack
            marginStart={["2em", "2em", "8em", "8em", "8em"]}
            my={"1em"}
            bgColor={"rgba(255, 255, 255, 0.15)"}
            backdropFilter={"blur(4px)"}
            rounded={"2xl"}
            color={"white"}
            textShadow={"md"}
            p={"1em"}
            px={["1em", "1em", "1em", "1em", "1em"]}
            position={"relative"}
          >
            <Link
              as={RouterLink}
              to={`/kost/${params.kostId}`}
              fontWeight={"bold"}
              fontSize={"2xl"}
            >
              {kamar.kost.namaKost}
            </Link>
            <Text>
              Dikelola Oleh: {kamar.kost.pemilik.firstName}{" "}
              {kamar.kost.pemilik.lastName}
            </Text>
            <Text>Kontak: {kamar.kost.pemilik.noHp}</Text>
          </Stack>

          <Stack
            marginStart={["2em", "2em", "8em", "8em", "8em"]}
            my={"1em"}
            bgColor={"rgba(255, 255, 255, 0.15)"}
            backdropFilter={"blur(4px)"}
            rounded={"2xl"}
            color={"white"}
            textShadow={"md"}
            p={"1em"}
            // px={["1em", "1em", "1em", "4em", "4em"]}
          >
            <Text fontSize={"5xl"}>{kamar.namaKamar}</Text>
            <Stack direction={"row"} align="center" py={"0.4em"}>
              <Icon as={FaLocationDot} />
              <Text fontSize={"md"} fontWeight={"thin"}>
                {kamar.kost.alamat}
              </Text>
            </Stack>
            <Text fontSize={"3xl"}>Detail</Text>
            <div
              dangerouslySetInnerHTML={{
                __html: kamar.description,
              }}
            ></div>

            <Text fontSize={"3xl"}>Fasilitas</Text>
            <div
              dangerouslySetInnerHTML={{
                __html: kamar.fasilitas,
              }}
            ></div>
          </Stack>
        </Stack>

        {/* Desktop Settings */}
        <Show breakpoint="(min-width: 766px)">
          <Stack flex={"1"}>
            <Stack
              marginEnd={["2em", "2em", "8em", "8em", "8em"]}
              my={"1em"}
              bgColor={"rgba(255, 255, 255, 0.15)"}
              backdropFilter={"blur(4px)"}
              rounded={"2xl"}
              color={"white"}
              textShadow={"md"}
              p={"1em"}
              // top={"0"}
              // right={"0"}
              // position={""}
            >
              <BookingSection kamar={kamar} />
              {/* checkout */}
            </Stack>
          </Stack>
        </Show>
      </Stack>
    </>
  );
};

export default KamarPage;
