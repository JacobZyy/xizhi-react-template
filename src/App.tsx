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
import routers from "@/routes";

import "antd/dist/reset.css";
import "@/styles/global.scss";

import "dayjs/locale/zh-cn";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          {routers.map((route) => {
            const { key, name, element, hasLayout = true, ...rest } = route;
            if (!hasLayout)
              return (
                <Route
                  key={key}
                  element={<Suspense fallback={"loading"}>{element}</Suspense>}
                  {...rest}
                />
              );
            return (
              <Route key={key} {...rest} element={<Layout>{element}</Layout>} />
            );
          })}
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
