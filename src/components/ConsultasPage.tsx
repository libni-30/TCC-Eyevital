import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import ChatIntro from './ChatIntro'
import FaqGrid from './FaqGrid'
import './ConsultasPage.css'

export default function ConsultasPage() {
  const { user, logout } = useAuth()
  const isLoggedIn = !!user
  const [showAuthModal, setShowAuthModal] = useState(false)


  return (
    <div className="consultas-page">
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
              onClick={(e) => {
                if (!isLoggedIn) { e.preventDefault(); setShowAuthModal(true) }
              }}
            >
              Educação
            </Link>
            <Link
              to="/consultas"
              aria-current="page"
              className="active"
              onClick={(e) => {
                if (!isLoggedIn) { e.preventDefault(); setShowAuthModal(true) }
              }}
            >
              Consultas
            </Link>
            <Link to="/contato">Contato</Link>
          </nav>
          {isLoggedIn ? (
            <div className="auth-buttons">
              <span className="user-label">{user?.username || user?.email}</span>
              <button
                className="logout-btn"
                onClick={async () => { await logout() }}
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/auth?mode=login" className="login-btn">Login</Link>
              <Link to="/auth?mode=register" className="register-btn">Registrar</Link>
            </div>
          )}
        </nav>
      </header>

      {/* Espaço para compensar o header fixo */}
      <div className="consultas-hero-spacer" />
      <main style={{ paddingBottom: 64 }}>
        {/* Bloco de chat abaixo do header */}
        <ChatIntro limit={10} />
        
        <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 24 }}>Área de Consultas</h1>
          <p style={{ marginBottom: 40, lineHeight: 1.5 }}>
            Agendamento e acompanhamento de consultas com profissionais parceiros.
          </p>
        </section>

        <FaqGrid
          items={[
            {
              id: 'q1',
              question: 'Preciso ir ao oftalmologista mesmo sem sentir dor?',
              answer: 'Sim. É importante fazer exames regulares para detectar problemas antes que apareçam sintomas.'
            },
            {
              id: 'q2',
              question: 'Assistir TV de perto estraga a visão?',
              answer: 'Não estraga, mas pode causar cansaço nos olhos. É bom fazer pausas e manter distância adequada.'
            },
            {
              id: 'q3',
              question: 'Usar óculos por muito tempo piora a visão?',
              answer: 'Não. Óculos corrigem a visão e não causam dependência.'
            },
            {
              id: 'q4',
              question: 'Colírio pode ser usado todo dia?',
              answer: 'Apenas se for indicado por um médico. O uso errado pode causar irritações ou esconder problemas.'
            },
            {
              id: 'q5',
              question: 'O que é conjuntivite?',
              answer: 'É uma inflamação nos olhos que causa vermelhidão, coceira e secreção. Pode ser contagiosa.'
            },
            {
              id: 'q6',
              question: 'Ficar muito tempo no celular prejudica os olhos?',
              answer: 'Sim. Pode causar olho seco e fadiga ocular. Faça pausas a cada 20 minutos.'
            },
            {
              id: 'q7',
              question: 'Cenoura realmente ajuda na visão?',
              answer: 'Sim. É rica em vitamina A, que é importante para a saúde dos olhos, mas sozinha não melhora a visão.'
            },
            {
              id: 'q8',
              question: 'Posso usar lentes de contato dormindo?',
              answer: 'Não é recomendado, a menos que sejam específicas para isso. Pode causar infecções.'
            },
          ]}
        />
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
