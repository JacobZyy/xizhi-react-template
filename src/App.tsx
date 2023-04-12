import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

import Layout from "./Layout";
import routers from "./router";

import "antd/dist/reset.css";
import "@/styles/global.scss";

import "dayjs/locale/zh-cn";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              {routers.map((route) => (
                <Route key={route.path} {...route} />
              ))}
            </Routes>
          </Suspense>
        </Router>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
