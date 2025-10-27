import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import UserProfileDropdown from './UserProfileDropdown'
import { articles, type Article } from '../data/articles'
import './ArticlesPage.css'

interface ArticleCardProps {
  article: Article
  isRead: boolean
  onRead: (article: Article) => void
}

function ArticleCard({ article, isRead, onRead }: ArticleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article 
      className={`article-card ${isExpanded ? 'card-hovered' : ''}`}
      data-read={isRead}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="article-thumbnail">
        <img 
          src={article.thumbnail || '/articles/default-article.jpg'} 
          alt={article.title} 
          className="article-thumbnail-img"
        />
      </div>
      
      <div className="article-content">
        <div className="article-meta">
          <span className="article-category">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            {article.category}
          </span>
        </div>
        
        <h3 className="article-title">{article.title}</h3>
        <p 
          className={`article-description ${isExpanded ? 'article-description-expanded' : ''}`}
        >
          {article.shortDescription}
        </p>
        
        <div className="article-footer">
          <button 
            className="article-read-btn"
            onClick={() => onRead(article)}
          >
            <span>Ler mais</span>
          </button>
          
          <button 
            className={`article-eye-indicator ${isRead ? 'read' : 'unread'}`}
            aria-label={isRead ? 'Artigo já lido' : 'Artigo não lido'}
            title={isRead ? 'Você já leu este artigo' : 'Você ainda não leu este artigo'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default function ArticlesPage() {
  const { user } = useAuth()
  const isLoggedIn = !!user

  // Estado para rastrear artigos lidos
  const [readArticles, setReadArticles] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('readArticles')
    return stored ? new Set(JSON.parse(stored)) : new Set()
  })

  // Estado para controlar o modal de artigo
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Estado para controlar tela cheia
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Bloquear scroll quando modal está aberto
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedArticle])

  // Marcar artigo como lido
  const markAsRead = (articleId: string) => {
    const newReadArticles = new Set([...readArticles, articleId])
    setReadArticles(newReadArticles)
    localStorage.setItem('readArticles', JSON.stringify([...newReadArticles]))
  }

  // Verificar se artigo foi lido
  const isRead = (articleId: string) => readArticles.has(articleId)

  // Abrir artigo
  const handleReadArticle = (article: Article) => {
    markAsRead(article.id)
    setSelectedArticle(article)
    setIsFullscreen(false)
  }

  // Fechar modal de artigo
  const handleCloseArticle = () => {
    setSelectedArticle(null)
    setIsFullscreen(false)
  }

  // Alternar tela cheia
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="articles-page">
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <div className="logo">
            <div className="logo-diamond"></div>
            <Link className="logo-text" to="/">EYEVITAL</Link>
          </div>
          <nav className="nav-menu" role="navigation" aria-label="Menu principal">
            <Link to="/">Sobre nós</Link>
            <Link to="/educacao">Educação</Link>
            <Link to="/ajudaprofissional">Ajuda Profissional</Link>
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
      <div className="articles-hero-spacer" />

      <main className="articles-main">
        <div className="articles-page-container">
          <div className="articles-page-header">
            <h1 className="articles-page-title">ARTIGOS</h1>
            <Link to="/educacao" className="articles-back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Voltar
            </Link>
            <p className="articles-page-subtitle">
              Explore todos os artigos sobre saúde ocular
            </p>
          </div>

          <div className="articles-page-grid">
            {articles.map((article) => (
              <ArticleCard 
                key={article.id}
                article={article}
                isRead={isRead(article.id)}
                onRead={handleReadArticle}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Rodapé */}
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

      {/* Modal de artigo */}
      {selectedArticle && (
        <div className="article-modal-overlay" onClick={handleCloseArticle}>
          <div className={`article-modal-content ${isFullscreen ? 'fullscreen' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="article-modal-controls">
              <button className="article-modal-fullscreen" onClick={toggleFullscreen} title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}>
                {isFullscreen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <button className="article-modal-close" onClick={handleCloseArticle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="article-modal-header">
              <span className="article-modal-category">{selectedArticle.category}</span>
              <h2 className="article-modal-title">{selectedArticle.title}</h2>
            </div>

            <div className="article-modal-body">
              <div className="article-modal-text">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.trim().startsWith('## ')) {
                    return (
                      <h3 key={index} className="article-section-title">
                        {paragraph.replace('## ', '')}
                      </h3>
                    )
                  }
                  if (paragraph.includes('**')) {
                    const parts = paragraph.split(/(\*\*.*?\*\*)/)
                    return (
                      <p key={index} className="article-paragraph">
                        {parts.map((part, i) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i}>{part.slice(2, -2)}</strong>
                          }
                          return part
                        })}
                      </p>
                    )
                  }
                  return paragraph.trim() ? (
                    <p key={index} className="article-paragraph">
                      {paragraph.trim()}
                    </p>
                  ) : null
                })}
              </div>
            </div>

            <div className="article-modal-footer">
              <div className="article-source">
                <h4>Referência:</h4>
                <p className="article-reference">{selectedArticle.reference}</p>
                <a 
                  href={selectedArticle.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="article-source-link"
                >
                  📖 Leia o artigo original
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
              <p className="article-disclaimer">
                ⚠️ Este conteúdo foi reproduzido para fins educacionais. 
                Todos os direitos pertencem à fonte original.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
