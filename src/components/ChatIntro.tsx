import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ChatIntroProps {
  limit?: number
}

export default function ChatIntro({ limit = 10 }: ChatIntroProps) {
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)

  const handleSend = () => {
    const txt = message.trim()
    if (!txt) return
    if (count >= limit) return
    // Aqui poderemos integrar com backend/chat no futuro.
    setCount((c) => c + 1)
    setMessage('')
  }

  const disabled = count >= limit

  return (
    <section className="chat-section" aria-labelledby="chat-title">
      <div className="chat-container">
        <h2 id="chat-title" className="chat-title">Bem vindo ao chat!</h2>
        <p className="chat-desc">
          Aqui, você pode tirar suas dúvidas e conversar com um profissional. Você tem direito a até {limit}
          {' '}perguntas. Após isso, será direcionado para o telefone de uma clínica, onde poderá continuar o atendimento.
        </p>

        {!disabled && (
          <h3 className="chat-subtitle">Pergunte à vontade!</h3>
        )}

        {disabled && (
          <div className="chat-limit-alert" role="alert" aria-live="assertive">
            <p>
              Você chegou ao limite de {limit} perguntas. Para continuar recebendo suporte,
              clique abaixo para acessar os contatos das clínicas e profissionais especializados.
            </p>
            <div className="chat-limit-actions">
              <Link to="/contato" className="contacts-btn">Contatos</Link>
            </div>
          </div>
        )}

        <div className="chat-box" role="region" aria-label="Caixa de mensagem">
          <div className="chat-input-wrapper">
            <input
              type="text"
              className="chat-input"
              placeholder="Digite aqui"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={disabled}
              aria-disabled={disabled}
            />
            <button
              type="button"
              className="chat-send-btn"
              onClick={handleSend}
              disabled={disabled}
              aria-label="Enviar mensagem"
              title={disabled ? 'Limite de perguntas atingido' : 'Enviar'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
              </svg>
            </button>
          </div>
          <div className="chat-hint" aria-live="polite">
            {count < limit ? (
              <span>{count}/{limit} perguntas</span>
            ) : (
              <span>Limite de {limit} perguntas atingido.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
