// Declaração ambiente para evitar erro de tipos quando Supabase não está instalado
// e permitir build sem dependência até que o usuário opte por usá-lo.
declare module '@supabase/supabase-js' {
  export const createClient: any
}
