import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      port: 3000,
      proxy:
        mode === "ngrok"
          ? {
              "/api": {
                target: "http://localhost:1337",
                changeOrigin: true,
                secure: false,
              },
              "/uploads": {
                target: "http://localhost:1337",
                changeOrigin: true,
                secure: false,
              },
            }
          : undefined,
    },
  };
});
