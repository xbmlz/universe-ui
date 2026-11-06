import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      features: {
        vapor: true,
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    fs: {
      allow: ['..'],
    },
  },
})
