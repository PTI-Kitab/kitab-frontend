import Layout from "@/components/layouts/Layout";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
