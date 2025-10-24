import React, { useEffect, useMemo, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

function normalize(str: string) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const CORRECT_ANSWERS = [
  'estrabismo',
  'desvio ocular',
  'desvios oculares'
]

const explanation = (
  <div style={{ color: '#0f172a' }}>
    <p style={{ margin: '8px 0 12px' }}>Eles se referem ao <b>estrabismo</b>.</p>
    <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.6, color: '#0f172a' }}>
      <li><b>Esotropia</b> → olho desvia para <b>dentro</b>.</li>
      <li><b>Exotropia</b> → olho desvia para <b>fora</b>.</li>
      <li><b>Hipertropia</b> → olho desvia para <b>cima</b>.</li>
      <li><b>Hipotropia</b> → olho desvia para <b>baixo</b>.</li>
    </ul>
    <p style={{ marginTop: 12 }}>Essas são as classificações do estrabismo conforme a direção do desvio ocular.</p>
  </div>
)

const QuickTestModal: React.FC<Props> = ({ open, onClose }) => {
  const [answer, setAnswer] = useState('')
  const normalized = useMemo(() => normalize(answer), [answer])
  const isAnswered = normalized.length > 0
  const [showResult, setShowResult] = useState(false)
  const isCorrect = showResult && isAnswered && (
    CORRECT_ANSWERS.some(a => normalized === normalize(a) || normalized.includes('estrabism'))
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quicktest-title"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(620px, 92vw)', background: '#fff', borderRadius: 16,
          boxShadow: '0 15px 40px rgba(0,0,0,.22)', padding: '22px 22px 18px'
        }}
      >
        {/* Estilos auxiliares locais (placeholder, hover) */}
        <style>{`
          .qtm-input::placeholder { color: #64748b; opacity: 1; }
          .qtm-close:hover { background: #e2e8f0; }
          .qtm-clear:hover { background: #f1f5f9; }
        `}</style>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <h3 id="quicktest-title" style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Responda ao teste rápido</h3>
          <button
            aria-label="Fechar"
            title="Fechar"
            onClick={onClose}
            className="qtm-close"
            style={{
              width: 32, height: 32, borderRadius: 9999,
              background: '#f8fafc', border: '1px solid #e2e8f0',
              color: '#0f172a', fontSize: 20, lineHeight: 1,
              display: 'grid', placeItems: 'center', cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        <p style={{ margin: '8px 0 14px', color: '#334155' }}>
          Os termos apresentados (esotropia, exotropia, hipertropia, hipotropia) se referem a qual condição ocular?
        </p>

        <div style={{ position: 'relative', marginTop: 6 }}>
      <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Digite sua resposta aqui..."
            autoFocus
            className="qtm-input"
            style={{
              width: '100%', fontSize: 16, padding: '12px 44px 12px 14px',
              borderRadius: 12, outline: 'none', color: '#0f172a',
        border: showResult && isAnswered ? (isCorrect ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5e1',
              background: '#ffffff'
            }}
          />

          {showResult && isAnswered && (
            <span
              aria-hidden
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                width: 26, height: 26, borderRadius: '50%',
                background: isCorrect ? '#16a34a' : '#dc2626', color: '#fff',
                display: 'grid', placeItems: 'center', fontWeight: 700
              }}
            >
              {isCorrect ? '✓' : '✕'}
            </span>
          )}
        </div>

        {/* Feedback */}
        {showResult && isAnswered && (
      <div style={{
            marginTop: 14, padding: '12px 14px', borderRadius: 12,
            background: isCorrect ? 'rgba(22,163,74,.08)' : 'rgba(220,38,38,.08)',
            border: `1px solid ${isCorrect ? 'rgba(22,163,74,.35)' : 'rgba(220,38,38,.35)'}`
          }}>
            {isCorrect ? (
              <div>
        <strong style={{ color: '#16a34a', fontSize: 16, display: 'block', marginBottom: 6 }}>Correto!</strong>
        <div style={{ marginTop: 6, color: '#0f172a' }}>{explanation}</div>
              </div>
            ) : (
              <div>
        <strong style={{ color: '#dc2626', fontSize: 16, display: 'block', marginBottom: 6 }}>Resposta incorreta.</strong>
        <p style={{ margin: '6px 0 8px', color: '#0f172a' }}>A resposta correta é: <b>Estrabismo</b>.</p>
        <div style={{ color: '#0f172a' }}>{explanation}</div>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button
            onClick={() => { setAnswer(''); setShowResult(false) }}
            className="qtm-clear"
            style={{
              padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer',
              color: '#0f172a', fontWeight: 600
            }}
          >Limpar</button>
          <button
            onClick={() => setShowResult(true)}
            style={{
              padding: '10px 16px', borderRadius: 10, border: 0,
              background: '#06b6d4', color: '#fff', cursor: 'pointer', fontWeight: 600
            }}
          >Concluir</button>
        </div>
      </div>
    </div>
  )
}

export default QuickTestModal
