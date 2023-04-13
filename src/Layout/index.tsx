import React, { PropsWithChildren, Suspense, useMemo, useState } from "react";
import { Layout as AntLayout, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { MenuBar, NavBar } from "@/components";
import routers from "@/routes";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  // 这是用来定制主题色的属性
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const routerMap: Record<string, string> = useMemo(() => {
    return routers.reduce((pre, cur) => {
      if (cur.path && !pre[cur.path]) {
        pre[cur.path] = cur.name;
      }
      return pre;
    }, {});
  }, []);
  return (
    <AntLayout>
      <Sider collapsible trigger={null} collapsed={collapsed}>
        <div className="logo" />
        <MenuBar theme="dark" mode="inline" />
      </Sider>
      <AntLayout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
              style: {
                margin: "auto 16px",
              },
            }
          )}
          <NavBar routerMap={routerMap}></NavBar>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
