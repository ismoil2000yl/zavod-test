import { Button, Layout } from "antd";
import Sidebar from "components/layout/sidebar";
import Content from "components/layout/content";
import { useLocation } from "react-router-dom";

const index = ({ children }) => {

  return (
    <Layout className="h-screen overflow-y-hidden">
      <Sidebar/>
      <Content>{children}</Content>
    </Layout>
  );
};

export default index;
