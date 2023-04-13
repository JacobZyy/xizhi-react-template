import { useLocation, useNavigate } from "react-router";
import { Menu as AntMenu, MenuProps } from "antd";

import { HomeOutlined, SettingOutlined } from "@ant-design/icons";

import usePower from "@/hooks/usePower";
import menus from "@/menu";

const MenuBar: React.FC<MenuProps> = (props) => {
  const userType = usePower();
  const navigate = useNavigate();
  const location = useLocation();
  const curpath = location.pathname;
  const chosenMenu = "/".concat(curpath.split("/")[1]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeMenu = (item: any) => {
    const { key: path } = item;
    navigate(path);
  };

  const poweredMenus = menus.filter((menu) => {
    const { power } = menu;
    return power.includes(userType);
  });

  return (
    <AntMenu
      selectedKeys={[chosenMenu]}
      {...props}
      items={poweredMenus}
      onClick={handleChangeMenu}
    />
  );
};

export default MenuBar;
