import { get, post } from './api'
import { getAuthPaths, getSupabaseConfig, getDevResetKey } from './env'

export type User = {
  id: string
  email: string
  username?: string
}

export type AuthResponse = { user: User; token?: string }

// Estratégia: se SUPABASE estiver configurado, usa supabase-js; senão, usa REST
let supabase: any | undefined
const supaCfg = getSupabaseConfig()
if (supaCfg) {
  // Carrega supabase dinamicamente APENAS quando configurado
  const moduleName = '@supabase/supabase-js'
  // @ts-ignore - dica ao bundler do Vite para não resolver estaticamente
  import(/* @vite-ignore */ moduleName).then(({ createClient }) => {
    supabase = createClient(supaCfg.url, supaCfg.key)
  })
}

export async function register(email: string, password: string, username?: string): Promise<AuthResponse> {
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username } } })
    if (error) throw error
    return { user: { id: data.user.id, email: data.user.email, username: data.user.user_metadata?.username } }
  }
  const { register: path } = getAuthPaths()
  const res = await post<AuthResponse, { email: string; password: string; username?: string }>(path, { email, password, username })
  if (res?.token) {
    try { localStorage.setItem('token', res.token) } catch {}
  }
  return res
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return { user: { id: data.user.id, email: data.user.email, username: data.user.user_metadata?.username } }
  }
  const { login: path } = getAuthPaths()
  const res = await post<AuthResponse, { email: string; password: string }>(path, { email, password })
  if (res?.token) {
    try { localStorage.setItem('token', res.token) } catch {}
  }
  return res
}

export async function getMe(): Promise<User | null> {
  if (supabase) {
    const { data, error } = await supabase.auth.getUser()
    if (error) return null
    const u = data.user
    return u ? { id: u.id, email: u.email, username: u.user_metadata?.username } : null
  }
  const { me: path } = getAuthPaths()
  try {
    return await get<User>(path)
  } catch {
    return null
  }
}

export async function logout(): Promise<void> {
  if (supabase) {
    await supabase.auth.signOut()
    return
  }
  const { logout: path } = getAuthPaths()
  await post<void, Record<string, never>>(path, {})
  try { localStorage.removeItem('token') } catch {}
  try { sessionStorage.removeItem('token') } catch {}
}

// DEV/local only: solicita reset de senha
export async function requestPasswordReset(email: string): Promise<{ ok: boolean; message: string }> {
  if (supabase) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return { ok: true, message: 'Enviamos instruções de reset para seu e-mail.' }
  }
  // backend dev endpoint cria uma nova senha e aplica direto
  const newPassword = Math.random().toString(36).slice(-8)
  const res = await post<{ ok: boolean }>(
    '/auth/dev-reset-password',
    { email, newPassword },
    { headers: { 'x-dev-key': getDevResetKey() } }
  )
  if (res?.ok) {
    return { ok: true, message: `Sua nova senha foi gerada e enviada para ${email}.` }
  }
  return { ok: false, message: 'Não foi possível resetar a senha.' }
}
