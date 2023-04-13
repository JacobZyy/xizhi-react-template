import React, { lazy } from "react";
import { Navigate, RouteProps } from "react-router";

const HelloPage = lazy(() => import("@/pages/HelloPage"));
const ClassC = lazy(() => import("@/pages/ClassC"));
const Son = lazy(() => import("@/pages/ClassC/components/Son"));
const NoFoundPage = lazy(() => import("@/pages/404Page"));

export type RoutersType = {
  name?: string;
  key: string;
} & RouteProps;

const routers: RoutersType[] = [
  {
    key: "redirect of /",
    path: "/",
    element: <Navigate replace to="/home" />,
  },
  {
    name: "首页",
    key: "homepage",
    path: "/home",
    element: <HelloPage></HelloPage>,
  },
  {
    name: "设置",
    key: "settingspage",
    path: "/settings",
    element: <ClassC></ClassC>,
  },
  {
    path: "/settings/sonPath",
    element: <Son></Son>,
    name: "儿子设置",
    key: "sonsettingspage",
  },
  {
    path: "/settings/sonPath",
    element: <Son></Son>,
    name: "儿子设置",
    key: "sonsettingspage",
  },
  {
    path: "/settings/sonPath",
    element: <Son></Son>,
    name: "儿子设置",
    key: "sonsettingspage",
  },
  {
    path: "/settings/sonPath",
    element: <Son></Son>,
    name: "儿子设置",
    key: "sonsettingspage",
  },
  {
    path: "/settings/sonPath",
    element: <Son></Son>,
    name: "儿子设置",
    key: "sonsettingspage",
  },
  {
    path: "*",
    name: "404",
    key: "404notfount",
    element: <NoFoundPage />,
  },
];

export default routers;
