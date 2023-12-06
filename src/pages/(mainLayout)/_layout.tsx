import LoadingScreen from "@/components/LoadingScreen";
import ScrollToHashElement from "@/components/ScrollToHash";
import Layout from "@/components/layouts/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Outlet, ScrollRestoration } from "react-router-dom";

const MainLayout = () => {
  const auth = useAuth();

  if (auth.status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <ScrollToHashElement />
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
