import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base dinâmico para GitHub Pages em builds via Actions
  base: process.env.GITHUB_PAGES === 'true'
    ? `/${(process.env.GITHUB_REPOSITORY || '').split('/')[1] || ''}/`
    : '/',
  server: {
    port: 5173,
    host: true, // Permite acesso externo
    strictPort: false, // Permite tentar outras portas se 5173 estiver em uso
  },
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        paginainicial: 'paginainicial.html',
      },
    },
  },
})
