import { Stack, Text } from "@chakra-ui/react";

const TermsPage = () => {
  return (
    <Stack direction={"column"}>
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
      >
        <Text fontWeight={"bold"} fontSize={"3xl"}>
          Syarat dan Ketentuan Penggunaan
        </Text>
        <Text my={"1em"}>
          Selamat datang di KITAB, platform yang membantu mahasiswa baru dalam
          mencari dan memanage kost-kostan di sekitar kampus. Sebelum Anda
          menggunakan layanan kami, harap membaca dengan seksama syarat dan
          ketentuan berikut:
          <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
            1. Pendaftaran Akun
          </Text>
          <Text>
            1.1. Untuk menggunakan layanan KITAB, pengguna diharuskan
            mendaftarkan akun dengan informasi yang akurat dan lengkap.
          </Text>
          <Text>
            1.2. Setiap akun yang didaftarkan harus bersifat pribadi dan tidak
            boleh diserahkan kepada pihak lain.
          </Text>
          <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
            2. Pencarian dan Pemesanan Kost
          </Text>
          <Text>
            2.1. KITAB menyediakan platform untuk mencari dan memesan
            kost-kostan di sekitar kampus.
          </Text>{" "}
          <Text>
            2.2. Setiap transaksi pemesanan kost melalui platform ini tunduk
            pada biaya administrasi sebesar 10% dari total transaksi, yang akan
            dikenakan pada pemilik kost.
          </Text>
          <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
            3. Kewajiban Pemilik Kost
          </Text>
          <Text>
            3.1. Pemilik kost bertanggung jawab untuk menyediakan informasi yang
            akurat dan terkini mengenai kost mereka di platform KITAB.
          </Text>
          <Text>
            3.2. Pemilik kost setuju untuk membayar biaya administrasi sebesar
            10% dari total transaksi setiap kali ada pemesanan kamar melalui
            platform KITAB.
          </Text>
          <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
            4. Pembayaran dan Pajak
          </Text>
          4.1. Pembayaran transaksi akan dilakukan melalui sistem pembayaran
          yang telah ditetapkan oleh KITAB.
          <Text>
            4.2. Pemilik kost setuju untuk membayar pajak sebesar 10% dari total
            transaksi kepada pihak berwenang, yang akan ditangani oleh KITAB.
          </Text>
          <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
            5. Penonaktifan Akun
          </Text>
          5.1. KITAB berhak untuk menonaktifkan akun pengguna atau pemilik kost
          yang melanggar syarat dan ketentuan yang telah ditetapkan.
          <Text fontWeight={"bold"} fontSize={"xl"} my={"1em"}>
            6. Perubahan Syarat dan Ketentuan
          </Text>
          6.1. KITAB berhak untuk mengubah syarat dan ketentuan ini tanpa
          pemberitahuan sebelumnya. Perubahan tersebut akan berlaku segera
          setelah dipublikasikan di platform KITAB. Dengan menggunakan layanan
          KITAB, Anda setuju untuk mematuhi syarat dan ketentuan ini. Jika Anda
          memiliki pertanyaan atau klarifikasi lebih lanjut, silakan hubungi tim
          dukungan kami. Terima kasih telah memilih KITAB sebagai solusi
          pencarian kost Anda!
        </Text>
      </Stack>
    </Stack>
  );
};

export default TermsPage;
