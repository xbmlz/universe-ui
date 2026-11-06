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
    port: 5173,
    fs: {
      allow: ['..'],
    },
  },
})
