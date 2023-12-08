import {
  Text,
  Stack,
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  FormLabel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import ListingsList from "@/components/ListingsList";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useHook";
import { useForm } from "react-hook-form";
import useTitle from "@/hooks/useTitle";

type Kamar = {
  GambarKamar: string[];
  id: number;
  gender: "pria" | "wanita" | "campur";
  kost: {
    id: number;
    namaKost: string;
    alamat: string;
  };
  namaKamar: string;
  harga: number;
  ukuran: string;
  capacity: number;
};

type ListingFilter = {
  hargaGte: number;
  hargaLte: number;
  gender?: "pria" | "wanita" | "campur";
  search?: string;
};

const ListingPage = () => {
  useTitle("KITAB - Cari kost");
  const api = useApi();
  const handleError = useToastErrorHandler();

  const { register, handleSubmit } = useForm<{ search: string }>();

  const [listings, setListings] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [filter, setFilter] = useState<ListingFilter>({
    hargaGte: 0,
    hargaLte: 10000000,
  });
  const [page, setPage] = useState<number>(1);

  const debouncedFilter = useDebounce(filter, 500);

  const fetchListing = () => {
    setLoading(true);

    const urlBuilder = new URLSearchParams();
    urlBuilder.append("hargaGte", debouncedFilter.hargaGte.toString());
    urlBuilder.append("hargaLte", debouncedFilter.hargaLte.toString());
    urlBuilder.append("page", page.toString());
    if (debouncedFilter.search)
      urlBuilder.append("search", debouncedFilter.search);
    if (debouncedFilter.gender)
      urlBuilder.append("gender", debouncedFilter.gender);

    api
      .get<ResponseModel<Kamar[]>>(`/listings?${urlBuilder.toString()}`)
      .then((res) => {
        setListings(res.data.data);
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchListing();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter, page]);

  return (
    <Stack
      px={["2em", "2em", "8em", "8em", "8em"]}
      py={["0em", "0em", "1em", "2em", "2em"]}
    >
      <Box>
        <Image src="/background/blackLives.png" w={"90em"} />
      </Box>

      <Stack my={"1em"}>
        <form
          onSubmit={handleSubmit((data) => {
            setFilter((filter) => ({ ...filter, search: data.search }));
          })}
        >
          <InputGroup
            w={"100%"}
            bgColor={"whiteAlpha.200"}
            backdropFilter={"blur(4px)"}
            rounded={"1em"}
            color={"white"}
          >
            <Input
              {...register("search")}
              rounded={"1em"}
              borderColor={"gray.500"}
              placeholder="Treasure Kost, Warteg Murah, Kost terdekat dari UMN"
              textOverflow={"ellipsis"}
            />
            <InputRightElement>
              <SearchIcon pr={"1em"} boxSize={"10"} color={"gray.500"} />
            </InputRightElement>
          </InputGroup>
        </form>
      </Stack>

      {/* mobile filter panel (button) */}

      <Show breakpoint="(max-width: 1020px)">
        <Stack alignItems={"end"}>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                rounded={"0.5em"}
                color={"white"}
                variant={"unstyled"}
                rightIcon={<ChevronDownIcon />}
              >
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent
              rounded={"2xl"}
              bgColor={"blackAlpha.700"}
              backdropFilter={"blur(4px)"}
              p={"1em"}
            >
              <PopoverCloseButton />
              <PopoverBody>
                <Stack my={"1em"} color={"white"}>
                  <FormLabel>Harga</FormLabel>
                  <RangeSlider
                    aria-label={["min", "max"]}
                    defaultValue={[100000, 10000000]}
                    min={100000}
                    max={10000000}
                    step={100000}
                    onChangeEnd={(val) => {
                      setFilter({
                        ...filter,
                        hargaGte: val[0],
                        hargaLte: val[1],
                      });
                    }}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <Tooltip
                      label={filter.hargaGte.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    >
                      <RangeSliderThumb index={0} />
                    </Tooltip>
                    <Tooltip
                      label={filter.hargaLte.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    >
                      <RangeSliderThumb index={1} />
                    </Tooltip>
                  </RangeSlider>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    color={"white"}
                    placeholder="Pilih Gender"
                    rounded={"1em"}
                    borderColor={"gray.500"}
                    bgColor={"whiteAlpha.200"}
                    onChange={(val) => {
                      setFilter((filter) => ({
                        ...filter,
                        gender: val.target.value as
                          | "pria"
                          | "wanita"
                          | "campur",
                      }));
                    }}
                  >
                    <option value="pria">Pria</option>
                    <option value="wanita">Wanita</option>
                    <option value="campur">Campur</option>
                  </Select>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
      </Show>

      <Stack paddingBottom={"3em"} flexDirection={"row"}>
        {/* desktop filter panel */}

        <Show breakpoint="(min-width: 1020px)">
          <Stack
            bgColor={"whiteAlpha.200"}
            backdropFilter={"blur(4px)"}
            flex={"1"}
            borderRadius={"1em"}
            border={"0.05em solid #718096"}
            padding={"1em"}
            color={"white"}
            h={"fit-content"}
          >
            <Text fontSize={["md", "xl", "2xl", "2xl", "2xl"]}>Filter</Text>

            <Stack my={"1em"}>
              <FormLabel>Harga</FormLabel>
              <RangeSlider
                aria-label={["min", "max"]}
                defaultValue={[100000, 10000000]}
                min={100000}
                max={10000000}
                step={100000}
                onChangeEnd={(val) => {
                  setFilter({
                    ...filter,
                    hargaGte: val[0],
                    hargaLte: val[1],
                  });
                }}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <Tooltip
                  label={filter.hargaGte.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                >
                  <RangeSliderThumb index={0} />
                </Tooltip>
                <Tooltip
                  label={filter.hargaLte.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                >
                  <RangeSliderThumb index={1} />
                </Tooltip>
              </RangeSlider>
              <FormLabel>Gender</FormLabel>
              <Select
                color={"white"}
                placeholder="Pilih Gender"
                rounded={"1em"}
                borderColor={"gray.500"}
                bgColor={"whiteAlpha.200"}
                onChange={(val) => {
                  setFilter((filter) => ({
                    ...filter,
                    gender: val.target.value as "pria" | "wanita" | "campur",
                  }));
                }}
              >
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
                <option value="campur">Campur</option>
              </Select>
            </Stack>
          </Stack>
        </Show>
        <Stack
          flex={"2"}
          // borderRadius={"1em"}
          ml={["0em", "0em", "0em", "1em", "1em"]}
          overflow={"hidden"}
          spacing={["1em", "1em", "1em", "0em", "0em"]}
          gap={"1em"}
        >
          {loading && (
            <Stack flex={1} align={"center"} justify={"center"}>
              <Spinner size={"lg"} color="white" />
              <Text color={"white"}>Loading...</Text>
            </Stack>
          )}

          {!loading && listings.length === 0 && (
            <Stack flex={1} align={"center"} justify={"center"}>
              <Text fontSize={"xl"} color={"white"}>
                Tidak ada listing yang ditemukan
              </Text>
            </Stack>
          )}
          {listings.map((listing) => (
            <ListingsList kamar={listing} />
          ))}
        </Stack>
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
            color={"white"}
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
            isDisabled={listings.length < 5}
          >
            <ChevronRightIcon />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ListingPage;
