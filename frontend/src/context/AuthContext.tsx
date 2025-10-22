import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '../lib/auth'
import { getMe, login as loginFn, register as registerFn, logout as logoutFn } from '../lib/auth'
import Toast from '../components/Toast'

type ToastData = {
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

type AuthState = {
  user: User | null
  loading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  register: (email: string, password: string, username?: string) => Promise<void>
  logout: () => Promise<void>
}

const Ctx = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<ToastData | null>(null)

  useEffect(() => {
    ;(async () => {
      const u = await getMe()
      setUser(u)
      setLoading(false)
    })()
  }, [])

  async function login(email: string, password: string, rememberMe: boolean = false) {
    setLoading(true)
    try {
      const { user } = await loginFn(email, password)
      // Se não for lembrar, mover token para sessão
      try {
        const token = localStorage.getItem('token')
        if (token) {
          if (!rememberMe) {
            sessionStorage.setItem('token', token)
            localStorage.removeItem('token')
          }
        }
      } catch {}
      setUser(user)
      // Mostrar toast de sucesso no login
      setToast({
        message: `Bem-vindo, ${user.username || user.email}! Login realizado com sucesso.`,
        type: 'success'
      })
    } finally {
      setLoading(false)
    }
  }

  async function register(email: string, password: string, username?: string) {
    setLoading(true)
    try {
      const { user } = await registerFn(email, password, username)
      setUser(user)
      // Mostrar toast de sucesso no registro
      setToast({
        message: `Conta criada com sucesso! Bem-vindo, ${user.username || user.email}!`,
        type: 'success'
      })
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setLoading(true)
    try {
      await logoutFn()
      const userName = user?.username || user?.email || 'Usuário'
      setUser(null)
      // Mostrar toast de logout
      setToast({
        message: `Até logo, ${userName}! Você foi desconectado com sucesso.`,
        type: 'info'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </Ctx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
