import LoadingScreen from "@/components/LoadingScreen";
import ResetScroll from "@/components/ResetScroll";
import Layout from "@/components/layouts/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const auth = useAuth();

  if (auth.status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <Outlet />
      <ResetScroll />
    </Layout>
  );
};

export default MainLayout;
