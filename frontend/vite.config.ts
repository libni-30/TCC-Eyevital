import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow reading environment variables that start with URL_BASE_
  // This makes import.meta.env.URL_BASE_API_VITE available in the app (Vercel)
  envPrefix: ['VITE_', 'URL_BASE_'],
  server: {
    port: 5173,
    host: true,
    strictPort: false,
  },
})
