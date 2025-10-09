import PaginaInicial from './components/PaginaInicial'
import ContatoPage from './components/ContatoPage'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
  <Route path="/" element={<PaginaInicial />} />
  {/* Suporta acesso direto via /paginainicial.html e /pagina-inicial.html */}
  <Route path="/paginainicial.html" element={<PaginaInicial />} />
  <Route path="/pagina-inicial.html" element={<PaginaInicial />} />
        <Route path="/contato" element={<ContatoPage />} />
  {/* Fallback: qualquer rota desconhecida renderiza a home */}
  <Route path="*" element={<PaginaInicial />} />
      </Routes>
    </HashRouter>
  )
}

export default App
