import React from "react";

import { roleType } from "@/types/routersType";
import { localStorage } from "@/utils/storage";

/**
 * usepower 当前是仅取存储在 localStorage 中的用户类型
 * 后续有根据每个页面配置权限的需求的话可以增加入参
 * 用以确定所需要的权限所绑定的页面
 */

const fakeStorageUserInfo = {
  name: "zzzy",
  userType: "admin",
};

const usePower = (): roleType => {
  const { userType } = localStorage.get("userInfo") || fakeStorageUserInfo;
  return userType;
};

export default usePower;
