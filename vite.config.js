import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      // ── Backend API ──────────────────────────────────────────────────────
      // All /api calls from billing & logistics flow through this proxy.
      // The Spring Boot backend must be running on localhost:8080.
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },

      // ── Frontend apps ────────────────────────────────────────────────────
      // Forward /billing to the Billing FE dev server (port 5173)
      '/billing': {
        target: 'http://localhost:5173',
        changeOrigin: true,
      },
      // Forward /logistics to the Logistics FE dev server (port 5177)
      '/logistics': {
        target: 'http://localhost:5177',
        changeOrigin: true,
      },
    },
  },
});
