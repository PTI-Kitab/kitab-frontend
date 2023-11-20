import { Outlet } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
// import { useToast } from "@chakra-ui/react";
import { useNavigate } from "@/router";
import LoadingScreen from "@/components/LoadingScreen";

const Auth = () => {
  const auth = useAuth();
  // const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.status === "authenticated") {
      // toast({
      //   title: "Berhasil",
      //   description: "Selamat datang di Kost Information to Anak Baru.",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      // });

      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (auth.status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default Auth;
