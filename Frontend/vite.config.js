import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tailwindcss()],
    server: {
      https:
        command === "serve"
          ? {
              key: fs.readFileSync("localhost-key.pem"),
              cert: fs.readFileSync("localhost-cert.pem"),
            }
          : false, // Disable HTTPS in production
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
      proxy: {
        "/api": "https://weblyss.onrender.com",
      },
    },
  };
});
