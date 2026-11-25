import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png', 'images/symptoms/*.svg'],
      manifest: {
        name: 'Monilíase em Alerta',
        short_name: 'Monilíase',
        description: 'Guia de prevenção do cacaueiro — CEPLAC · FITOMOL (100% Offline)',
        lang: 'pt-BR',
        theme_color: '#14532D',
        background_color: '#14532D',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          {
            src: './icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: './icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/testSetup.ts'],
  },
});
