import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { articles, type Article } from '../data/articles'
import './ArticlesSection.css'

interface ArticlesSectionProps {
  articles?: Article[]
}

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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default function ArticlesSection({ articles: articlesData = articles }: ArticlesSectionProps) {
  // Estado para rastrear artigos lidos (armazenado no localStorage)
  const [readArticles, setReadArticles] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('readArticles')
    return stored ? new Set(JSON.parse(stored)) : new Set()
  })

  // Estado para controlar o índice do carrossel
  const [currentIndex, setCurrentIndex] = useState(0)

  // Estado para controlar o modal de artigo
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Estado para controlar tela cheia
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Número de artigos visíveis por vez (responsivo)
  const [articlesPerView, setArticlesPerView] = useState(4)

  // Atualizar número de artigos visíveis baseado no tamanho da tela
  useEffect(() => {
    const updateArticlesPerView = () => {
      if (window.innerWidth < 768) {
        setArticlesPerView(1)
      } else if (window.innerWidth < 1024) {
        setArticlesPerView(2)
      } else if (window.innerWidth < 1280) {
        setArticlesPerView(3)
      } else {
        setArticlesPerView(4)
      }
    }

    updateArticlesPerView()
    window.addEventListener('resize', updateArticlesPerView)
    return () => window.removeEventListener('resize', updateArticlesPerView)
  }, [])

  // Salvar no localStorage quando o estado mudar
  useEffect(() => {
    localStorage.setItem('readArticles', JSON.stringify([...readArticles]))
  }, [readArticles])

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
    setReadArticles(prev => new Set([...prev, articleId]))
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

  // Navegar para o próximo conjunto de artigos
  const handleNext = () => {
    if (currentIndex + articlesPerView < articlesData.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Navegar para o conjunto anterior de artigos
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Calcular se as setas devem estar desabilitadas
  const isPrevDisabled = currentIndex === 0
  const isNextDisabled = currentIndex + articlesPerView >= articlesData.length

  // Artigos visíveis no momento
  const visibleArticles = articlesData.slice(currentIndex, currentIndex + articlesPerView)

  return (
    <section className="articles-section">
      <div className="articles-container">
        <div className="articles-header">
          <h2 className="articles-title">ARTIGOS</h2>
        </div>

        <div className="articles-grid">
          {visibleArticles.map((article) => (
            <ArticleCard 
              key={article.id}
              article={article}
              isRead={isRead(article.id)}
              onRead={handleReadArticle}
            />
          ))}
        </div>

        <div className="articles-footer">
          <Link 
            to="/educacao/artigos"
            className="articles-see-all"
          >
            Ver tudo
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          
          <div className="articles-nav">
            <button 
              className="nav-btn nav-prev" 
              aria-label="Artigo anterior"
              onClick={handlePrev}
              disabled={isPrevDisabled}
              style={{ opacity: isPrevDisabled ? 0.5 : 1, cursor: isPrevDisabled ? 'not-allowed' : 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className="nav-btn nav-next" 
              aria-label="Próximo artigo"
              onClick={handleNext}
              disabled={isNextDisabled}
              style={{ opacity: isNextDisabled ? 0.5 : 1, cursor: isNextDisabled ? 'not-allowed' : 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

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
                  // Detectar títulos (começam com ##)
                  if (paragraph.trim().startsWith('## ')) {
                    return (
                      <h3 key={index} className="article-section-title">
                        {paragraph.replace('## ', '')}
                      </h3>
                    )
                  }
                  // Detectar negrito (**texto**)
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
                  // Parágrafo normal
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
    </section>
  )
}
