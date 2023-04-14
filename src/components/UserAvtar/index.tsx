import React from "react";
import { useNavigate } from "react-router";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";

import {
  CaretDownOutlined,
  DownOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import avataalogo from "@/assets/logo/avatar.png";
import { storage } from "@/utils/storage";

import styles from "./index.module.scss";

const UserAvtar: React.FC = () => {
  const navigate = useNavigate();
  const handleChangePwd = () => {
    console.log("修改密码");
  };

  const handleLogout = () => {
    storage.clear();
    navigate("/login", { replace: true });
    console.log("退出登录");
  };

  const items: MenuProps["items"] = [
    {
      key: "icon",
      className: styles["dropdownItem"],
      label: (
        <Avatar
          shape="square"
          size="large"
          className={styles["userLogo"]}
          icon={<img src={avataalogo} alt="name" />}
        />
      ),
      disabled: true,
      style: { cursor: "default" },
    },
    {
      key: "username",
      label: "username",
      disabled: true,
      className: styles["dropdownItem"],
      style: { cursor: "default" },
    },
    {
      key: "changePwd",
      className: styles["dropdownItem"],
      label: (
        <Button type="text" onClick={handleChangePwd}>
          修改密码
        </Button>
      ),
    },
    {
      key: "logout",
      className: styles["dropdownItem"],
      label: (
        <Button type="text" onClick={handleLogout}>
          退出登录
        </Button>
      ),
    },
  ];
  return (
    <div className={styles["container"]}>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        className={styles["dropdownMenu"]}
      >
        <Button
          type="link"
          className={styles["menuTrigger"]}
          onClick={(e) => e.preventDefault()}
        >
          <Space size="small">
            <Avatar
              shape="square"
              size="large"
              className={styles["userLogo"]}
              icon={<img src={avataalogo} alt="name" />}
            />
            <span className={styles["username"]}>username</span>
            <CaretDownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserAvtar;
