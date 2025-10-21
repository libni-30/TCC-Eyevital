import React, { useState } from 'react'
import AuthModal from './AuthModal'
import { requestPasswordReset } from '../lib/auth'

interface Props {
  open: boolean
  onClose: () => void
}

const ForgotPasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      const res = await requestPasswordReset(email)
      if (res.ok) setMessage(res.message)
      else setError(res.message)
    } catch (err: any) {
      setError(err?.message || 'Falha ao solicitar recuperação de senha')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthModal open={open} onClose={onClose} title="Recuperar senha">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label htmlFor="fp-email" style={{ fontWeight: 600 }}>Seu e-mail</label>
        <input
          id="fp-email"
          type="email"
          required
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }}
        />
        {message && <div style={{ color: '#059669', fontWeight: 600 }}>{message}</div>}
        {error && <div style={{ color: '#dc2626', fontWeight: 600 }}>{error}</div>}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar instruções'}
        </button>
      </form>
      <p style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
        Enviaremos um e-mail com sua nova senha ou instruções para redefinição.
      </p>
    </AuthModal>
  )
}

export default ForgotPasswordModal
