import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '../lib/auth'

const ResetPasswordPage: React.FC = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const token = useMemo(() => (params.get('token') || '').trim(), [params])
  const [pwd, setPwd] = useState('')
  const [pwd2, setPwd2] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) setError('Link inválido ou ausente')
  }, [token])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    if (!token) { setError('Token inválido'); return }
    if (!pwd || pwd.length < 6) { setError('A senha deve ter ao menos 6 caracteres'); return }
    if (pwd !== pwd2) { setError('As senhas não coincidem'); return }
    setLoading(true)
    try {
      const res = await resetPassword(token, pwd)
      if (res.ok) {
        navigate('/reset-success')
      } else {
        setError(res.message || 'Falha ao redefinir a senha')
      }
    } catch (err: any) {
      setError(err?.message || 'Falha ao redefinir a senha')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.06)', padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Redefinir senha</h1>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ fontWeight: 600 }}>Nova senha</label>
          <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} required minLength={6} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} />
          <label style={{ fontWeight: 600 }}>Confirmar nova senha</label>
          <input type="password" value={pwd2} onChange={e => setPwd2(e.target.value)} required minLength={6} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} />
          {message && <div style={{ color: '#059669', fontWeight: 600 }}>{message}</div>}
          {error && <div style={{ color: '#dc2626', fontWeight: 600 }}>{error}</div>}
          <button type="submit" disabled={loading} className="submit-btn">{loading ? 'Salvando...' : 'Salvar nova senha'}</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
