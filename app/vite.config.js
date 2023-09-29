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
  plugins: [react(), VitePWA({ registerType: 'autoUpdate' })]
})
