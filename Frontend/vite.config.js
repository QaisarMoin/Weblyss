import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { optimizeCssModules } from "vite-plugin-optimize-css-modules";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    build: {
      target: "esnext",
    },
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
    plugins: [
      react(),
      nodePolyfills({
        include: ["path", "buffer"],
      }),
      UnoCSS(),
      tsconfigPaths(),
      mode === "production" && optimizeCssModules({ apply: "build" }),
    ],
  };
});
