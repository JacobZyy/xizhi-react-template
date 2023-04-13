import React from "react";
import { Navigate, Route } from "react-router";

import usePower from "@/hooks/usePower";
import { RoutersType } from "@/types/routersType";

const RouterPermission: React.FC<RoutersType> = (props) => {
  const { role, ...restProps } = props;

  const userType = usePower();
  // if (!hasToken) return <Navigate replace to="/login" />;
  // if (!isAllowed) return <Navigate replace to="/404" />;

  return <Route {...restProps} />;
};

export default RouterPermission;
