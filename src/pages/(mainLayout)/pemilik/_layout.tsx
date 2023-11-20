import DashboardLayout from "@/components/layouts/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { useToast } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { FaHouse, FaMoneyBill } from "react-icons/fa6";
import { useEffect } from "react";

const menu = [
  {
    name: "Kost",
    path: "/pemilik/kostManager",
    icon: FaHouse,
  },
  {
    name: "Payout",
    path: "/pemilik/payout/",
    icon: FaMoneyBill,
  },
];

const PemilikLayout = () => {
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.status !== "authenticated") {
      toast({
        title: "Error",
        description: "Anda harus masuk terlebih dahulu.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      navigate("/");
    }

    if (auth.user?.role !== "pemilik") {
      toast({
        title: "Error",
        description: "Anda tidak memiliki akses ke halaman ini.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <DashboardLayout title="Pemilik Space" menus={menu}>
      <Outlet />
    </DashboardLayout>
  );
};

export default PemilikLayout;
