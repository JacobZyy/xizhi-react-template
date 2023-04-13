import React from "react";
import { useNavigate } from "react-router";
import { Button } from "antd";

import { storage } from "@/utils/storage";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const fakeLogin = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("fdfglkdgj");
      }, 1000);
    });
  };

  const handleLogin = async () => {
    const token = await fakeLogin();
    storage.set("token", token);
    navigate("/home");
  };
  return (
    <>
      <Button onClick={handleLogin}>登录</Button>
    </>
  );
};

export default Login;
