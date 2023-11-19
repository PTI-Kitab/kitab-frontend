import DashboardLayout from "@/components/layouts/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaGauge, FaFolder } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/admin/",
    icon: FaGauge,
  },
  {
    name: "CMS",
    path: "/admin/cms/",
    icon: FaFolder,
  },
];

const AdminLayoutPage = () => {
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

    if (auth.user?.role !== "admin") {
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
    <DashboardLayout title={"Admin"} menus={menu}>
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminLayoutPage;
