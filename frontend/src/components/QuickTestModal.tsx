import React, { useEffect, useMemo, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  // Quando fornecido, aplica regra: usuário logado só responde 1x
  userId?: string
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

const STORAGE_PREFIX = 'quicktest:estrabismo:'

type SavedAttempt = {
  answer: string
  at: number
}

const QuickTestModal: React.FC<Props> = ({ open, onClose, userId }) => {
  const [answer, setAnswer] = useState('')
  const normalized = useMemo(() => normalize(answer), [answer])
  const isAnswered = normalized.length > 0
  const [showResult, setShowResult] = useState(false)
  const [locked, setLocked] = useState(false) // bloqueio por já ter respondido (apenas logado)
  const [showAlreadyMsg, setShowAlreadyMsg] = useState(false)
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

  // Carrega tentativa salva (se houver) para usuário logado e aplica bloqueio
  useEffect(() => {
    if (!open) return
    if (!userId) {
      // visitante: sem bloqueio
      setLocked(false)
      setShowAlreadyMsg(false)
      return
    }
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + userId)
      if (raw) {
        const saved = JSON.parse(raw) as SavedAttempt
        setAnswer(saved?.answer || '')
        // Mostra sempre o resultado e mensagem de já respondido
        setShowResult(true)
        setLocked(true)
        setShowAlreadyMsg(true)
      } else {
        // primeira vez desse usuário
        setLocked(false)
        setShowAlreadyMsg(false)
        setShowResult(false)
        setAnswer('')
      }
    } catch {
      // Em caso de erro de parse, não bloquear
      setLocked(false)
      setShowAlreadyMsg(false)
    }
  }, [open, userId])

  function persistIfEligible() {
    if (!userId) return // visitantes não persistem
    // Se ainda não havia tentativa salva, salvar a primeira
    try {
      const key = STORAGE_PREFIX + userId
      if (!localStorage.getItem(key)) {
        const payload: SavedAttempt = { answer, at: Date.now() }
        localStorage.setItem(key, JSON.stringify(payload))
      }
    } catch {}
  }

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
          position: 'relative',
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
        {/* Mensagem de já respondido (apenas logado) */}
        {showAlreadyMsg && (
          <div style={{
            marginBottom: 10,
            padding: '10px 12px',
            borderRadius: 10,
            background: 'rgba(2,132,199,.08)',
            border: '1px solid rgba(2,132,199,.35)',
            color: '#0f172a',
            fontSize: 14
          }}>
            Você já respondeu este teste com sua conta. Não é possível enviar outra resposta.
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <h3 id="quicktest-title" style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Responda ao teste rápido</h3>
      {/* Botão X sempre no canto superior direito */}
          <button
            aria-label="Fechar"
            title="Fechar"
            onClick={onClose}
            className="qtm-close"
      style={{
        position: 'absolute', top: -10, right: -10, zIndex: 2,
        width: 40, height: 40, borderRadius: 9999,
        background: '#ffffff', border: '2px solid #cbd5e1',
        color: '#0f172a', fontSize: 22, lineHeight: 1,
        display: 'grid', placeItems: 'center', cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,.12)'
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
            onChange={(e) => {
              if (locked) return
              setAnswer(e.target.value)
            }}
            placeholder="Digite sua resposta aqui..."
            autoFocus
            className="qtm-input"
            style={{
              width: '100%', fontSize: 16, padding: '12px 44px 12px 14px',
              borderRadius: 12, outline: 'none', color: '#0f172a',
        border: showResult && isAnswered ? (isCorrect ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5e1',
              background: locked ? '#f8fafc' : '#ffffff'
            }}
            disabled={locked}
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
            onClick={() => { if (!locked) { setAnswer(''); setShowResult(false) } }}
            className="qtm-clear"
            style={{
              padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', background: locked ? '#f1f5f9' : '#fff', cursor: locked ? 'not-allowed' : 'pointer',
              color: '#0f172a', fontWeight: 600
            }}
            disabled={locked}
          >Limpar</button>
          <button
            onClick={() => {
              setShowResult(true)
              if (!locked) {
                // salva primeira tentativa do usuário logado (se houver)
                persistIfEligible()
                // se estava logado, trave próximas tentativas
                if (userId) {
                  setLocked(true)
                  setShowAlreadyMsg(true)
                }
              }
            }}
            style={{
              padding: '10px 16px', borderRadius: 10, border: 0,
              background: locked ? '#94a3b8' : '#06b6d4', color: '#fff', cursor: locked ? 'not-allowed' : 'pointer', fontWeight: 600
            }}
            disabled={locked && !!userId}
          >Concluir</button>
        </div>
      </div>
    </div>
  )
}

export default QuickTestModal
