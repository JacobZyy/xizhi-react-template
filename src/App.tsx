import React, { Suspense, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ConfigProvider, Layout, theme } from "antd";
import zhCN from "antd/locale/zh_CN";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { MenuBar, NavBar } from "@/components";
import routers from "@/router";

import usePower from "./hooks/usePower";
import Login from "./pages/Login/Login";
import { roleType } from "./types/routersType/index";

import "antd/dist/reset.css";
import "@/styles/global.scss";

import "dayjs/locale/zh-cn";

const { Header, Sider, Content } = Layout;

function App() {
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
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<div>loading...</div>}>
        <Router>
          <Layout>
            <Sider collapsible trigger={null} collapsed={collapsed}>
              <div className="logo" />
              <MenuBar theme="dark" mode="inline" />
            </Sider>
            <Layout className="site-layout">
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
                <Routes>
                  {routers.map((route) => {
                    const { key, name, ...rest } = route;
                    return <Route {...rest} key="key" />;
                  })}
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
