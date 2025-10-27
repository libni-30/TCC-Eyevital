import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import UserProfileDropdown from './UserProfileDropdown'
import './VideosPage.css'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  duration: string
  youtubeUrl?: string
}

interface VideoCardProps {
  video: Video
  isWatched: boolean
  onWatch: (video: Video) => void
}

function VideoCard({ video, isWatched, onWatch }: VideoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Extrair o ID do vídeo do YouTube da URL
  const getYouTubeThumbnail = (youtubeUrl?: string) => {
    if (!youtubeUrl) return video.thumbnail
    const videoId = youtubeUrl.split('/embed/')[1]
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  return (
    <article 
      className={`video-card ${isExpanded ? 'card-hovered' : ''}`}
      data-watched={isWatched}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="video-thumbnail">
        <img 
          src={getYouTubeThumbnail(video.youtubeUrl)} 
          alt={video.title} 
          className="video-thumbnail-img"
        />
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
        <p 
          className={`video-description ${isExpanded ? 'video-description-expanded' : ''}`}
        >
          {video.description}
        </p>
        
        <div className="video-footer">
          <button 
            className="video-watch-btn"
            onClick={() => onWatch(video)}
          >
            <span>Assistir</span>
          </button>
          
          <button 
            className={`video-eye-indicator ${isWatched ? 'watched' : 'unwatched'}`}
            aria-label={isWatched ? 'Vídeo já assistido' : 'Vídeo não assistido'}
            title={isWatched ? 'Você já assistiu este vídeo' : 'Você ainda não assistiu este vídeo'}
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

const allVideos: Video[] = [
  {
    id: '1',
    title: 'Cuidados com os olhos: Dicas para uma visão saudável',
    description: 'Neste vídeo, descubra práticas simples e eficazes para manter seus olhos limpos, protegidos e funcionando bem no dia a dia. São dicas de higiene ocular essenciais para prevenir infecções, irritações e outros problemas visuais.',
    thumbnail: '/videos/video-thumb.jpg',
    category: 'Higiene ocular',
    duration: '1:11 min',
    youtubeUrl: 'https://www.youtube.com/embed/Hk7U5PRQbP0'
  },
  {
    id: '2',
    title: 'Óculos Escuros: Proteção Ocular que Você Não Pode Ignorar',
    description: 'Os óculos escuros vão além da moda: este vídeo explica como escolher lentes que realmente protegem seus olhos dos raios UV e mudanças do dia a dia — e alerta sobre o uso inadequado que pode gerar riscos à visão.',
    thumbnail: '/videos/video-thumb.jpg',
    category: 'Mitos e vedades',
    duration: '4:51 min',
    youtubeUrl: 'https://www.youtube.com/embed/ULUfbZDZ8pQ'
  },
  {
    id: '3',
    title: ' O que é Conjuntivite? Causas, Sintomas e Cuidados',
    description: 'Saiba o que é a conjuntivite, quais são suas causas, como identificá-la e quais cuidados tomar para evitar complicações. Ideal para entender essa condição comum e proteger sua saúde ocular.',
    thumbnail: '/videos/video-thumb.jpg',
    category: 'Doenças comuns',
    duration: '12:45 min',
    youtubeUrl: 'https://www.youtube.com/embed/qMRhNjUfUjc'
  },
  {
    id: '4',
    title: 'Alimentos para Melhorar a Visão e a Saúde dos Olhos ',
    description: 'Confira quais alimentos favorecem a saúde dos seus olhos, fortalecem a visão e ajudam na prevenção de doenças oculares. Uma abordagem prática para inserir bons hábitos nutricionais no seu dia a dia.',
    thumbnail: '/videos/video-thumb.jpg',
    category: 'Alimentação',
    duration: '14:28 min',
    youtubeUrl: 'https://www.youtube.com/embed/aMCLuXfjNXo'
  },
  {
    id: '5',
    title: 'Cuidados com os Olhos',
    description: 'Um vídeo curto e educativo que mostra de forma simples e divertida os principais cuidados que devemos ter para proteger nossos olhos no dia a dia, evitando acidentes e mantendo uma boa saúde ocular.',
    thumbnail: '/videos/video-thumb.jpg',
    category: 'Higiene ocular',
    duration: '1:55 min',
    youtubeUrl: 'https://www.youtube.com/embed/kn3FjTaw-38'
  },
  {
    id: '6',
    title: 'O Que Acontece Dentro dos Seus Olhos',
    description: 'Você já se perguntou o que realmente acontece dentro dos seus olhos? Este vídeo explica, de forma visual e educativa, como o olho humano funciona, abordando estruturas internas, como a pupila e o cristalino, e revelando curiosidades que desvendam muitos mitos sobre a visão.',
    thumbnail: '/videos/video-thumb.jpg',
    category: 'Mitos e vedades',
    duration: '8:40 min',
    youtubeUrl: 'https://www.youtube.com/embed/VI3Qyjmuo0s'
  },
  {
    id: '7',
    title: 'Diagnóstico precoce pode evitar perda de visão',
    description: 'Entenda como doenças como Glaucoma, Catarata e complicações da diabetes podem afetar sua visão — e como o diagnóstico precoce e medidas simples de prevenção podem fazer a diferença.',
    thumbnail: '/videos/video-thumb.jpg',
    category: 'Doenças comuns',
    duration: '38:36 min',
    youtubeUrl: 'https://www.youtube.com/embed/g13uQmHXw_A'
  },
  {
    id: '8',
    title: 'Alimentos bons para os Olhos – os 6 Melhores',
    description: 'Descubra quais são os seis melhores alimentos para a saúde dos olhos, como eles funcionam no organismo e por que incluí-los na sua dieta pode ajudar a manter uma visão mais clara e saudável.',
    thumbnail: '/videos/video-thumb.jpg',
    category: 'Alimentação',
    duration: '19:56 min',
    youtubeUrl: 'https://www.youtube.com/embed/eW90n5xtuRw'
  }
]

export default function VideosPage() {
  const { user } = useAuth()
  const isLoggedIn = !!user

  // Estado para rastrear vídeos assistidos
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('watchedVideos')
    return stored ? new Set(JSON.parse(stored)) : new Set()
  })

  // Estado para controlar o modal de vídeo
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

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

  // Abrir vídeo
  const handleWatchVideo = (video: Video) => {
    markAsWatched(video.id)
    if (video.youtubeUrl) {
      setSelectedVideo(video)
    }
  }

  // Fechar modal de vídeo
  const handleCloseVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="videos-page">
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
      <div className="videos-hero-spacer" />

      <main className="videos-main">
        <div className="videos-page-container">
          <div className="videos-page-header">
            <h1 className="videos-page-title">VÍDEOS</h1>
            <Link to="/educacao" className="videos-back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Voltar
            </Link>
            <p className="videos-page-subtitle">
              Explore todos os vídeos educativos sobre saúde ocular
            </p>
          </div>

          <div className="videos-page-grid">
            {allVideos.map((video) => (
              <VideoCard 
                key={video.id}
                video={video}
                isWatched={isWatched(video.id)}
                onWatch={handleWatchVideo}
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

      {/* Modal de vídeo */}
      {selectedVideo && selectedVideo.youtubeUrl && (
        <div className="video-modal-overlay" onClick={handleCloseVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={handleCloseVideo}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h3 className="video-modal-title">{selectedVideo.title}</h3>
            <div className="video-modal-player">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.youtubeUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
