import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useParams } from "@/router";
import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Portal,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom";

type Payment = {
  id: string;
  status: boolean;
  paidDate: Date | null;
};

type Kamar = {
  id: number;
  namaKamar: string;
  harga: number;
  GambarKamar: string;
  gender: string;
};

type DetailBooking = {
  id: number;
  checkIn: string;
  checkOut: string;
  status: "pending" | "confirmed" | "canceled" | "done";
  clientId: number;
  kamarId: number;
  createdAt: string;
  updatedAt: string;
  kamar: Kamar;
  Payment: Payment[];
};

type PaymentRequest = {
  payment: {
    id: string;
    status: boolean;
    paidDate: string | null;
    bookingId: number;
    createdAt: string;
    updatedAt: string;
  };
  midtrans: {
    token: string;
    redirect_url: string;
  };
};

// ngadi ngadi dikit ga ngaruh
type SnapSuccess = {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  payment_code: string;
  pdf_url: string;
  finish_redirect_url: string;
};

type SnapError = {
  status_code: string;
  status_message: string[];
};
type Snap = {
  pay: (
    token: string,
    {
      onSuccess,
      onPending,
      onError,
      onClose,
    }: {
      onSuccess?: (result: SnapSuccess) => void;
      onPending?: (result: SnapSuccess) => void;
      onError?: (result: SnapError) => void;
      onClose?: () => void;
    }
  ) => void;
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: Record<string, any>;
    snap: Snap;
  }
}

const PaymentCard = ({ payment }: { payment: Payment }) => {
  return (
    <Stack
      bgColor={"whiteAlpha.200"}
      p={"1em"}
      rounded={"xl"}
      direction={"row"}
      justify={"space-between"}
    >
      <Stack direction={"column"}>
        <Text fontWeight={"bold"}>#{payment.id}</Text>
        <Text>
          {payment.paidDate
            ? new Date(payment.paidDate).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
            : "Belum dibayar"}
        </Text>
      </Stack>
      <Stack align={"center"} justify={"center"}>
        <Text fontWeight={"bold"}>
          {payment.status ? "Lunas" : "Belum Lunas"}
        </Text>
      </Stack>
    </Stack>
  );
};

const BookingDetailsPage = () => {
  const api = useApi();
  const toastErrorHandler = useToastErrorHandler();
  const toast = useToast();
  const auth = useAuth();
  const params = useParams("/client/myKost/:id");
  const nav = useNavigate();

  // buttonref
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteModal = useDisclosure();

  const [detailBooking, setDetailBooking] = useState<DetailBooking | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const fetchDetailBooking = () => {
    setLoading(true);
    api
      .get<ResponseModel<DetailBooking>>(`/myKost/booking/${params.id}`)
      .then(({ data }) => {
        setDetailBooking(data.data);
      })
      .catch(toastErrorHandler)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (auth.status === "authenticated") {
      fetchDetailBooking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, auth]);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.async = true;
    // data client key
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Stack direction={"column"} h={"full"}>
      <Button
        as={RouterLink}
        to={`/client/myKost`}
        leftIcon={<ArrowBackIcon />}
        w={"fit-content"}
        variant={"unstyled"}
        display={"flex"}
        fontWeight={"normal"}
      >
        Kembali
      </Button>
      <Stack direction={"row"} align={"center"} justify={"space-between"}>
        <Stack direction={"row"} align={"center"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Detail Booking
          </Text>
          <Tooltip label={"Page ini menunjukkan detail booking kost mu"}>
            <InfoIcon />
          </Tooltip>
        </Stack>

        <Tooltip
          isDisabled={["confirmed", "done"].includes(
            detailBooking?.status || ""
          )}
          label={
            detailBooking?.status === "canceled"
              ? "Booking telah dibatalkan sebelumnya"
              : "Batalkan booking ini"
          }
        >
          <IconButton
            rounded={"xl"}
            aria-label="batalkan booking"
            icon={<FaXmark />}
            onClick={deleteModal.onOpen}
            isDisabled={["confirmed", "done", "canceled"].includes(
              detailBooking?.status || ""
            )}
          />
        </Tooltip>
      </Stack>
      {!detailBooking && (
        <Stack
          direction={"column"}
          align={"center"}
          justify={"center"}
          flex={1}
        >
          {loading && (
            <>
              <Spinner alignSelf={"center"} thickness={"4px"} speed={"0.65s"} />
              <Text textAlign={"center"} fontSize={"xl"}>
                Loading...
              </Text>
            </>
          )}

          {!loading && !detailBooking && (
            <Text textAlign={"center"} fontSize={"xl"}>
              Booking tidak ditemukan
            </Text>
          )}
        </Stack>
      )}

      {detailBooking && (
        <Stack my={"1em"} bgColor={"whiteAlpha.200"} p={"2em"} rounded={"2xl"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Detail Kamar
          </Text>
          <Table textColor={"white"} variant={"simple"} colorScheme="blue">
            <Tbody>
              <Tr>
                <Td>Nama Kamar</Td>
                <Td>{detailBooking.kamar.namaKamar}</Td>
              </Tr>
              <Tr>
                <Td>Gender</Td>
                <Td>{detailBooking.kamar.gender.toUpperCase()}</Td>
              </Tr>
              <Tr>
                <Td>Harga</Td>
                <Td>
                  {detailBooking.kamar.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Td>
              </Tr>
              <Tr>
                <Td>Tangal Check In</Td>
                <Td>
                  {new Date(detailBooking.checkIn).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </Td>
              </Tr>
              <Tr>
                <Td>Tangal Check Out</Td>
                <Td>
                  {new Date(detailBooking.checkOut).toLocaleDateString(
                    "id-ID",
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Button
            rounded={"xl"}
            mt={"1em"}
            isDisabled={["confirmed", "done", "canceled"].includes(
              detailBooking?.status || ""
            )}
            onClick={() => {
              api
                .put<ResponseModel<PaymentRequest>>(
                  `/myKost/booking/${params.id}/payment`
                )
                .then(({ data }) => {
                  window.snap.pay(data.data.midtrans.token, {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onSuccess: (result) => {
                      api.post("/myKost/booking/payment/callback", {
                        transaction_status: result.transaction_status,
                        order_id: result.order_id,
                      });
                      toast({
                        title: "Success",
                        description: "Pembayaran berhasil",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                      fetchDetailBooking();
                    },
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onPending: (_result) => {
                      toast({
                        title: "Success",
                        description: "Pembayaran berhasil",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                      fetchDetailBooking();
                    },
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onError: (_result) => {
                      toast({
                        title: "Error",
                        description: "Pembayaran gagal, silahkan coba lagi",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                      fetchDetailBooking();
                    },
                    onClose: () => {
                      toast({
                        title: "Error",
                        description:
                          "Pembayaran dibatalkan, silahkan coba lagi",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                      fetchDetailBooking();
                    },
                  });
                });
            }}
          >
            {detailBooking.status === "pending"
              ? "Bayar Sekarang"
              : detailBooking.status === "canceled"
              ? "Booking Dibatalkan"
              : "Bayar Sekarang"}
          </Button>
        </Stack>
      )}

      <Stack my={"1em"} bgColor={"whiteAlpha.200"} p={"2em"} rounded={"2xl"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          Riwayat Pembayaran
        </Text>

        <Stack direction={"column"} spacing={"1em"}>
          {detailBooking?.Payment.length === 0 && (
            <Text>Belum ada pembayaran</Text>
          )}
          {detailBooking?.Payment.map((p) => (
            <PaymentCard payment={p} />
          ))}
        </Stack>
      </Stack>

      <Portal>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Batalkan Booking #{params.id}
              </AlertDialogHeader>

              <AlertDialogBody>
                Apakah anda yakin untuk menghapus booking ini?.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={deleteModal.onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    api
                      .delete(`/myKost/booking/${params.id}`)
                      .then(() => {
                        toast({
                          title: "Success",
                          description: "Booking berhasil dibatalkan",
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        });
                        deleteModal.onClose();
                        nav;
                      })
                      .catch(toastErrorHandler);
                  }}
                  ml={3}
                >
                  Hapus
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Portal>
    </Stack>
  );
};

export default BookingDetailsPage;
