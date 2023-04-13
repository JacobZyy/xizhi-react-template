import { lazy } from "react";
import { Navigate } from "react-router";

import NoFoundPage from "@/pages/404Page";
import { RoutersType } from "@/types/routersType";

import RouterPermission from "./RouterPermission";

const LoginPage = lazy(() => import("@/pages/Login/Login"));
const HelloPage = lazy(() => import("@/pages/HelloPage"));
const ClassC = lazy(() => import("@/pages/ClassC"));
const Son = lazy(() => import("@/pages/ClassC/components/Son"));

const routers: RoutersType[] = [
  {
    key: "redirect of /",
    path: "/",
    element: <Navigate replace to="/home" />,
  },
  {
    key: "loginPage",
    path: "/login",
    hasLayout: false,
    element: <LoginPage />,
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
    role: ["admin"],
    element: <ClassC></ClassC>,
  },
  {
    path: "/settings/sonPath",
    element: <Son></Son>,
    name: "儿子设置",
    role: ["admin"],
    key: "sonsettingspage",
  },
  {
    path: "*",
    name: "404",
    hasLayout: false,
    key: "404notfount",
    element: <NoFoundPage />,
  },
];

export default routers;
