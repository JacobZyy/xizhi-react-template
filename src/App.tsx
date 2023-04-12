import React, { Suspense, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import zhCN from "antd/locale/zh_CN";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { MenuBar, NavBar } from "@/components";
import routers from "@/router";

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
      <Router>
        <Layout>
          <Sider collapsible trigger={null} collapsed={collapsed}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "nav 1",
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: "nav 2",
                },
                {
                  key: "3",
                  icon: <UploadOutlined />,
                  label: "nav 3",
                },
              ]}
            />
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
              <Suspense fallback={<div>loading...</div>}>
                <Routes>
                  <Route path="/" element={<Navigate replace to="/home" />} />
                  {routers.map((route) => {
                    const { key, name, ...rest } = route;
                    return <Route {...rest} key="key" />;
                  })}
                </Routes>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
