import QuizSection from './QuizSection'
import EstrabismoSection from './EstrabismoSection'

export default function EducacaoPage() {
  const handleImageError = (img: HTMLImageElement): void => {
    img.onerror = null
    img.src = 'assets/images/placeholder.png'
  }
  return (
    <main className="educacao-page" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
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
  )
}
