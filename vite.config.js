import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server : {
    proxy: {
      '/api': {
        target: 'https://fakestoreapi.com/products', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
})

