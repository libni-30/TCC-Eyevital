import ConsultasSection from './ConsultasSection'

export default function ConsultasPage() {
  const handleImageError = (img: HTMLImageElement): void => {
    img.onerror = null
    img.src = 'assets/images/placeholder.png'
  }
  return (
    <main className="consultas-page" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 24 }}>Área de Consultas</h1>
        <p style={{ marginBottom: 40, lineHeight: 1.5 }}>
          Agendamento e acompanhamento de consultas com profissionais parceiros.
        </p>
      </section>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <ConsultasSection onImageError={handleImageError} />
      </div>
    </main>
  )
}
