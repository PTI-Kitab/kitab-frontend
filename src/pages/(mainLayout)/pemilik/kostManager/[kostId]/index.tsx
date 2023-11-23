import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useParams } from "@/router";
import { Form, Link as RouterLink } from "react-router-dom";
import {
  AddIcon,
  ArrowBackIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Spinner,
  Stack,
  Text,
  Image,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  ModalFooter,
  useToast,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import DropZone from "@/components/DropZone";
import CKEditorWrapper from "@/components/CKEditor";

type Kost = {
  GambarKost: string[];
  id: number;
  namaKost: string;
  description: string;
  alamat: string;
  latitude: string;
  longitude: string;
  pembayaran: string;
  bank: "bca" | "bni" | "bri" | "mandiri";
  pemilikId: number;
  createdAt: Date;
  updatedAt: Date;
};

type Kamar = {
  GambarKamar: string;
  id: number;
  gender: "pria" | "wanita" | "campur";
  createdAt: Date;
  updatedAt: Date;
  namaKamar: string;
  harga: number;
  ukuran: string;
  kostId: number;
};

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

type ModalState =
  | {
      mode: "createKamar";
    }
  | {
      mode: "edit";
      kost: Kost;
    }
  | {
      mode: "delete";
      kost: Kost;
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

type Billing = {
  id: number;
  client: {
    firstName: string;
    lastName: string | null;
    noHp: string;
  };
  kamar: {
    namaKamar: string;
  };
  status: "pending" | "confirmed" | "canceled" | "done";
  Payment: {
    id: string;
    status: boolean;
    paidDate: Date | null;
    bookingId: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

type BillingFilter = {
  year: string;
  month: string;
};

const KamarCard = ({ kamar }: { kamar: Kamar }) => {
  return (
    <Stack
      as={RouterLink}
      to={`/pemilik/kostManager/${kamar.kostId}/kamar/${kamar.id}`}
      w={["full", "full", "6em", "12em", "14em"]}
      h={"10em"}
      bgImage={kamar.GambarKamar}
      bgSize={"cover"}
      bgPosition={"center"}
      rounded={"2xl"}
      p={"1em"}
      justify={"end"}
      pos={"relative"}
      cursor={"pointer"}
    >
      {/* shade overlay */}
      <Stack
        pos={"absolute"}
        w={"full"}
        h={"full"}
        left={0}
        top={0}
        bgGradient={
          "linear(to-t, blackAlpha.900, blackAlpha.600, blackAlpha.400, transparent)"
        }
        transition={"all 0.2s ease"}
        _hover={{
          bgColor: "blackAlpha.800",
        }}
        rounded={"2xl"}
      />
      <Stack zIndex={2} gap={0}>
        <Text fontWeight={"bold"} color={"white"}>
          {kamar.namaKamar}
        </Text>
        <Badge colorScheme={"green"} w={"fit-content"} fontSize={"xx-small"}>
          {kamar.gender}
        </Badge>
      </Stack>
    </Stack>
  );
};

const KamarCardNew = ({ onClick }: { onClick: () => void }) => {
  return (
    <Stack
      onClick={onClick}
      w={["full", "full", "6em", "12em", "14em"]}
      h={"10em"}
      bgSize={"cover"}
      bgPosition={"center"}
      rounded={"2xl"}
      p={"1em"}
      cursor={"pointer"}
      justify={"center"}
      align={"center"}
      bgColor={"whiteAlpha.200"}
      transition={"all 0.2s ease"}
      _hover={{
        bgColor: "blackAlpha.600",
      }}
    >
      <AddIcon color={"white"} />
      <Text fontWeight={"bold"} color={"white"}>
        Tambah Kamar
      </Text>
    </Stack>
  );
};

const BillingCard = ({ billing }: { billing: Billing }) => {
  return (
    <Stack
      direction={"row"}
      w={"full"}
      bgColor={"whiteAlpha.200"}
      rounded={"2xl"}
      p={"1em"}
      justify={"space-between"}
      align={"center"}
    >
      <Text>
        {billing.client.firstName} {billing.client.lastName}
      </Text>

      <Stack direction={"column"} gap={0}>
        <Text fontSize={"sm"}>
          {new Date(billing.Payment.createdAt).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Stack
          bgColor={"green.600"}
          rounded={"full"}
          align={"center"}
          justify={"center"}
        >
          <Text fontWeight={"bold"}>PAID</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

const SettingKostPage = () => {
  const auth = useAuth();
  const api = useApi();
  const toast = useToast();
  const navigate = useNavigate();

  const { kostId } = useParams("/pemilik/kostManager/:kostId");
  const handleError = useToastErrorHandler();

  const {
    register: searchRegister,
    formState: { errors: searchErrors },
    handleSubmit: handleSearchSubmit,
  } = useForm<{ search: string }>();

  const {
    register: formEditRegister,
    formState: { errors: formEditErrors },
    handleSubmit: formEditHandleSubmit,
    control: formEditControl,
    reset: formEditReset,
  } = useForm<Partial<KostDto>>();

  const {
    register: formKamarRegister,
    formState: { errors: formKamarErrors },
    handleSubmit: formKamarHandleSubmit,
    control: formKamarControl,
    reset: formKamarReset,
  } = useForm<KamarDto>();

  const [kost, setKost] = useState<Kost | null>(null);
  const [kamar, setKamar] = useState<Kamar[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [billing, setBilling] = useState<Billing[]>([]);
  const [billingPage, setBillingPage] = useState(1);
  const [billingFilter, setBillingFilter] = useState<BillingFilter>({
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
  });

  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKamarList = () => {
    const urlBuilder = new URLSearchParams();
    if (search) urlBuilder.append("search", search);
    if (page) urlBuilder.append("page", page.toString());

    api
      .get<ResponseModel<Kamar[]>>(
        `/kostManager/${kostId}/kamar?${urlBuilder.toString()}`
      )
      .then((res) => {
        setKamar(res.data.data);
      })
      .catch(handleError);
  };

  const fetchKost = () => {
    api
      .get<ResponseModel<Kost>>(`/kostManager/${kostId}`)
      .then((res) => {
        setKost(res.data.data);
      })
      .catch(handleError)
      .finally(() => setIsLoading(false));
  };

  const fetchBilling = () => {
    const urlBuilder = new URLSearchParams();
    if (billingPage) urlBuilder.append("page", billingPage.toString());
    if (billingFilter.month) urlBuilder.append("month", billingFilter.month);
    if (billingFilter.year) urlBuilder.append("year", billingFilter.year);
    api
      .get<ResponseModel<Billing[]>>(
        `/kostManager/billing/${kostId}?${urlBuilder}`
      )
      .then((res) => {
        setBilling(res.data.data);
      })
      .catch(handleError);
  };

  useEffect(() => {
    if (auth.status === "authenticated") {
      fetchKost();
      fetchKamarList();
      fetchBilling();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    fetchKamarList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  useEffect(() => {
    if (modalState?.mode === "edit") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, pemilikId, updatedAt, createdAt, GambarKost, ...data } =
        modalState.kost;
      formEditReset(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  useEffect(() => {
    fetchBilling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingFilter]);

  if (isLoading) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Spinner color="white" size={"xl"} />
      </Stack>
    );
  }

  if (!kost) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Text>Kost tidak ditemukan</Text>
      </Stack>
    );
  }

  return (
    <Stack direction={"column"} h={"full"}>
      <Button
        as={RouterLink}
        to={"/pemilik/kostManager"}
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
          Detail Kost
        </Text>

        <Stack direction={"row"}>
          <Button
            rounded={"2xl"}
            onClick={() =>
              setModalState({
                mode: "edit",
                kost: kost!,
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
                kost: kost!,
              });
            }}
          >
            <Icon as={FaTrash} />
          </Button>
        </Stack>
      </Stack>

      <Stack my={"1em"} bgColor={"whiteAlpha.200"} p={"2em"} rounded={"2xl"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          {kost?.namaKost}
        </Text>

        <Stack my={"1em"}>
          <Text fontWeight={"bold"}>Deskripsi</Text>
          <div
            dangerouslySetInnerHTML={{
              __html: kost?.description ?? "",
            }}
          />

          <Text fontWeight={"bold"}>Alamat</Text>
          <Text>{kost?.alamat}</Text>

          <Text fontWeight={"bold"}>Pembayaran</Text>
          <Text>
            {kost?.bank.toUpperCase()} - {kost?.pembayaran}
          </Text>
        </Stack>

        <Text fontWeight={"bold"}>Gambar Kost</Text>
        <Stack
          direction={"row"}
          justify={"center"}
          flexWrap={"wrap"}
          gap={"1em"}
        >
          {kost?.GambarKost.map((gambar, index) => (
            <Image
              key={index}
              src={gambar}
              alt={"Gambar kost"}
              w={["full", "full", "6em", "12em", "14em"]}
              h={"10em"}
              objectFit={"cover"}
              rounded={"xl"}
            />
          ))}
        </Stack>
      </Stack>

      <Text fontWeight={"bold"} fontSize={"2xl"}>
        Kamar Manager
      </Text>
      <Stack my={"1em"} bgColor={"whiteAlpha.200"} p={"2em"} rounded={"2xl"}>
        <Stack
          as={"form"}
          onSubmit={handleSearchSubmit((v) => {
            setSearch(v.search);
            setPage(1);
          })}
          direction={"row"}
        >
          <FormControl isInvalid={!!searchErrors.search}>
            <InputGroup bgColor={"whiteAlpha.200"} rounded={"1em"}>
              <Input
                {...searchRegister("search", {})}
                rounded={"1em"}
                borderColor={"gray.500"}
                placeholder="Cari kamar"
                textOverflow={"ellipsis"}
              />
              <InputRightElement>
                <SearchIcon pr={"1em"} boxSize={"10"} color={"gray.500"} />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {searchErrors.search && searchErrors.search.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            rounded={"full"}
            bgColor={"whiteAlpha.200"}
            color={"white"}
          >
            Cari
          </Button>
        </Stack>

        <Stack direction={"row"} flexWrap={"wrap"} my={"1em"}>
          {!search && page === 1 && (
            <KamarCardNew
              onClick={() =>
                setModalState({
                  mode: "createKamar",
                })
              }
            />
          )}
          {kamar?.map((kamar) => (
            <KamarCard key={kamar.id} kamar={kamar} />
          ))}
        </Stack>

        <Stack w={"full"} align={"center"} justify={"center"} my={"1em"}>
          <Stack direction={"row"}>
            <Button
              rounded={"full"}
              bgColor={"whiteAlpha.200"}
              color={"white"}
              onClick={() => setPage(page - 1)}
              isDisabled={page === 1}
            >
              <ChevronLeftIcon />
            </Button>
            <Input
              w={"3em"}
              rounded={"2xl"}
              // defaultValue ={page}
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              textAlign={"center"}
              type="number"
            />
            <Button
              rounded={"full"}
              bgColor={"whiteAlpha.200"}
              color={"white"}
              onClick={() => setPage(page + 1)}
              isDisabled={kamar.length < 5}
            >
              <ChevronRightIcon />
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Text fontWeight={"bold"} fontSize={"2xl"}>
        Riwayat Booking
      </Text>
      <Stack my={"1em"} bgColor={"whiteAlpha.200"} p={"2em"} rounded={"2xl"}>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button
              rounded={"full"}
              color={"white"}
              rightIcon={<ChevronDownIcon />}
              alignItems={"center"}
              variant={"unstyled"}
              w={"fit-content"}
            >
              Filter
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverBody>
                <FormLabel>Tahun</FormLabel>
                <Select
                  defaultValue={billingFilter.year}
                  onChange={(e) =>
                    setBillingFilter((filter) => ({
                      ...filter,
                      year: e.target.value,
                    }))
                  }
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </Select>

                <FormLabel>Bulan</FormLabel>
                <Select
                  defaultValue={billingFilter.month}
                  onChange={(e) =>
                    setBillingFilter((filter) => ({
                      ...filter,
                      month: e.target.value,
                    }))
                  }
                >
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </Select>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        {!billing.length && (
          <Stack>
            <Text textAlign={"center"}>Tidak ada riwayat booking</Text>
          </Stack>
        )}
        {billing.map((bill) => (
          <BillingCard billing={bill} />
        ))}
        <Stack w={"full"} align={"center"} justify={"center"} my={"1em"}>
          <Stack direction={"row"}>
            <Button
              rounded={"full"}
              bgColor={"whiteAlpha.200"}
              color={"white"}
              onClick={() => setBillingPage(billingPage - 1)}
              isDisabled={billingPage === 1}
            >
              <ChevronLeftIcon />
            </Button>
            <Input
              w={"3em"}
              rounded={"2xl"}
              // defaultValue ={page}
              value={page}
              onChange={(e) => setBillingPage(Number(e.target.value))}
              textAlign={"center"}
              type="number"
            />
            <Button
              rounded={"full"}
              bgColor={"whiteAlpha.200"}
              color={"white"}
              onClick={() => setBillingPage(page + 1)}
              isDisabled={billing.length < 5}
            >
              <ChevronRightIcon />
            </Button>
          </Stack>
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
            {modalState?.mode === "createKamar"
              ? "Buat Kamar Baru"
              : modalState?.mode === "edit"
              ? "Edit Detail Kost"
              : "Hapus Detail Kost"}
          </ModalHeader>
          <ModalCloseButton />
          {modalState?.mode === "edit" && (
            <Stack
              as={"form"}
              onSubmit={formEditHandleSubmit((data) => {
                console.log(data);
                if (data.GambarKost?.length) {
                  const formData = new FormData();
                  data.GambarKost.forEach((file) => {
                    formData.append("files", file);
                  });

                  api
                    .post<ResponseModel<string[]>>("/upload/", formData)
                    .then((res) => {
                      api
                        .put(`/kostManager/${kostId}`, {
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
                        .catch(handleError)
                        .finally(() => {
                          fetchKamarList();
                          setModalState(null);
                          formEditReset();
                        });
                    })
                    .catch(handleError)
                    .finally(() => {
                      setModalState(null);
                      formEditReset();
                      fetchKost();
                    });

                  return;
                }

                api
                  .put(`/kostManager/${kostId}`, data)
                  .then(() => {
                    toast({
                      title: "Detail kost berhasil diubah",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                  })
                  .catch(handleError)
                  .finally(() => {
                    fetchKamarList();
                    setModalState(null);
                    formEditReset();
                    fetchKost();
                  });
              })}
            >
              <ModalBody>
                <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
                  General
                </Text>
                <FormControl my={"1em"} isInvalid={!!formEditErrors.namaKost}>
                  <FormLabel>Nama Kost</FormLabel>
                  <Input
                    {...formEditRegister("namaKost", {
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
                    {formEditErrors.namaKost && formEditErrors.namaKost.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  my={"1em"}
                  isInvalid={!!formEditErrors.description}
                >
                  <FormLabel>Deskripsi</FormLabel>
                  <CKEditorWrapper
                    control={formEditControl}
                    name="description"
                  />
                  <FormErrorMessage>
                    {formEditErrors.description &&
                      formEditErrors.description.message}
                  </FormErrorMessage>
                </FormControl>

                <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
                  Lokasi
                </Text>
                <FormControl my={"1em"} isInvalid={!!formEditErrors.alamat}>
                  <FormLabel>Alamat</FormLabel>
                  <Input
                    {...formEditRegister("alamat", {
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
                    {formEditErrors.alamat && formEditErrors.alamat.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack direction={["column", "column", "row", "row", "row"]}>
                  <FormControl my={"1em"} isInvalid={!!formEditErrors.latitude}>
                    <FormLabel>Latitude</FormLabel>
                    <Input
                      {...formEditRegister("latitude", {
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
                      {formEditErrors.latitude &&
                        formEditErrors.latitude.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    my={"1em"}
                    isInvalid={!!formEditErrors.longitude}
                  >
                    <FormLabel>Longitude</FormLabel>
                    <Input
                      {...formEditRegister("longitude", {
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
                      {formEditErrors.longitude &&
                        formEditErrors.longitude.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>

                <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
                  Pembayaran
                </Text>
                <FormControl my={"1em"} isInvalid={!!formEditErrors.bank}>
                  <FormLabel>Bank</FormLabel>
                  <Controller
                    control={formEditControl}
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
                    {formEditErrors.bank && formEditErrors.bank.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl my={"1em"} isInvalid={!!formEditErrors.pembayaran}>
                  <FormLabel>Nomor Rekening</FormLabel>
                  <Input
                    {...formEditRegister("pembayaran", {
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
                    {formEditErrors.pembayaran &&
                      formEditErrors.pembayaran.message}
                  </FormErrorMessage>
                </FormControl>

                <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
                  Gambar Kost
                </Text>
                <FormControl my={"1em"} isInvalid={!!formEditErrors.GambarKost}>
                  <FormLabel>Ganti Gambar Kost (Max. 5 File)</FormLabel>
                  <DropZone
                    control={formEditControl}
                    name="GambarKost"
                    // rules={{
                    //   required: "Gambar Kost harus diisi",
                    // }}
                    // defaultValue={kost?.GambarKost}
                  />
                  <FormErrorMessage>
                    {formEditErrors.GambarKost &&
                      formEditErrors.GambarKost.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit">Ganti</Button>
                <Button
                  ml={3}
                  onClick={() => {
                    formEditReset();
                    setModalState(null);
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </Stack>
          )}

          {modalState?.mode === "delete" && (
            <>
              <ModalBody>
                <Text my={"1em"}>
                  Apakah anda yakin ingin menghapus kost :{" "}
                  <b>{kost?.namaKost}</b>?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    api
                      .delete(`/kostManager/${kostId}`)
                      .then(() => {
                        toast({
                          title: "Kost berhasil dihapus",
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        });
                        navigate("/pemilik/kostManager");
                      })
                      .catch(handleError)
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

          {modalState?.mode === "createKamar" && (
            <>
              <form
                onSubmit={formKamarHandleSubmit((data) => {
                  const formData = new FormData();
                  data.GambarKamar.forEach((file) => {
                    formData.append("files", file);
                  });

                  api
                    .post<ResponseModel<string[]>>("/upload/", formData)
                    .then((res) => {
                      api
                        .post(`/kostManager/${kostId}/kamar`, {
                          ...data,
                          GambarKamar: res.data.data,
                        })
                        .then(() => {
                          toast({
                            title: "Kamar berhasil dibuat",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                          });
                        })
                        .catch(handleError)
                        .finally(() => {
                          fetchKamarList();
                          setModalState(null);
                          formKamarReset();
                        });
                    })
                    .catch(handleError)
                    .finally(() => {
                      setModalState(null);
                      formKamarReset();
                    });
                })}
              >
                <ModalBody>
                  <FormControl
                    my={"1em"}
                    isInvalid={!!formKamarErrors.namaKamar}
                  >
                    <FormLabel>Nama Kamar</FormLabel>
                    <Input
                      {...formKamarRegister("namaKamar", {
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
                      {formKamarErrors.namaKamar &&
                        formKamarErrors.namaKamar.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    my={"1em"}
                    isInvalid={!!formKamarErrors.description}
                  >
                    <FormLabel>Deskripsi</FormLabel>
                    <CKEditorWrapper
                      control={formKamarControl}
                      name="description"
                    />
                    <FormErrorMessage>
                      {formKamarErrors.description &&
                        formKamarErrors.description.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    my={"1em"}
                    isInvalid={!!formKamarErrors.fasilitas}
                  >
                    <FormLabel>Fasilitas</FormLabel>
                    <CKEditorWrapper
                      control={formKamarControl}
                      name="fasilitas"
                    />
                    <FormErrorMessage>
                      {formKamarErrors.fasilitas &&
                        formKamarErrors.fasilitas.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl my={"1em"} isInvalid={!!formKamarErrors.harga}>
                    <FormLabel>Harga (Perbulan dalam satuan Rupiah)</FormLabel>
                    <NumberInput
                      defaultValue={100000}
                      min={100000}
                      max={100000000}
                    >
                      <NumberInputField
                        {...formKamarRegister("harga", {
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
                      {formKamarErrors.harga && formKamarErrors.harga.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl my={"1em"} isInvalid={!!formKamarErrors.ukuran}>
                    <FormLabel>Ukuran</FormLabel>
                    <Input
                      {...formKamarRegister("ukuran", {
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
                      {formKamarErrors.ukuran && formKamarErrors.ukuran.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    my={"1em"}
                    isInvalid={!!formKamarErrors.capacity}
                  >
                    <FormLabel>Jumlah Kamar</FormLabel>
                    <NumberInput defaultValue={1} min={1} max={50}>
                      <NumberInputField
                        {...formKamarRegister("capacity", {
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
                      {formKamarErrors.capacity &&
                        formKamarErrors.capacity.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl my={"1em"} isInvalid={!!formKamarErrors.gender}>
                    <FormLabel>Gender Kamar</FormLabel>
                    <Controller
                      control={formKamarControl}
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
                      {formKamarErrors.gender && formKamarErrors.gender.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    my={"1em"}
                    isInvalid={!!formKamarErrors.GambarKamar}
                  >
                    <FormLabel>Gambar Kamar (Max. 5 File)</FormLabel>
                    <DropZone
                      control={formKamarControl}
                      name="GambarKamar"
                      rules={{
                        required: "Gambar Kamar harus diisi",
                      }}
                      // defaultValue={kost?.GambarKost}
                    />
                    <FormErrorMessage>
                      {formKamarErrors.GambarKamar &&
                        formKamarErrors.GambarKamar.message}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit">Buat</Button>
                  <Button
                    ml={3}
                    onClick={() => {
                      formKamarReset();
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

export default SettingKostPage;
