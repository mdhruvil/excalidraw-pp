import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";
import { defineConfig } from "vite";

const manifest = {
  "short_name": "Excalidraw++",
  "name": "Excalidraw++",
  "icons": [
    {
      "src": "/pwa-assets/Excalidraw-pp.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    },
    {
      "src": "/pwa-assets/pwa-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "/pwa-assets/pwa-64x64.png",
      "sizes": "64x64",
      "type": "image/png"
    },
    {
      "src": "/pwa-assets/pwa-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/pwa-assets/pwa-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/pwa-assets/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "id": "/",
  "start_url": "/",
  "background_color": "#ffffff",

  "scope": "/",
  "theme_color": "#ffffff",
  "shortcuts": [
    {
      "name": "+ Create",
      "short_name": "Create",
      "description": "Create a new Board",
      "url": "/?source=pwa",

    }
  ],
  "description": "Excalidraw++: with ++ features",

}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    manifest: manifest, registerType: 'autoUpdate',
    devOptions: {
      enabled: false
    }
  })],
  define: {
    "process.env.IS_PREACT": "false",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
