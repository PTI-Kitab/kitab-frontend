import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import useTitle from "@/hooks/useTitle";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Text,
  Stack,
  Tooltip,
  Button,
  ListItem,
  UnorderedList,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type UserBalance = {
  balance: number;
};

const PayoutPage = () => {
  useTitle("KITAB - Payout");
  const auth = useAuth();
  const api = useApi();
  const toast = useToast();
  const handleError = useToastErrorHandler();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ password: string }>();

  const [balance, setBalance] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (auth.status === "authenticated") {
      api
        .get<ResponseModel<UserBalance>>("/users/profile")
        .then((res) => {
          setBalance(res.data.data.balance);
        })
        .catch(handleError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Stack direction={"column"} h={"full"}>
      <Stack direction={"row"} justify={"space-between"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          Payout
        </Text>
      </Stack>

      <Stack
        rounded={"2xl"}
        bgColor={"whiteAlpha.200"}
        justify={"space-between"}
        align={"center"}
        p={"2em"}
        my={"1em"}
        color={"white"}
        gap={0}
        direction={["column", "column", "row", "row", "row"]}
      >
        <Stack gap={0} my={"1em"}>
          <Stack direction={"row"} align={"center"}>
            <Text>Saldo Tersedia</Text>
            <Tooltip
              label="Saldo anda berasal dari semua transaksi yang telah di potong pajak sebesar 10% di setiap transaksinya."
              rounded={"xl"}
            >
              <InfoIcon />
            </Tooltip>
          </Stack>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {
              // indonesian rupiah
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(balance)
            }
          </Text>
        </Stack>

        <Button
          onClick={() => {
            if (balance < 10000) {
              toast({
                title: "Error",
                description:
                  "Saldo anda tidak mencukupi untuk melakukan penarikan dana.",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              return;
            }

            setIsOpen(true);
          }}
        >
          Tarik Dana
        </Button>
      </Stack>

      <UnorderedList>
        <ListItem>
          Minimal saldo untuk penarikan dana adalah Rp. 10.000,00
        </ListItem>
        <ListItem>
          Sebelum melakukan penarikan dana, pastikan anda telah mengisi dan
          melengkapi data rekening payout di masing-masing kost yang anda
          miliki.
        </ListItem>
        <ListItem>
          Apabila anda membutuhkan bantuan mengenai penarikan dana, silahkan
          hubungi hotline kami.
        </ListItem>
      </UnorderedList>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Penarikan Dana</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={handleSubmit((data) => {
              api
                .post<ResponseModel>("/auth/login", {
                  email: auth.user?.email,
                  password: data.password,
                })
                .then(() => {
                  api
                    .post("/payout/")
                    .then(() =>
                      toast({
                        title: "Berhasil",
                        description: "Berhasil melakukan penarikan dana",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      })
                    )
                    .catch(handleError)
                    .finally(() => setIsOpen(false));
                })
                .catch(handleError)
                .finally(() => setIsOpen(false));
            })}
          >
            <ModalBody>
              <Text>
                Untuk melakukan penarikan uang, kami perlu mengkonfirmasi
                password anda.
              </Text>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register("password", {
                    required: "Password tidak boleh kosong",
                    minLength: {
                      value: 8,
                      message: "Password minimal 8 karakter",
                    },
                  })}
                  type={"password"}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit">Tarik Dana</Button>
              <Button ml={3} onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default PayoutPage;
