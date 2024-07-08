import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import del from "rollup-plugin-delete";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  build: {
    outDir: "./dist",
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "g-grid",
      fileName: "g-grid"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: { vue: "Vue" }
      },
      plugins: [del({ targets: ["dist/favicon.svg", "dist/favicon.ico"], hook: "generateBundle" })]
    }
  }
});
