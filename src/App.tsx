import PaginaInicial from './components/PaginaInicial'
import ContatoPage from './components/ContatoPage'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './components/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'
import EducacaoPage from './components/EducacaoPage.tsx'
import ConsultasPage from './components/ConsultasPage.tsx'

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
  <Route path="/" element={<PaginaInicial />} />
  {/* Suporta acesso direto via /paginainicial.html e /pagina-inicial.html */}
  <Route path="/paginainicial.html" element={<PaginaInicial />} />
  <Route path="/pagina-inicial.html" element={<PaginaInicial />} />
  <Route
    path="/educacao"
    element={
      <ProtectedRoute>
        <EducacaoPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/consultas"
    element={
      <ProtectedRoute>
        <ConsultasPage />
      </ProtectedRoute>
    }
  />
  <Route path="/auth" element={<AuthPage />} />
        <Route path="/contato" element={<ContatoPage />} />
  {/* Fallback: qualquer rota desconhecida renderiza a home */}
  <Route path="*" element={<PaginaInicial />} />
      </Routes>
    </HashRouter>
  )
}

export default App
