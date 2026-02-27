import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/profiles": {
        target: "https://www.hunqz.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/profiles/, "/api/opengrid/profiles"),
      },
    },
  },
});
