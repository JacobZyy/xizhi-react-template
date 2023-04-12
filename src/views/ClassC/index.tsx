import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const ClassC = () => {
  const navigate = useNavigate();
  return (
    <div>
      Class Component222
      <Button
        onClick={() => {
          navigate("/");
        }}
      ></Button>
    </div>
  );
};
export default ClassC;
