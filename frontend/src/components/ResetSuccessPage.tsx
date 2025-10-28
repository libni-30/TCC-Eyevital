import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ResetSuccessPage: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/auth'), 2000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.06)', padding: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Senha redefinida</h1>
        <p style={{ color: '#059669', fontWeight: 600 }}>Sua senha foi alterada com sucesso.</p>
        <p style={{ marginTop: 6, color: '#6b7280' }}>Você será redirecionado para a tela de login em instantes...</p>
      </div>
    </div>
  )
}

export default ResetSuccessPage
