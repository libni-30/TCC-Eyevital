import React, { useState } from 'react'
import FaqModal from './FaqModal'
import './Faq.css'

export interface FaqItem {
  id: string
  question: string
  answer?: string
}

interface FaqGridProps {
  items: FaqItem[]
}

const FaqGrid: React.FC<FaqGridProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null)

  const current = items.find(i => i.id === openId)

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-container">
        <h2 id="faq-title" className="faq-title">Perguntas Frequentes:</h2>
        <div className="faq-grid" role="list">
          {items.map((it) => (
            <button key={it.id} role="listitem" className="faq-card" onClick={() => setOpenId(it.id)}>
              <span className="faq-question">{it.question}</span>
            </button>
          ))}
        </div>
      </div>

      <FaqModal
        open={!!openId}
        onClose={() => setOpenId(null)}
        title={current?.question || ''}
      >
        {current?.answer ? (
          <p>{current.answer}</p>
        ) : (
          <p>Resposta em breve. Entraremos com o conteúdo oficial assim que você enviar as respostas.</p>
        )}
      </FaqModal>
    </section>
  )
}

export default FaqGrid
