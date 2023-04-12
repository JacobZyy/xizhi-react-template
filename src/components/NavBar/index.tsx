import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

import styels from "./index.module.scss";

const NavBar: React.FC<{ routerMap: Record<string, string> }> = (props) => {
  const { routerMap } = props;
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const fixedPaths = pathSnippets.reduce<string[]>((pre, cur) => {
    const lastPath = pre.at(-1) || "";
    const curPath = lastPath.concat("/", cur);
    pre.push(curPath);
    return pre;
  }, []);

  const breadcrumbItems = fixedPaths.map((pathurl) => {
    return {
      key: pathurl,
      title: <Link to={pathurl}>{routerMap[pathurl]}</Link>,
    };
  });

  return (
    <>
      <Breadcrumb
        items={breadcrumbItems}
        className={styels["breadcrum-customed"]}
      />
    </>
  );
};

export default memo(NavBar);
