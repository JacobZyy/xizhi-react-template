import { HomeOutlined, SettingOutlined } from "@ant-design/icons";

const menus = [
  {
    label: "工作台",
    icon: <HomeOutlined />,
    key: "/home",
    power: ["admin", "user"],
  },
  {
    label: "设置",
    icon: <SettingOutlined />,
    key: "/settings",
    power: ["admin"],
  },
];

export default menus;
