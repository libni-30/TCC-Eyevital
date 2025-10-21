import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import UserProfileDropdown from './UserProfileDropdown'
import QuizSection from './QuizSection'
import EstrabismoSection from './EstrabismoSection'
import VideosSection from './VideosSection'
import './EducacaoPage.css'

export default function EducacaoPage() {
  const { user } = useAuth()
  const isLoggedIn = !!user
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleImageError = (img: HTMLImageElement): void => {
    img.onerror = null
    img.src = 'assets/images/placeholder.png'
  }
  return (
    <div className="educacao-page">
      {/* Header replicado para permitir navegação entre páginas */}
      <header className="header">
        <nav className="nav-container">
          <div className="logo">
            <div className="logo-diamond"></div>
            <Link className="logo-text" to="/">EYEVITAL</Link>
          </div>
          <nav className="nav-menu" role="navigation" aria-label="Menu principal">
            <Link to="/">Sobre nós</Link>
            <Link
              to="/educacao"
              aria-current="page"
              className="active"
              onClick={(e) => {
                if (!isLoggedIn) { e.preventDefault(); setShowAuthModal(true) }
              }}
            >
              Educação
            </Link>
            <Link
              to="/ajudaprofissional"
              onClick={(e) => {
                if (!isLoggedIn) { e.preventDefault(); setShowAuthModal(true) }
              }}
            >
              Ajuda Profissional
            </Link>
            <Link to="/contato">Contato</Link>
          </nav>
          {isLoggedIn ? (
            <UserProfileDropdown />
          ) : (
            <div className="auth-buttons">
              <Link to="/auth?mode=login" className="login-btn">Login</Link>
              <Link to="/auth?mode=register" className="register-btn">Registrar</Link>
            </div>
          )}
        </nav>
      </header>

      {/* Espaço para compensar o header fixo */}
      <div className="educacao-hero-spacer" />

      <main style={{ paddingBottom: 64 }}>
        {/* Seção de Vídeos Educativos colada ao header */}
        <VideosSection />

        <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', marginTop: 60 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 24 }}>Área de Educação</h1>
          <p style={{ marginBottom: 40, lineHeight: 1.5 }}>
            Conteúdos interativos, quizzes e materiais para apoiar o seu aprendizado sobre saúde visual.
          </p>
        </section>

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'grid', gap: 48 }}>
          <QuizSection onImageError={handleImageError} />
          <EstrabismoSection onImageError={handleImageError} />
        </div>
      </main>

      {/* Rodapé padrão do site */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo" aria-label="Eyevital">
                <span className="footer-diamond" aria-hidden="true"></span>
                <span className="footer-name">EYEVITAL</span>
              </div>
              <span className="footer-sep" aria-hidden="true"></span>
              <p className="footer-tagline">Cuide da sua visão com inovação e simplicidade</p>
            </div>
          </div>
          <div className="footer-bottom">
            <nav className="footer-links" aria-label="Links do rodapé">
              <a href="#">Careers</a>
              <span className="footer-divider" aria-hidden="true">|</span>
              <a href="#">Privacy Policy</a>
              <span className="footer-divider" aria-hidden="true">|</span>
              <a href="#">Terms &amp; Conditions</a>
            </nav>
            <p className="footer-copy">&copy; 2025 Eyevital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de autenticação */}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)}>
        Você precisa estar logado para acessar esta área. Caso ainda não tenha uma conta, registre-se e depois faça login.
      </AuthModal>
    </div>
  )
}
