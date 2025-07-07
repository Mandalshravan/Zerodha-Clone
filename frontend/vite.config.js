// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 4173,
    // ✅ Add this to allow your Render frontend domain
    allowedHosts: ["zerodha-frontend-9dz2.onrender.com"],
  },
});
