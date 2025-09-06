// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,        // set your preferred port
    strictPort: true   // will throw error if port is busy instead of picking a new one
  }
})
