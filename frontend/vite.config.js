import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    define: {
      "process.env": {
        API_URL: env.VITE_API_URL,
        TOKEN_KEY: env.VITE_TOKEN_KEY,
        APP_NAME: env.VITE_APP_NAME,
      }
    }
  });
};
