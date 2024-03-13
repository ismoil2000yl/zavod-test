import {
  HomeOutlined, UserAddOutlined, SolutionOutlined, ReadOutlined, ClockCircleOutlined, UsergroupAddOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
const menus = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "users",
    icon: <UsergroupAddOutlined />,
    label: "Foydalanuvchilar"
  }
];

export default menus;

// myUser === "admin" &&
