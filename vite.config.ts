import { fileURLToPath } from "url";
import type { ConfigEnv, UserConfig } from "vite";
import { loadEnv } from "vite";

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default (config: ConfigEnv): UserConfig => {
  const { mode } = config;
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [legacy(), react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
};
