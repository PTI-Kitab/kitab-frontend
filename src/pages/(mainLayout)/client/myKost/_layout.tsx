import DashboardLayout from "@/components/layouts/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaGauge } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

const menu = [
  {
    name: "Booking",
    path: "/client/myKost/",
    icon: FaGauge,
  },
];

const MyKostLayout = () => {
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.status === "unauthenticated") {
      toast({
        title: "Error",
        description: "Anda harus masuk terlebih dahulu.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      navigate("/");
    }

    if (auth.user?.role !== "client") {
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
    <DashboardLayout title="MyKost" menus={menu}>
      <Outlet />
    </DashboardLayout>
  );
};

export default MyKostLayout;
