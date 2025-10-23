import { useState, useEffect } from 'react'
import './VideosSection.css'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  duration: string
  icon: string
}

interface VideosSectionProps {
  videos?: Video[]
}

const defaultVideos: Video[] = [
  {
    id: '1',
    title: 'Cuidados com a higiene ocular',
    description: 'Aprenda práticas simples e eficazes para manter seus olhos limpos e protegidos contra infecções dia a dia.',
    thumbnail: '/videos/higiene-ocular.jpg',
    category: 'Higiene ocular',
    duration: '5 min',
    icon: '👁️'
  },
  {
    id: '2',
    title: 'Óculos escuros: proteção ou ilusão?',
    description: 'Descubra como escolher óculos escuros de verdade, entenda sua função e evite riscos para a saúde dos seus olhos.',
    thumbnail: '/videos/oculos-escuros.jpg',
    category: 'Mitos e vedades',
    duration: '15 min',
    icon: '🕶️'
  },
  {
    id: '3',
    title: 'O que é Conjuntivite? Causas e tratamentos',
    description: 'Conheça os principais tipos de conjuntivite, suas causas, sintomas e como agir corretamente para prevenir e tratar a doença.',
    thumbnail: '/videos/conjuntivite.jpg',
    category: 'Doenças comuns',
    duration: '10 min',
    icon: '🔬'
  },
  {
    id: '4',
    title: 'Alimentos para melhorar a visão e a saúde dos olhos',
    description: 'Veja quais alimentos fortalecem a saúde ocular, ajudam a prevenir doenças e garantem uma visão mais nítida e saudável.',
    thumbnail: '/videos/alimentacao.jpg',
    category: 'Alimentação',
    duration: '20 min',
    icon: '🥕'
  },
  {
    id: '5',
    title: 'Exercícios para relaxar a visão',
    description: 'Aprenda exercícios simples que podem ser feitos em casa para relaxar os olhos e reduzir o cansaço visual.',
    thumbnail: '/videos/exercicios.jpg',
    category: 'Exercícios',
    duration: '8 min',
    icon: '💪'
  },
  {
    id: '6',
    title: 'Como prevenir a miopia em crianças',
    description: 'Entenda os fatores de risco e aprenda estratégias eficazes para prevenir o desenvolvimento da miopia infantil.',
    thumbnail: '/videos/miopia-infantil.jpg',
    category: 'Prevenção',
    duration: '12 min',
    icon: '👶'
  },
  {
    id: '7',
    title: 'Lentes de contato: uso correto',
    description: 'Descubra as melhores práticas para usar lentes de contato com segurança e evitar problemas oculares.',
    thumbnail: '/videos/lentes.jpg',
    category: 'Cuidados',
    duration: '7 min',
    icon: '🔍'
  },
  {
    id: '8',
    title: 'Sinais de alerta para problemas de visão',
    description: 'Conheça os sintomas que indicam a necessidade de consultar um oftalmologista imediatamente.',
    thumbnail: '/videos/sinais-alerta.jpg',
    category: 'Saúde ocular',
    duration: '9 min',
    icon: '⚠️'
  }
]

export default function VideosSection({ videos = defaultVideos }: VideosSectionProps) {
  // Estado para rastrear vídeos assistidos (armazenado no localStorage)
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('watchedVideos')
    return stored ? new Set(JSON.parse(stored)) : new Set()
  })

  // Estado para controlar o índice do carrossel
  const [currentIndex, setCurrentIndex] = useState(0)

  // Estado para controlar se está mostrando todos os vídeos
  const [showAllVideos, setShowAllVideos] = useState(false)

  // Número de vídeos visíveis por vez (responsivo)
  const [videosPerView, setVideosPerView] = useState(4)

  // Atualizar número de vídeos visíveis baseado no tamanho da tela
  useEffect(() => {
    const updateVideosPerView = () => {
      if (window.innerWidth < 768) {
        setVideosPerView(1)
      } else if (window.innerWidth < 1024) {
        setVideosPerView(2)
      } else if (window.innerWidth < 1280) {
        setVideosPerView(3)
      } else {
        setVideosPerView(4)
      }
    }

    updateVideosPerView()
    window.addEventListener('resize', updateVideosPerView)
    return () => window.removeEventListener('resize', updateVideosPerView)
  }, [])

  // Salvar no localStorage quando o estado mudar
  useEffect(() => {
    localStorage.setItem('watchedVideos', JSON.stringify([...watchedVideos]))
  }, [watchedVideos])

  // Marcar vídeo como assistido
  const markAsWatched = (videoId: string) => {
    setWatchedVideos(prev => new Set([...prev, videoId]))
  }

  // Verificar se vídeo foi assistido
  const isWatched = (videoId: string) => watchedVideos.has(videoId)

  // Navegar para o próximo conjunto de vídeos
  const handleNext = () => {
    if (currentIndex + videosPerView < videos.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Navegar para o conjunto anterior de vídeos
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Calcular se as setas devem estar desabilitadas
  const isPrevDisabled = currentIndex === 0
  const isNextDisabled = currentIndex + videosPerView >= videos.length

  // Vídeos visíveis no momento
  const visibleVideos = videos.slice(currentIndex, currentIndex + videosPerView)

  // Se showAllVideos é true, renderiza a view completa
  if (showAllVideos) {
    return (
      <section className="videos-section videos-full-view">
        <div className="videos-container">
          <div className="videos-header">
            <h2 className="videos-title">VÍDEOS</h2>
            <button 
              className="videos-back-btn"
              onClick={() => setShowAllVideos(false)}
              style={{
                background: '#17C0D1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              ← Voltar
            </button>
          </div>

          <div className="videos-grid videos-grid-all" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            padding: '24px 0'
          }}>
            {videos.map((video) => (
              <article key={video.id} className="video-card" data-watched={isWatched(video.id)}>
                <div className="video-thumbnail">
                  <div className="video-placeholder">
                    <span className="video-icon">{video.icon}</span>
                  </div>
                  <button className="video-play-btn" aria-label={`Assistir ${video.title}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="video-content">
                  <div className="video-meta">
                    <span className="video-category">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {video.category}
                    </span>
                    <span className="video-duration">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {video.duration}
                    </span>
                  </div>
                  
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  
                  <div className="video-footer">
                    <button 
                      className="video-watch-btn"
                      onClick={() => markAsWatched(video.id)}
                    >
                      <span>Assistir</span>
                    </button>
                    
                    <button 
                      className={`video-eye-indicator ${isWatched(video.id) ? 'watched' : 'unwatched'}`}
                      aria-label={isWatched(video.id) ? 'Vídeo já assistido' : 'Vídeo não assistido'}
                      title={isWatched(video.id) ? 'Você já assistiu este vídeo' : 'Você ainda não assistiu este vídeo'}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="videos-section">
      <div className="videos-container">
        <div className="videos-header">
          <h2 className="videos-title">VÍDEOS</h2>
        </div>

        <div className="videos-grid">
          {visibleVideos.map((video) => (
            <article key={video.id} className="video-card" data-watched={isWatched(video.id)}>
              <div className="video-thumbnail">
                <div className="video-placeholder">
                  <span className="video-icon">{video.icon}</span>
                </div>
                <button className="video-play-btn" aria-label={`Assistir ${video.title}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              
              <div className="video-content">
                <div className="video-meta">
                  <span className="video-category">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {video.category}
                  </span>
                  <span className="video-duration">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {video.duration}
                  </span>
                </div>
                
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
                
                <div className="video-footer">
                  <button 
                    className="video-watch-btn"
                    onClick={() => markAsWatched(video.id)}
                  >
                    <span>Assistir</span>
                  </button>
                  
                  <button 
                    className={`video-eye-indicator ${isWatched(video.id) ? 'watched' : 'unwatched'}`}
                    aria-label={isWatched(video.id) ? 'Vídeo já assistido' : 'Vídeo não assistido'}
                    title={isWatched(video.id) ? 'Você já assistiu este vídeo' : 'Você ainda não assistiu este vídeo'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="videos-footer">
          <button 
            className="videos-see-all"
            onClick={() => setShowAllVideos(true)}
          >
            Ver tudo
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          
          <div className="videos-nav">
            <button 
              className="nav-btn nav-prev" 
              aria-label="Vídeo anterior"
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
              aria-label="Próximo vídeo"
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
    </section>
  )
}
