import ResetScroll from "@/components/ResetScroll";
import Layout from "@/components/layouts/Layout";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Layout>
      <Outlet />
      <ResetScroll />
    </Layout>
  );
};

export default MainLayout;
