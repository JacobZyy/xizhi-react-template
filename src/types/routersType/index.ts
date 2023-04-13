import { RouteProps } from "react-router";

// 定义权限类型
export type roleType = "admin" | "user";

export type RoutersType = {
  name?: string;
  key: string;
  role?: roleType[] | undefined;
} & RouteProps;

export type RouterPermissionType = {
  role: roleType[] | undefined;
  [key: string]: unknown;
};
