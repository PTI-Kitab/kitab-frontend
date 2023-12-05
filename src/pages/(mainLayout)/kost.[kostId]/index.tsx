import {
  Icon,
  Stack,
  Text,
  AspectRatio,
  Spinner,
  Image,
  Button,
  Input,
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import ListingsList from "@/components/ListingsList";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useParams } from "@/router";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type KostDetail = {
  id: number;
  namaKost: string;
  description: string;
  alamat: string;
  latitude: string;
  longitude: string;
  pembayaran: string;
  bank: string;
  pemilik: Pemilik;
  pemilikId: number;
  createdAt: Date;
  updatedAt: Date;
  GambarKost: string[];
  Kamar: Kamar[];
};

type Pemilik = {
  firstName: string;
  lastName: string;
  email: string;
  noHp: string;
};

type Kamar = {
  id: number;
  namaKamar: string;
  description: string;
  harga: number;
  fasilitas: string;
  ukuran: string;
  gender: "pria" | "wanita" | "campur";
  capacity: number;
  kost: {
    id: number;
    namaKost: string;
    alamat: string;
  };
  kostId: number;
  createdAt: Date;
  updatedAt: Date;
  GambarKamar: string[];
};

const KostPage = () => {
  const api = useApi();
  const errorHandler = useToastErrorHandler();
  const params = useParams("/kost/:kostId");

  const [kost, setKost] = useState<KostDetail | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<ResponseModel<KostDetail>>(`/client/kost/${params.kostId}`)
      .then((res) => {
        setKost(res.data.data);
      })
      .catch(errorHandler)
      .finally(() => {
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (isLoading) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Spinner size={"xl"} color="white" />
      </Stack>
    );
  }

  if (!kost) {
    return (
      <Stack flex={1} align={"center"} justify={"center"} color={"white"}>
        <Text>Tidak dapat menemukan kost</Text>
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack
        minH={"50vh"}
        direction={"column"}
        mx={["2em", "2em", "8em", "8em", "8em"]}
        my={"1em"}
        bgColor={"rgba(255, 255, 255, 0.15)"}
        backdropFilter={"blur(4px)"}
        rounded={"2xl"}
        color={"white"}
        textShadow={"md"}
        p={"1em"}
        px={["1em", "1em", "4em", "4em", "4em"]}
      >
        <Text fontSize={"xxx-large"}>{kost.namaKost}</Text>
        <Stack direction={"row"} align={"center"}>
          <Icon as={FaLocationDot} />
          <Text>{kost.alamat}</Text>
        </Stack>

        <Stack
          direction={"row"}
          justify={"center"}
          flexWrap={"wrap"}
          gap={"1em"}
          my={"1em"}
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

        <Stack fontWeight={"light"} my={"1em"}>
          <div
            dangerouslySetInnerHTML={{
              __html: kost.description,
            }}
          ></div>
        </Stack>

        <Stack my={"1em"} gap={0}>
          <Text fontSize={"2xl"}>Dikelola Oleh</Text>
          <Text>
            {kost.pemilik.firstName} {kost.pemilik.lastName}
          </Text>
          <Text>
            {kost.pemilik.email} - {kost.pemilik.noHp}
          </Text>
        </Stack>

        <Stack pt={"2em"} rounded={"2em"}>
          <AspectRatio ratio={[16 / 10, 16 / 10, 16 / 10, 16 / 5, 16 / 5]}>
            <iframe
              src={`https://maps.google.com/maps?q=${kost.latitude},${kost.longitude}&hl=en&z=14&amp;output=embed`}
            ></iframe>
          </AspectRatio>
        </Stack>
      </Stack>
      <Stack
        direction={"column"}
        mx={["2em", "2em", "8em", "8em", "8em"]}
        my={"1em"}
        bgColor={"rgba(255, 255, 255, 0.15)"}
        backdropFilter={"blur(4px)"}
        rounded={"2xl"}
        color={"white"}
        textShadow={"md"}
        p={"1em"}
        px={["1em", "1em", "4em", "4em", "4em"]}
        gap={"1em"}
      >
        {kost.Kamar.length === 0 && (
          <Text textAlign={"center"}>Tidak ada kamar yang tersedia</Text>
        )}

        {
          // paginate kamar by 5 items per page
          kost.Kamar.slice((page - 1) * 5, page * 5).map((kamar, index) => (
            <ListingsList key={index} kamar={kamar} />
          ))
        }

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
              // isDisabled={listings.length < 5}
              isDisabled={kost.Kamar.length < page * 5}
            >
              <ChevronRightIcon />
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default KostPage;
