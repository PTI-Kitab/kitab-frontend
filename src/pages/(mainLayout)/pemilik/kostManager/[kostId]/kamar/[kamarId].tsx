import CKEditorWrapper from "@/components/CKEditor";
import DropZone from "@/components/DropZone";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useParams } from "@/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Spinner,
  Stack,
  Text,
  useToast,
  Image,
  ModalOverlay,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom";

type Kamar = {
  GambarKamar: string[];
  id: number;
  description: string;
  gender: "pria" | "wanita" | "campur";
  updatedAt: Date;
  namaKamar: string;
  harga: number;
  fasilitas: string;
  ukuran: string;
  capacity: number;
  kostId: number;
};

type ModalState = {
  mode: "edit" | "delete";
  kamar: Kamar;
};

type KamarDto = {
  namaKamar: string;
  description: string;
  harga: number;
  fasilitas: string;
  ukuran: string;
  capacity: number;
  gender: "pria" | "wanita" | "campur";
  GambarKamar: File[];
};

const SettingKamarPage = () => {
  const auth = useAuth();
  const api = useApi();
  const toast = useToast();
  const errorHandler = useToastErrorHandler();
  const { kostId, kamarId } = useParams(
    "/pemilik/kostManager/:kostId/kamar/:kamarId"
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Partial<KamarDto>>();

  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [kamar, setKamar] = useState<Kamar | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchKamar = () =>
    api
      .get<ResponseModel<Kamar>>(`/kostManager/${kostId}/kamar/${kamarId}`)
      .then((res) => {
        setKamar(res.data.data);
      });

  useEffect(() => {
    if (auth.status === "authenticated") {
      Promise.all([fetchKamar()])
        .catch(errorHandler)
        .finally(() => setIsLoading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (modalState?.mode === "edit") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, kostId, updatedAt, GambarKamar, ...data } = kamar!;
      reset(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  useEffect(() => {
    if (modalState?.mode === "edit") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, kostId, updatedAt, GambarKamar, ...data } = kamar!;
      reset(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  if (isLoading) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Spinner color="white" size={"xl"} />
      </Stack>
    );
  }

  if (!kamar) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Text>Kamar tidak ditemukan</Text>
      </Stack>
    );
  }

  return (
    <Stack direction={"column"} h={"full"}>
      <Button
        as={RouterLink}
        to={`/pemilik/kostManager/${kostId}/`}
        leftIcon={<ArrowBackIcon />}
        w={"fit-content"}
        variant={"unstyled"}
        display={"flex"}
        fontWeight={"normal"}
      >
        Kembali
      </Button>
      <Stack direction={"row"} justify={"space-between"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          Detail Kamar
        </Text>

        <Stack direction={"row"}>
          <Button
            rounded={"2xl"}
            onClick={() =>
              setModalState({
                mode: "edit",
                kamar: kamar!,
              })
            }
          >
            <Icon as={FaPenToSquare} />
          </Button>
          <Button
            rounded={"2xl"}
            onClick={() => {
              setModalState({
                mode: "delete",
                kamar: kamar!,
              });
            }}
          >
            <Icon as={FaTrash} />
          </Button>
        </Stack>
      </Stack>

      <Stack my={"1em"} bgColor={"whiteAlpha.200"} p={"2em"} rounded={"2xl"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          {kamar.namaKamar}
        </Text>

        <Stack my={"1em"}>
          <Text fontWeight={"bold"}>Deskripsi</Text>
          <div
            dangerouslySetInnerHTML={{
              __html: kamar?.description ?? "",
            }}
          />

          <Text fontWeight={"bold"}>Fasilitas</Text>
          <div
            dangerouslySetInnerHTML={{
              __html: kamar?.fasilitas ?? "",
            }}
          />

          <Text fontWeight={"bold"}>Ukuran Kamar</Text>
          <Text>{kamar.ukuran}</Text>

          <Text fontWeight={"bold"}>Jumlah Kamar</Text>
          <Text>{kamar.capacity}</Text>
        </Stack>

        <Text fontWeight={"bold"}>Gambar Kamar</Text>
        <Stack
          direction={"row"}
          justify={"center"}
          flexWrap={"wrap"}
          gap={"1em"}
        >
          {kamar?.GambarKamar.map((gambar, index) => (
            <Image
              key={index}
              src={gambar}
              alt={"Gambar kamar"}
              w={["full", "full", "6em", "12em", "14em"]}
              h={"10em"}
              objectFit={"cover"}
              rounded={"xl"}
            />
          ))}
        </Stack>
      </Stack>

      <Modal
        isOpen={!!modalState}
        onClose={() => setModalState(null)}
        isCentered={modalState?.mode === "delete"}
        size={modalState?.mode !== "delete" ? "full" : undefined}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState?.mode === "edit" ? "Edit Detail Kamar" : "Hapus Kamar"}
          </ModalHeader>
          <ModalCloseButton />

          {modalState?.mode === "delete" && (
            <>
              <ModalBody>
                <Text>
                  Apakah anda yakin ingin menghapus kamar :{" "}
                  <b>{kamar.namaKamar}</b> ?
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => {
                    api
                      .delete(`/kostManager/${kostId}/kamar/${kamarId}`)
                      .then(() => {
                        toast({
                          title: "Kamar berhasil dihapus",
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        });
                        navigate(`/pemilik/kostManager/:kostId`, {
                          params: { kostId },
                        });
                      })
                      .catch(errorHandler)
                      .finally(() => {
                        setModalState(null);
                      });
                  }}
                >
                  Hapus
                </Button>
                <Button
                  ml={3}
                  onClick={() => {
                    setModalState(null);
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}

          {modalState?.mode === "edit" && (
            <>
              <form
                onSubmit={handleSubmit((data) => {
                  if (data.GambarKamar?.length) {
                    const formData = new FormData();
                    data.GambarKamar.forEach((file) => {
                      formData.append("files", file);
                    });

                    api
                      .post<ResponseModel<string[]>>("/upload/", formData)
                      .then((res) => {
                        api
                          .put(`/kostManager/${kostId}/kamar/${kamarId}`, {
                            ...data,
                            GambarKost: res.data.data,
                          })
                          .then(() => {
                            toast({
                              title: "Detail kost berhasil diubah",
                              status: "success",
                              duration: 5000,
                              isClosable: true,
                            });
                          })
                          .catch(errorHandler)
                          .finally(() => {
                            fetchKamar();
                            setModalState(null);
                            reset();
                          });
                      })
                      .catch(errorHandler)
                      .finally(() => {
                        setModalState(null);
                        reset();
                        fetchKamar();
                      });

                    return;
                  }

                  api
                    .put(`/kostManager/${kostId}/kamar/${kamarId}`, data)
                    .then(() => {
                      toast({
                        title: "Detail kost berhasil diubah",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch(errorHandler)
                    .finally(() => {
                      fetchKamar();
                      setModalState(null);
                      reset();
                    });
                })}
              >
                <ModalBody>
                  <FormControl my={"1em"} isInvalid={!!errors.namaKamar}>
                    <FormLabel>Nama Kamar</FormLabel>
                    <Input
                      {...register("namaKamar", {
                        required: "Nama Kamar harus diisi",
                        minLength: {
                          value: 3,
                          message: "Nama Kamar minimal 3 karakter",
                        },
                        maxLength: {
                          value: 255,
                          message: "Nama Kamar maksimal 50 karakter",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.namaKamar && errors.namaKamar.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl my={"1em"} isInvalid={!!errors.description}>
                    <FormLabel>Deskripsi</FormLabel>
                    <CKEditorWrapper control={control} name="description" />
                    <FormErrorMessage>
                      {errors.description && errors.description.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl my={"1em"} isInvalid={!!errors.fasilitas}>
                    <FormLabel>Fasilitas</FormLabel>
                    <CKEditorWrapper control={control} name="fasilitas" />
                    <FormErrorMessage>
                      {errors.fasilitas && errors.fasilitas.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl my={"1em"} isInvalid={!!errors.harga}>
                    <FormLabel>Harga (Perbulan dalam satuan Rupiah)</FormLabel>
                    <NumberInput
                      defaultValue={100000}
                      min={100000}
                      max={100000000}
                    >
                      <NumberInputField
                        {...register("harga", {
                          required: "Harga harus diisi",
                          valueAsNumber: true,
                          min: {
                            value: 100000,
                            message: "Harga minimal Rp. 100.000",
                          },
                          max: {
                            value: 100000000,
                            message: "Harga maksimal Rp. 100.000.000",
                          },
                        })}
                      />
                    </NumberInput>
                    <FormErrorMessage>
                      {errors.harga && errors.harga.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl my={"1em"} isInvalid={!!errors.ukuran}>
                    <FormLabel>Ukuran</FormLabel>
                    <Input
                      {...register("ukuran", {
                        required: "Ukuran harus diisi",
                        minLength: {
                          value: 3,
                          message: "Ukuran minimal 3 karakter",
                        },
                        maxLength: {
                          value: 50,
                          message: "Ukuran maksimal 50 karakter",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.ukuran && errors.ukuran.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl my={"1em"} isInvalid={!!errors.capacity}>
                    <FormLabel>Jumlah Kamar</FormLabel>
                    <NumberInput defaultValue={1} min={1} max={50}>
                      <NumberInputField
                        {...register("capacity", {
                          required: "Jumlah kamar harus diisi",
                          min: {
                            value: 1,
                            message: "Jumlah kamar minimal 1",
                          },
                          max: {
                            value: 50,
                            message: "Jumlah kamar maksimal 50",
                          },
                          valueAsNumber: true,
                        })}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>
                      {errors.capacity && errors.capacity.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl my={"1em"} isInvalid={!!errors.gender}>
                    <FormLabel>Gender Kamar</FormLabel>
                    <Controller
                      control={control}
                      name="gender"
                      rules={{
                        required: "Gender kamar harus diisi",
                      }}
                      render={({ field }) => (
                        <Select {...field} placeholder="Pilih Gender Kamar">
                          <option value="pria">Pria</option>
                          <option value="wanita">Wanita</option>
                          <option value="campur">Campur</option>
                        </Select>
                      )}
                    />
                    <FormErrorMessage>
                      {errors.gender && errors.gender.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl my={"1em"} isInvalid={!!errors.GambarKamar}>
                    <FormLabel>Gambar Kamar (Max. 5 File)</FormLabel>
                    <DropZone
                      control={control}
                      name="GambarKamar"
                      // rules={{
                      //   required: "Gambar Kamar harus diisi",
                      // }}
                      // defaultValue={kost?.GambarKost}
                    />
                    <FormErrorMessage>
                      {errors.GambarKamar && errors.GambarKamar.message}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit">Ganti</Button>
                  <Button
                    ml={3}
                    onClick={() => {
                      reset();
                      setModalState(null);
                    }}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default SettingKamarPage;
