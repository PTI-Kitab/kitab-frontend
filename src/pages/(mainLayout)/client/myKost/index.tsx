import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { Badge, Box, Heading, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InfoIcon } from "@chakra-ui/icons";

type Booking = {
  id: number;
  kamar: Kamar;
  Payment: Payment[];
  checkIn: Date;
  checkOut: Date;
  status: "pending" | "confirmed" | "canceled" | "done";
  createdAt: Date;
  updatedAt: Date;
};

type Payment = {
  id: string;
  status: boolean;
  paidDate: Date | null;
};

type Kamar = {
  id: number;
  namaKamar: string;
  harga: number;
};

const BookingCards = ({ booking }: { booking: Booking }) => {
  return (
    <Stack
      as={RouterLink}
      to={`/client/myKost/${booking.id}`}
      w={"full"}
      bgColor={"whiteAlpha.200"}
      p={"1em"}
      rounded={"xl"}
      direction={"row"}
      justify={"space-between"}
    >
      <Stack direction={"column"}>
        <Heading size={"md"}>{booking.kamar.namaKamar}</Heading>
        <Text>
          {new Date(booking.checkIn).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}{" "}
          -{" "}
          {new Date(booking.checkIn).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </Text>
      </Stack>
      <Stack>
        <Text fontWeight={"bold"}>
          {booking.kamar.harga.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </Text>
        <Stack
          bgColor={
            booking.status === "pending"
              ? "yellow.600"
              : booking.status === "confirmed"
              ? "green.600"
              : booking.status === "canceled"
              ? "red.600"
              : "gray.600"
          }
          align={"center"}
          justify={"center"}
          rounded={"xl"}
        >
          <Text fontSize={"sm"}>{booking.status.toUpperCase()}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

const MyKostanPage = () => {
  const api = useApi();
  const toastErrorHandler = useToastErrorHandler();
  const auth = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (auth.status === "authenticated") {
      api
        .get<ResponseModel<Booking[]>>("/myKost/booking")
        .then((res) => setBookings(res.data.data))
        .catch(toastErrorHandler)
        .finally(() => setIsLoading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Stack direction={"column"} justify={"space-between"} h={"full"}>
      <Stack direction={"row"} align={"center"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          Bookings
        </Text>
        <Tooltip label={"Berikut ini adalah riwayat booking mu"}>
          <InfoIcon />
        </Tooltip>
      </Stack>

      <Stack direction={"column"} flex={1}>
        {isLoading && (
          <Text textAlign={"center"} fontSize={"xl"}>
            Loading...
          </Text>
        )}
        {!isLoading && bookings.length === 0 && (
          <Text textAlign={"center"} fontSize={"xl"}>
            Belum ada booking
          </Text>
        )}

        {bookings.map((booking) => (
          <BookingCards booking={booking} />
        ))}
      </Stack>
    </Stack>
  );
};

export default MyKostanPage;
