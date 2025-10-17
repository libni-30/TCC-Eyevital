import React from 'react'

interface FaqModalProps {
  open: boolean
  onClose: () => void
  title: string
  children?: React.ReactNode
}

// Reuses the same CSS classes as AuthModal for consistent look & feel
const FaqModal: React.FC<FaqModalProps> = ({ open, onClose, title, children }) => {
  return (
    <div className={`auth-overlay${open ? ' auth-open' : ''}`} aria-hidden={!open}>
      <div className={`auth-modal${open ? ' auth-modal-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="faq-modal-title">
        <button className="auth-close" aria-label="Fechar" onClick={onClose}>
          ×
        </button>
        <h3 id="faq-modal-title" className="auth-title">{title}</h3>
        <div className="auth-message" style={{ lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default FaqModal
