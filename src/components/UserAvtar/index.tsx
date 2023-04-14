import React from "react";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";

import { DownOutlined, SmileOutlined } from "@ant-design/icons";

import avataalogo from "@/assets/logo/avatar.png";

import styles from "./index.module.scss";

const UserAvtar: React.FC = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  return (
    <div className={styles["container"]}>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button
          className={styles["menuTrigger"]}
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            <Avatar
              shape="square"
              size="large"
              className={styles["userLogo"]}
              icon={<img src={avataalogo} alt="name" />}
            />
            <span className={styles["username"]}>username</span>
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserAvtar;
