import React, { useState } from "react";
// import menus from "./menus";
import { Button, Layout, Menu, Popconfirm, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from 'store/auth'
import IconHome from 'assets/images/png/home.png'
import IconUsers from 'assets/images/png/users.png'
import IconXodim from 'assets/images/png/xodim3.png'
import IconMahsulot from 'assets/images/png/kiyim2.png'
import IconDefect from 'assets/images/png/defect.png'
import IconWorkType from 'assets/images/png/ish_turi.png'
import IconBolim from 'assets/images/png/bolim.png'
import IconXato from 'assets/images/png/xato.png'
import IconAyol from 'assets/images/png/bulim.png'
import IconErkak from 'assets/images/png/bulim-erkak.png'
import {
  LogoutOutlined
} from "@ant-design/icons";

const { Sider } = Layout;

const sidebar = () => {

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { myUser } = useSelector((state) => state.myUser)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(signOut())
    navigate("/auth/sign-in")
  }

  const confirm = (e) => {
    handleLogout()
    // message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };

  const menus = {
    // Diretor
    // Director

    // ADMIN
    Direktor: [
      {
        key: "",
        icon: <img onClick={() => setCollapsed(true)} className="w-[30px] h-[30px]" src={IconHome} alt="" />,
        label: <div onClick={() => setCollapsed(true)}>Home</div>,
      },
      {
        key: "users",
        icon: <img onClick={() => setCollapsed(true)} className="w-[30px] h-[30px]" src={IconUsers} alt="" />,
        label: <div onClick={() => setCollapsed(true)}>Foydalanuvchilar</div>
      },
      {
        key: "ish_turi",
        icon: <img onClick={() => setCollapsed(true)} className="w-[30px] h-[30px]" src={IconWorkType} alt="" />,
        label: <div onClick={() => setCollapsed(true)}>Ish turi</div>
      },
      {
        key: "bulim",
        icon: <img onClick={() => setCollapsed(true)} className="w-[30px] h-[30px]" src={IconBolim} alt="" />,
        label: <div onClick={() => setCollapsed(true)}>Bo'lim</div>
      },
      {
        key: "xodimlar",
        icon: <img onClick={() => setCollapsed(true)} className="w-[30px] h-[30px]" src={IconXodim} alt="" />,
        label: <div onClick={() => setCollapsed(true)}>Xodimlar</div>
      },
      {
        key: "mahsulotlar",
        icon: <img onClick={() => setCollapsed(true)} className="w-[30px] h-[30px]" src={IconMahsulot} alt="" />,
        label: <div onClick={() => setCollapsed(true)}>Mahsulotlar</div>
      },
      {
        key: "xatolar",
        icon: <img onClick={() => setCollapsed(true)} className="w-[30px] h-[30px]" src={IconXato} alt="" />,
        label: <div onClick={() => setCollapsed(true)}>Xatolar</div>
      },
      {
        key: "xisobotlar",
        icon: <img onClick={() => setCollapsed(true)} className="w-[30px] h-[30px]" src={IconDefect} alt="" />,
        label: <div onClick={() => setCollapsed(true)}>Xisobotlar</div>
      },
      {
        key: "profile",
        icon: <img onClick={() => setCollapsed(true)} className="w-[30px] h-[30px]" src={myUser?.gender === "Erkak" ? IconErkak : IconAyol} alt="" />,
        label: <div onClick={() => setCollapsed(true)}>Mening profilim</div>
      }
    ],

    // ASSIST
    Admin: [
      {
        key: "",
        icon: <img className="w-[30px] h-[30px]" src={IconHome} alt="" />,
        label: "Home"
      }
    ],

    Tekshiruvchi: [
      {
        key: "",
        icon: <img className="w-[30px] h-[30px]" src={IconHome} alt="" />,
        label: "Home"
      }
    ],

    Bulim: [
      {
        key: "",
        icon: <img className="w-[30px] h-[30px]" src={IconHome} alt="" />,
        label: "Home"
      }
    ]
  }

  return (
    <Sider
      collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      collapsedWidth={`${screen.width <= 768 ? '0' : "70"}`}
      // className="h-full overflow-y-scroll"
      width={"240px"}
    >
      <Menu
        mode="inline"
        // theme="dark"
        // theme="light"
        className="h-[91%] overflow-y-auto"
        defaultSelectedKeys={[location.pathname.replace("/", "").split("-")[0].split("/")[0]]}
        defaultOpenKeys={[location.pathname.split("/")[1]]}
        onClick={(item) => navigate(`/${item.key}`)}
        items={menus[myUser?.status]}
      // items={menus}
      />
      <div className="flex items-center justify-center bg-white py-3">
        <Tooltip placement='right' title={"Profildan chiqish"}>
          <Popconfirm
            title="Profildan chiqish"
            description="Profildan chiqishni xoxlaysizmi?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Ha"
            cancelText="Yo'q"
          >
            {
              collapsed ?
                <Button type="primary" danger><LogoutOutlined /></Button> :
                <Button className="w-[95%] mx-auto" type='primary' danger><LogoutOutlined /> Profildan chiqish</Button>
            }
          </Popconfirm>
        </Tooltip>
      </div>
    </Sider>
  );
};

export default sidebar;
