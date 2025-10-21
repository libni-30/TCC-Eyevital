import { getApiBaseUrl } from './env'

function getToken() {
  try {
    const session = sessionStorage.getItem('token')
    if (session) return session
    return localStorage.getItem('token') || undefined
  } catch {
    return undefined
  }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export async function api<T = unknown>(
  path: string,
  options: RequestInit & { method?: HttpMethod } = {}
): Promise<T> {
  const base = getApiBaseUrl()
  if (!base) {
    throw new Error('VITE_API_BASE_URL não definida. Configure seu .env')
  }

  const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  const token = getToken()
  if (token) {
    // @ts-ignore - widen type
    headers['Authorization'] = `Bearer ${token}`
  }

  const resp = await fetch(url, {
    ...options,
    headers,
  })

  if (!resp.ok) {
    const text = await resp.text().catch(() => '')
    throw new Error(`HTTP ${resp.status} ${resp.statusText}: ${text}`)
  }

  const contentType = resp.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return (await resp.json()) as T
  }
  return (await resp.text()) as unknown as T
}

export const get = <T = unknown>(path: string, init?: RequestInit) =>
  api<T>(path, { ...init, method: 'GET' })

export const post = <T = unknown, B = unknown>(path: string, body?: B, init?: RequestInit) =>
  api<T>(path, { ...init, method: 'POST', body: body ? JSON.stringify(body) : undefined })
