// Utilitário para ler variáveis de ambiente do Vite com validação simples

type Env = {
  VITE_API_BASE_URL?: string
  URL_BASE_API_VITE?: string  // Formato usado no Vercel
  URL_BASE_DA_API_VITE?: string  // Formato antigo (compatibilidade)
  VITE_AUTH_LOGIN_PATH?: string
  VITE_AUTH_REGISTER_PATH?: string
  VITE_AUTH_ME_PATH?: string
  VITE_AUTH_LOGOUT_PATH?: string
  VITE_SUPABASE_URL?: string
  VITE_SUPABASE_ANON_KEY?: string
  VITE_DEV_RESET_KEY?: string
  // Acrescente aqui outras chaves se necessário
}

// Read Vite envs and allow a last-resort runtime fallback via window.__ENV__ (if present)
const viteEnv = import.meta.env as unknown as Env
// @ts-ignore
const runtimeEnv = (typeof window !== 'undefined' ? (window as any).__ENV__ : undefined) as Partial<Env> | undefined
const env = { ...(viteEnv || {}), ...(runtimeEnv || {}) } as Env

export function getApiBaseUrl(): string | undefined {
  // Aceita todos os formatos: local (VITE_API_BASE_URL), Vercel (URL_BASE_API_VITE), e antigo (URL_BASE_DA_API_VITE)
  const url = (env.VITE_API_BASE_URL || env.URL_BASE_API_VITE || env.URL_BASE_DA_API_VITE)?.trim()
  if (!url) return undefined
  try {
    // Normaliza e valida minimamente a URL
    const u = new URL(url)
    return u.toString().replace(/\/$/, '')
  } catch {
    console.warn('URL da API inválida. Defina VITE_API_BASE_URL ou URL_BASE_API_VITE no .env')
    return undefined
  }
}

export function getAuthPaths() {
  return {
    login: env.VITE_AUTH_LOGIN_PATH?.trim() || '/auth/login',
    register: env.VITE_AUTH_REGISTER_PATH?.trim() || '/auth/register',
    me: env.VITE_AUTH_ME_PATH?.trim() || '/auth/me',
    logout: env.VITE_AUTH_LOGOUT_PATH?.trim() || '/auth/logout',
  }
}

export function getSupabaseConfig() {
  const url = env.VITE_SUPABASE_URL?.trim()
  const key = env.VITE_SUPABASE_ANON_KEY?.trim()
  if (url && key) {
    return { url, key }
  }
  return undefined
}

export function getDevResetKey() {
  return env.VITE_DEV_RESET_KEY?.trim() || 'devkey'
}

export default env
