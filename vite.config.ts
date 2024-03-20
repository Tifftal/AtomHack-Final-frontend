import { defineConfig } from "vite";
import { fileURLToPath } from 'node:url';
import react from "@vitejs/plugin-react";
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
      "@pages": resolve(__dirname, "src/pages"),
    },
  },
  plugins: [react()],
});
