import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '../lib/auth'
import { getMe, login as loginFn, register as registerFn, logout as logoutFn } from '../lib/auth'

type AuthState = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username?: string) => Promise<void>
  logout: () => Promise<void>
}

const Ctx = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const u = await getMe()
      setUser(u)
      setLoading(false)
    })()
  }, [])

  async function login(email: string, password: string) {
    setLoading(true)
    try {
      const { user } = await loginFn(email, password)
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  async function register(email: string, password: string, username?: string) {
    setLoading(true)
    try {
      const { user } = await registerFn(email, password, username)
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setLoading(true)
    try {
      await logoutFn()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
