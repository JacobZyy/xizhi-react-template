import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const HelloPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      Hello World
      <Button
        onClick={() => {
          navigate("/home");
        }}
      >
        btn
      </Button>
    </>
  );
};

export default HelloPage;
