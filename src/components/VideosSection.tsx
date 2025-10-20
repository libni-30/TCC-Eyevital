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
  }
]

export default function VideosSection({ videos = defaultVideos }: VideosSectionProps) {
  return (
    <section className="videos-section">
      <div className="videos-container">
        <div className="videos-header">
          <h2 className="videos-title">VÍDEOS</h2>
          <div className="videos-nav">
            <button className="nav-btn nav-prev" aria-label="Vídeo anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="nav-btn nav-next" aria-label="Próximo vídeo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="videos-grid">
          {videos.map((video) => (
            <article key={video.id} className="video-card">
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
                
                <button className="video-watch-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>Assistir</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="videos-footer">
          <button className="videos-see-all">
            Ver tudo
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
