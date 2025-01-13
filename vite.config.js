import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || '/Computer-Hardware-Test/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure static assets are copied
    copyPublicDir: true,
  }
})