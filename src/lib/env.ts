// Utilitário para ler variáveis de ambiente do Vite com validação simples

type Env = {
  VITE_API_BASE_URL?: string
  VITE_AUTH_LOGIN_PATH?: string
  VITE_AUTH_REGISTER_PATH?: string
  VITE_AUTH_ME_PATH?: string
  VITE_AUTH_LOGOUT_PATH?: string
  VITE_SUPABASE_URL?: string
  VITE_SUPABASE_ANON_KEY?: string
  // Acrescente aqui outras chaves se necessário
}

const env = import.meta.env as unknown as Env

export function getApiBaseUrl(): string | undefined {
  const url = env.VITE_API_BASE_URL?.trim()
  if (!url) return undefined
  try {
    // Normaliza e valida minimamente a URL
    const u = new URL(url)
    return u.toString().replace(/\/$/, '')
  } catch {
    console.warn('VITE_API_BASE_URL inválida. Defina uma URL válida no .env')
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

export default env
