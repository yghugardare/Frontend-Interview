import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackViteConfig } from "@tanstack/vite-config";
import tailwindcss from '@tailwindcss/vite'
const baseConfig = defineConfig({
  plugins: [react(),tailwindcss(),],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

export default mergeConfig(
  baseConfig,
  tanstackViteConfig({
    entry: "./src/main.tsx",
    srcDir: "./src",
  })
);
