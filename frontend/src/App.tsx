import PaginaInicial from './components/PaginaInicial'
import LandingPage from './components/LandingPage'
import ContatoPage from './components/ContatoPage'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './components/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'
import EducacaoPage from './components/EducacaoPage'
import ArticlesPage from './components/ArticlesPage'
import VideosPage from './components/VideosPage'
import AjudaProfissionalPage from './components/AjudaProfissionalPage'
import ResetPasswordPage from './components/ResetPasswordPage'
import ResetSuccessPage from './components/ResetSuccessPage'
import ResetRequestedPage from './components/ResetRequestedPage'

// Exemplo de uso da API (opcional):
// import { get } from './lib/api'

// async function ping() {
//   try {
//     const data = await get('/health')
//     console.log('API /health:', data)
//   } catch (e) {
//     console.error('Erro chamando API:', e)
//   }
// }

function App() {
  return (
    <HashRouter>
      <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/home" element={<PaginaInicial />} />
  {/* Suporta acesso direto via /paginainicial.html e /pagina-inicial.html */}
  <Route path="/paginainicial.html" element={<PaginaInicial />} />
  <Route path="/pagina-inicial.html" element={<LandingPage />} />
  <Route
    path="/educacao"
    element={
      <ProtectedRoute>
        <EducacaoPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/educacao/videos"
    element={
      <ProtectedRoute>
        <VideosPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/educacao/artigos"
    element={
      <ProtectedRoute>
        <ArticlesPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/ajudaprofissional"
    element={
      <ProtectedRoute>
        <AjudaProfissionalPage />
      </ProtectedRoute>
    }
  />
  <Route path="/auth" element={<AuthPage />} />
  <Route path="/reset-password" element={<ResetPasswordPage />} />
  <Route path="/reset-success" element={<ResetSuccessPage />} />
  <Route path="/reset-requested" element={<ResetRequestedPage />} />
        <Route path="/contato" element={<ContatoPage />} />
  {/* Fallback: qualquer rota desconhecida renderiza a landing page */}
  <Route path="*" element={<LandingPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
