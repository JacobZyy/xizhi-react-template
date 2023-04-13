import { RouteProps } from "react-router";

// 定义权限类型
export type roleType = "admin" | "user";

export type baseRouteType = {
  name?: string;
  key: string;
  hasLayout?: boolean;
  role?: roleType[] | undefined;
};

export type RoutersType = baseRouteType & RouteProps;

export type RouterPermissionType = {
  path?: string;
  role?: roleType[];
  hasLayout: boolean;
};
