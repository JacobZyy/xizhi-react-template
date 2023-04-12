import React, { ComponentType, lazy } from "react";
import { RouteProps } from "react-router";

const HelloPage = lazy(() => import("@/views/HelloPage"));
const ClassC = lazy(() => import("@/views/ClassC"));
const Son = lazy(() => import("@/views/ClassC/components/Son"));

const routers: RouteProps[] = [
  {
    path: "/",
    element: <HelloPage></HelloPage>,
  },
  {
    path: "/home",
    element: <ClassC></ClassC>,
  },
  {
    path: "/settings",
    element: <ClassC></ClassC>,
  },
  { path: "settings/sonPath", element: <Son></Son> },
];

export default routers;
