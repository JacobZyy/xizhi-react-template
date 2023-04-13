import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

import Layout from "@/Layout";
import poweredRouters from "@/routes";

import "antd/dist/reset.css";
import "@/styles/global.scss";

import "dayjs/locale/zh-cn";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          {poweredRouters.map((route) => {
            const { key, ...rest } = route;
            return <Route key={key} {...rest} />;
          })}
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
