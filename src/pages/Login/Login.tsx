import React from "react";
import { useNavigate } from "react-router";
import { Button } from "antd";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };
  return (
    <>
      <Button onClick={handleLogin}>登录</Button>
    </>
  );
};

export default Login;
