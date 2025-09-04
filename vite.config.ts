import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Permite acesso externo
    strictPort: false, // Permite tentar outras portas se 5173 estiver em uso
  }
})
