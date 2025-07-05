import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['zerodha-frontend-9dz2.onrender.com']
  }
});
