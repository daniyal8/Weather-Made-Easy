import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Daniyal Weather App',
        short_name: 'D Weather',
        description: 'Weather Made Simple—From Drizzles to Downpours!',
        theme_color: '#B57EDC',
        background_color: '#121212',
        icons: [
          {
            src: 'icons/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
