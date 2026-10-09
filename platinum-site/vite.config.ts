import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    target: "es2022",
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "index.html"),
        "process-scene": resolve(projectRoot, "src/process-scene-entry.ts"),
      },
      output: {
        entryFileNames: chunk => chunk.name === "process-scene" ? "assets/process-scene.js" : "assets/[name]-[hash].js",
      },
    },
  }
});
