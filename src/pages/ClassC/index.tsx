import React from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { selector, useRecoilState, useSetRecoilState } from "recoil";

import { readOnlyState, testStore } from "@/storage";

const ClassC = () => {
  const navigate = useNavigate();
  const [text, setText] = useRecoilState(testStore);
  // const count = selector({
  //   key: "count",
  //   get: ({ get }) => {
  //     const text = get(testStore);
  //     return text + 2;
  //   },
  // });
  return (
    <div>
      Class Component222
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        22
      </Button>
      <Button
        onClick={() => {
          navigate("/settings/sonPath");
        }}
      >
        33
      </Button>
      <Button
        onClick={() => {
          setText((pre) => {
            console.log(pre);
            return pre + 1;
          });
          setText((pre) => {
            console.log(pre);
            return pre + 1;
          });
          setText((pre) => {
            console.log(pre);
            return pre + 1;
          });
        }}
      >
        button{text}
      </Button>
    </div>
  );
};
export default ClassC;
