import { MacWindowModel } from "@/components/WindowModel";
import { Icon, Stack, Text, Divider, AspectRatio } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import ListingsList from "@/components/ListingsList";

const KostPage = () => {
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
        <Text fontSize={"xxx-large"}>Treasure Kost</Text>
        <Stack direction={"row"} align={"center"}>
          <Icon as={FaLocationDot} />
          <Text>Desa Curug Sangereng, Kelapa Dua</Text>
        </Stack>

        <Text fontWeight={"light"} pt={"2em"}>
          Kosan di daerah desa curug sangean, ada 4 lantai di jaga sama pace.
          Yang punya haji kaki pincang satu naik mio putih. Kosan ini memiliki
          fasilitas mesin cuci untuk setiap lantai tetapi mesin cuci lantai 3
          sering kebalik karena overloading, mohon untuk mengisi pakaian dengan
          benar karena mesin cuci lantai 2 disassembly sampai harus beli baru.
        </Text>
        <Text fontWeight={"light"} pt={"1em"}>
          Selain itu, kosan ini memiliki dua tempat parkir yaitu tempat parkir
          dalam dan luar, tetapi dimohon untuk tidak parkir motor vixion biru di
          parkiran depan karena akan dimarahin oleh pak Herman (orang Flores).
          Kosan ini memiliki fasilitas wifi yang bisa diakses dengan memohon-
          mohon kode vocer kepada pa dul.
        </Text>
        <Text fontWeight={"light"} pt={"1em"}>
          Kosan ini memiliki fasilitas dapur bersama untuk setiap lantai tetapi
          harap pengertian untuk menggunakan dan mengambil bahan makanan dari
          kulkas karena terjadi sebuah insiden dimana seorang penghuni membeli
          sekantong nugget dan dihabiskan oleh orang tidak dikenal sampai hanya
          tersisa 2 biji. Penghuni tresur kos dimohon untuk tidak mencolok les
          kuker di luar karena akan menyebabkan mati lampu pada gedung.
        </Text>
        <Divider orientation="horizontal" pt={"2em"} />
        <Text fontSize={"xx-large"} pt={"1em"}>
          Kost dikelola oleh:
        </Text>
        <Text fontSize={"large"}>Pak Haji Dul (PHD)</Text>
        <Text fontSize={"large"}>No Telp: </Text>
        <Divider orientation="horizontal" pt={"2em"} gap={0} />
        <Stack>
          <Stack direction={"row"} justify={"space-evenly"}>
            <Stack direction={"column"}>
              <Text fontSize={"x-large"} pt={"1em"}>
                Detail Kamar
              </Text>
              <Stack direction={"column"} px={"1em"}>
                <Text>Tipe kamar 3x3</Text>
                <Text>Kamar mandi dalam</Text>
                <Text>Listrik (tidak termasuk)</Text>
                <Text>Air (termasuk)</Text>
              </Stack>
            </Stack>

            <Stack direction={"column"}>
              <Text fontSize={"x-large"} pt={"1em"}>
                Fitur Tambahan
              </Text>
              <Stack direction={"column"} px={"1em"}>
                <Text>Wi-Fi</Text>
                <Text>Mesin cuci</Text>
                <Text>Jemuran</Text>
                <Text>Pendingin ruangan</Text>
              </Stack>
            </Stack>
          </Stack>
          <Divider orientation="horizontal" pt={"2em"} gap={0} />
          <Stack direction={"row"} justify={"start"}>
            <Stack direction={"column"}>
              <Text fontSize={"xx-large"}>Peraturan Kamar</Text>
              <Stack direction={"column"} px={"1em"}>
                <Text fontSize={"large"}>
                  Tidak diperbolehkan menginap (kalo tititnya kecil)
                </Text>
                <Text fontSize={"large"}>
                  Tidak diperbolehkan membawa hewan peliharaan
                </Text>
                <Text fontSize={"large"}>
                  Batas tamu berkunjung smapai dengan jam 10 malam
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack pt={"2em"} rounded={"2em"}>
          <AspectRatio ratio={[16 / 10, 16 / 10, 16 / 10, 16 / 5, 16 / 5]}>
            <iframe src="https://maps.google.com/maps?q=-6.253803,106.617185&hl=en&z=14&amp;output=embed"></iframe>
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
      >
        <ListingsList />
      </Stack>
    </Stack>
  );
};

export default KostPage;
