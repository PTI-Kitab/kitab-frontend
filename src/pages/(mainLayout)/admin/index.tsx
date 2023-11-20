import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
  FaBook,
  FaDoorOpen,
  FaGraduationCap,
  FaHouse,
  FaMoneyBill,
  FaMoneyCheckDollar,
  FaNewspaper,
  FaUsers,
} from "react-icons/fa6";

type AdminStatistics = {
  semuaKost: number;
  semuaKamar: number;
  semuaBooking: number;
  semuaClient: number;
  semuaPemilik: number;
  semuaArticles: number;
  totalCashFlow: number;
  totalEarning: number;
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: React.ReactNode;
  icon: IconType;
}) => {
  return (
    <Stack
      direction={"row"}
      p={"1em"}
      w={["full", "full", "16em", "16em", "16em"]}
      bg={"whiteAlpha.200"}
      rounded={"2xl"}
      color={"white"}
      //   justify={"space-between"}
      align={"center"}
    >
      <Stack p={"0.5em"} bgColor={"#171229"} rounded={"2xl"}>
        <Icon as={icon} boxSize={"2em"} color={"white"} />
      </Stack>

      <Stack gap={0}>
        <Text textColor={"white"} mb={"-1em"}>
          {title}
        </Text>

        <Text fontWeight={"white"} fontSize={"4xl"}>
          {value}
        </Text>
      </Stack>
    </Stack>
  );
};

const AdminDashboardPage = () => {
  const auth = useAuth();
  const api = useApi();
  const errorHandler = useToastErrorHandler();

  const [statistics, setStatistics] = useState<AdminStatistics>({
    semuaBooking: 0,
    semuaClient: 0,
    semuaKamar: 0,
    semuaKost: 0,
    semuaPemilik: 0,
    semuaArticles: 0,
    totalCashFlow: 0,
    totalEarning: 0,
  });

  useEffect(() => {
    if (auth.status === "authenticated") {
      api
        .get<ResponseModel<AdminStatistics>>("/statistics/")
        .then((res) => {
          setStatistics(res.data.data);
        })
        .catch(errorHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Stack direction={"column"}>
      <Text fontWeight={"bold"} fontSize={"2xl"}>
        Dashboard
      </Text>

      <Stack mt={"2em"}>
        <Text fontWeight={"bold"} fontSize={"lg"}>
          Statistik KITAB
        </Text>
        <Stack
          direction={"row"}
          wrap={"wrap"}
          align={"center"}
          // justify={"space-evenly"}
          gap={"1em"}
        >
          <StatCard
            title="Jumlah Kost"
            value={statistics.semuaKost}
            icon={FaHouse}
          />
          <StatCard
            title="Jumlah Kamar"
            value={statistics.semuaKamar}
            icon={FaDoorOpen}
          />
          <StatCard
            title="Jumlah Booking"
            value={statistics.semuaBooking}
            icon={FaBook}
          />
          <StatCard
            title="Jumlah Pemilik"
            value={statistics.semuaPemilik}
            icon={FaUsers}
          />
          <StatCard
            title="Jumlah Client"
            value={statistics.semuaClient}
            icon={FaGraduationCap}
          />
          <StatCard
            title="Jumlah Artikel"
            value={statistics.semuaArticles}
            icon={FaNewspaper}
          />
        </Stack>
      </Stack>

      <Stack my={"2em"}>
        <Text fontWeight={"bold"} fontSize={"lg"}>
          Statistik Keuangan
        </Text>
        <Stack
          direction={"row"}
          wrap={"wrap"}
          align={"center"}
          // justify={"space-evenly"}
          gap={"1em"}
        >
          <StatCard
            title="Total Cash Flow"
            value={statistics.totalCashFlow}
            icon={FaMoneyBill}
          />
          <StatCard
            title="Total Profit"
            value={statistics.totalEarning}
            icon={FaMoneyCheckDollar}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AdminDashboardPage;
