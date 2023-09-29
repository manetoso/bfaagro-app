import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '🚀',
        replacement: path.resolve(__dirname, 'src/components/Icons.jsx')
      }
    ]
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: [
        'bfaagro.ico',
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg'
      ],
      manifest: {
        name: 'BFA Agro app',
        short_name: 'BFA Agro',
        description: 'Aplicación interna de BFA Agro.',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon'
          },
          {
            src: '/maskable_icon.png',
            sizes: '225x225',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        theme_color: '#0C923F',
        background_color: '#204983',
        display: 'standalone',
        scope: '/',
        start_url: '/autenticacion',
        orientation: 'portrait'
      }
    })
  ]
})
