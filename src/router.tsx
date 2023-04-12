import React, { lazy } from "react";
import { RouteProps } from "react-router";

const HelloPage = lazy(() => import("@/pages/HelloPage"));
const ClassC = lazy(() => import("@/pages/ClassC"));
const Son = lazy(() => import("@/pages/ClassC/components/Son"));

type RoutersType = {
  name: string;
  key: string;
} & RouteProps;

const routers: RoutersType[] = [
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
];

export default routers;
