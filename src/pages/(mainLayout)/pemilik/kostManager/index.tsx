import CKEditorWrapper from "@/components/CKEditor";
import DropZone from "@/components/DropZone";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Text,
  Stack,
  Button,
  useToast,
  Tooltip,
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
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

type KostListing = {
  id: number;
  namaKost: string;
  GambarKost: string;
};

// "namaKost",
//   "description",
//   "alamat",
//   "latitude",
//   "longitude",
//   "pembayaran",
//   "GambarKost",

type KostDto = {
  namaKost: string;
  description: string;
  alamat: string;
  latitude: string;
  longitude: string;
  bank: "bca" | "bni" | "bri" | "mandiri";
  pembayaran: string;
  GambarKost: File[];
};

const KostCard = ({ kost }: { kost: KostListing }) => {
  return (
    <Stack
      as={RouterLink}
      to={`/pemilik/kostManager/${kost.id}`}
      minH={"8em"}
      direction={"row"}
      align={"center"}
      justify={"space-between"}
      bgColor={"whiteAlpha.200"}
      rounded={"2xl"}
      p={"1em"}
      pos={"relative"}
      bgImage={kost.GambarKost}
      bgSize={"cover"}
      bgPos={"center"}
      cursor={"pointer"}
    >
      {/* shade overlay */}
      <Stack
        pos={"absolute"}
        w={"full"}
        h={"full"}
        left={0}
        bgGradient={
          "linear(to-r, blackAlpha.900, blackAlpha.600, blackAlpha.400, transparent)"
        }
        transition={"all 0.2s ease"}
        _hover={{
          bgColor: "blackAlpha.800",
        }}
        rounded={"2xl"}
      />

      <Stack zIndex={2} p={"1em"}>
        <Text fontWeight={"semibold"} fontSize={"3xl"} textColor={"white"}>
          {kost.namaKost}
        </Text>
      </Stack>
    </Stack>
  );
};

const KostManagerPage = () => {
  const auth = useAuth();
  const api = useApi();
  const handleError = useToastErrorHandler();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<KostDto>();

  const [kostListing, setKostListing] = useState<KostListing[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchKostListing = () => {
    api
      .get<ResponseModel<KostListing[]>>("/kostManager")
      .then((res) => {
        setKostListing(res.data.data);
      })
      .catch(handleError)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (auth.status === "authenticated") {
      fetchKostListing();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // reset form when modal is closed
  useEffect(() => {
    reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (isLoading) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Spinner color="white" size={"xl"} />
      </Stack>
    );
  }

  return (
    <Stack direction={"column"} justify={"space-between"} h={"full"}>
      <Stack direction={"row"} justify={"space-between"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          Kost Manager
        </Text>

        <Tooltip
          label="Listing kost tidak bisa melebihi dari 3, hapus salah satu kost untuk menambah kost baru"
          isDisabled={kostListing.length !== 3}
        >
          <Button
            rounded={"2xl"}
            isDisabled={kostListing.length === 3}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Buat Baru
          </Button>
        </Tooltip>
      </Stack>
      <Stack direction={"column"} gap={"1em"} flex={1} my={"1em"}>
        {!kostListing.length && (
          <>
            <Stack
              flex={1}
              direction={"row"}
              align={"center"}
              justify={"center"}
            >
              <Text textAlign={"center"}>Belum ada listing kost</Text>
              <Tooltip label="Klik tombol Buat Baru apabila anda ingin menambahkan Kost baru.">
                <InfoIcon />
              </Tooltip>
            </Stack>
          </>
        )}

        {kostListing.map((kost) => (
          <KostCard kost={kost} />
        ))}
      </Stack>
      <Text>Pemilik hanya bisa memiliki 3 listing kost</Text>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Kost Baru</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={handleSubmit((data) => {
              // upload images
              const formData = new FormData();
              data.GambarKost.forEach((file) => {
                formData.append("files", file);
              });

              api
                .post<ResponseModel<string[]>>("/upload/", formData)
                .then((res) => {
                  api
                    .post("/kostManager/", {
                      ...data,
                      GambarKost: res.data.data,
                    })
                    .then(() => {
                      toast({
                        title: "Kost berhasil dibuat",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch(handleError)
                    .finally(() => {
                      fetchKostListing();
                      setIsOpen(false);
                      reset();
                    });
                })
                .catch(handleError)
                .finally(() => {
                  setIsOpen(false);
                  reset();
                });
            })}
          >
            <ModalBody>
              <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
                General
              </Text>
              <FormControl my={"1em"} isInvalid={!!errors.namaKost}>
                <FormLabel>Nama Kost</FormLabel>
                <Input
                  {...register("namaKost", {
                    required: "Nama Kost harus diisi",
                    minLength: {
                      value: 3,
                      message: "Nama Kost minimal 3 karakter",
                    },
                    maxLength: {
                      value: 255,
                      message: "Nama Kost maksimal 50 karakter",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.namaKost && errors.namaKost.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl my={"1em"} isInvalid={!!errors.description}>
                <FormLabel>Deskripsi</FormLabel>
                <CKEditorWrapper control={control} name="description" />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
                Lokasi
              </Text>
              <FormControl my={"1em"} isInvalid={!!errors.alamat}>
                <FormLabel>Alamat</FormLabel>
                <Input
                  {...register("alamat", {
                    required: "Alamat harus diisi",
                    minLength: {
                      value: 3,
                      message: "Alamat minimal 3 karakter",
                    },
                    maxLength: {
                      value: 255,
                      message: "Alamat maksimal 50 karakter",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.alamat && errors.alamat.message}
                </FormErrorMessage>
              </FormControl>

              <Stack direction={["column", "column", "row", "row", "row"]}>
                <FormControl my={"1em"} isInvalid={!!errors.latitude}>
                  <FormLabel>Latitude</FormLabel>
                  <Input
                    {...register("latitude", {
                      required: "Latitude harus diisi",
                      minLength: {
                        value: 3,
                        message: "Latitude minimal 3 karakter",
                      },
                      maxLength: {
                        value: 50,
                        message: "Latitude maksimal 50 karakter",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.latitude && errors.latitude.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl my={"1em"} isInvalid={!!errors.longitude}>
                  <FormLabel>Longitude</FormLabel>
                  <Input
                    {...register("longitude", {
                      required: "Longitude harus diisi",
                      minLength: {
                        value: 3,
                        message: "Longitude minimal 3 karakter",
                      },
                      maxLength: {
                        value: 50,
                        message: "Longitude maksimal 50 karakter",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.longitude && errors.longitude.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
                Pembayaran
              </Text>
              <FormControl my={"1em"} isInvalid={!!errors.bank}>
                <FormLabel>Bank</FormLabel>
                <Controller
                  control={control}
                  name="bank"
                  rules={{
                    required: "Bank harus diisi",
                  }}
                  render={({ field }) => (
                    <Select {...field} placeholder="Pilih Bank">
                      <option value="bca">BCA</option>
                      <option value="bni">BNI</option>
                      <option value="bri">BRI</option>
                      <option value="mandiri">Mandiri</option>
                    </Select>
                  )}
                />

                <FormErrorMessage>
                  {errors.bank && errors.bank.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl my={"1em"} isInvalid={!!errors.pembayaran}>
                <FormLabel>Nomor Rekening</FormLabel>
                <Input
                  {...register("pembayaran", {
                    required: "Nomor Rekening harus diisi",
                    minLength: {
                      value: 3,
                      message: "Nomor Rekening minimal 3 karakter",
                    },
                    maxLength: {
                      value: 50,
                      message: "Nomor Rekening maksimal 50 karakter",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.pembayaran && errors.pembayaran.message}
                </FormErrorMessage>
              </FormControl>

              <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
                Gambar Kost
              </Text>
              <FormControl my={"1em"} isInvalid={!!errors.GambarKost}>
                <FormLabel>Gambar Kost (Max. 5 File)</FormLabel>
                <DropZone
                  control={control}
                  name="GambarKost"
                  rules={{
                    required: "Gambar Kost harus diisi",
                  }}
                />
                <FormErrorMessage>
                  {errors.GambarKost && errors.GambarKost.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit">Buat</Button>
              <Button
                ml={3}
                onClick={() => {
                  reset();
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default KostManagerPage;
