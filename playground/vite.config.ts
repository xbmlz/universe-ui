import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
  ],
  optimizeDeps: {
    exclude: ['@vue/repl'],
  },
  server: {
    port: 5174,
    fs: {
      allow: ['..'],
    },
  },
})
