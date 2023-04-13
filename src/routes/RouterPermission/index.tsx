import React, { PropsWithChildren, Suspense } from "react";
import { Navigate } from "react-router";

import usePower from "@/hooks/usePower";
import Layout from "@/Layout";
import { RouterPermissionType } from "@/types/routersType";
import { storage } from "@/utils/storage";

const RouterPermission: React.FC<PropsWithChildren<RouterPermissionType>> = (
  props
) => {
  const { path, role, hasLayout, children } = props;

  const userToken = storage.get("token"); // 判断登录状态
  const userType = usePower(); // 用户类型
  // 未登录则跳转登录
  if (!userToken) {
    return <Navigate replace to="/login" />;
  }

  // 已登录且当前path为登录页的时候跳转至home
  if (path === "/login") {
    return <Navigate replace to="/home" />;
  }

  // 没有权限则跳转404
  // role为undefine的时候说明这个页面不需要权限
  if (role && !role.includes(userType)) {
    return <Navigate replace to="/404" />;
  }

  // 没有layout需求则添加layout
  if (!hasLayout) return <Suspense fallback={"loading"}>{children}</Suspense>;

  // 通用状态
  return <Layout>{children}</Layout>;
};

export default RouterPermission;
