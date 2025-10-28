import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ResetRequestedPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = new URLSearchParams(location.search).get('email') || ''

  useEffect(() => {
    const t = setTimeout(() => navigate('/auth'), 2500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 460, background: '#fff', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.06)', padding: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Verifique seu e-mail</h1>
        <p style={{ color: '#059669', fontWeight: 600 }}>
          Enviamos um link de redefinição {email ? `para ${email}` : 'para seu e-mail'}.
        </p>
        <p style={{ marginTop: 6, color: '#6b7280' }}>
          O link expira em 30 minutos. Você será redirecionado para a tela de login automaticamente.
        </p>
      </div>
    </div>
  )
}

export default ResetRequestedPage
