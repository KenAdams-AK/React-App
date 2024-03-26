import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

const root = path.resolve(__dirname, "..");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(root, "client/src"),
      "@contracts": path.resolve(root, "contracts"),
    },
  },

  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
