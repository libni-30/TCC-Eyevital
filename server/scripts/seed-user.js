// Insere um usuário de teste no banco Neon.
// Uso: node scripts/seed-user.js [email opcional]
import 'dotenv/config'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'
import pkg from 'pg'
const { Pool } = pkg

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })

function sanitize(v){ return v ? v.replace(/^"|"$/g,'').trim() : v }
const connectionString = sanitize(process.env.DATABASE_URL) || sanitize(process.env.BD_UM)
if(!connectionString){
  console.error('Faltando DATABASE_URL/BD_UM no .env')
  process.exit(1)
}

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })

async function main(){
  const emailArg = process.argv[2]
  const passwordArg = process.argv[3]
  const usernameArg = process.argv[4]
  const ts = Date.now()
  const email = emailArg || `seed_${ts}@example.com`
  const username = usernameArg || 'SeedUser_' + ts
  const password = passwordArg || 'Senha123!'
  const hash = await bcrypt.hash(password, 10)
  await pool.query('BEGIN')
  try {
    const r = await pool.query(
      'INSERT INTO users (email, username, password_hash) VALUES ($1,$2,$3) ON CONFLICT (email) DO UPDATE SET password_hash = $3, username = $2 RETURNING id, email, username, created_at',
      [email, username, hash]
    )
    await pool.query('COMMIT')
    console.log('Usuario criado/atualizado:')
    console.log(r.rows[0])
    console.log('Credenciais:')
    console.log({ email, password })
  } catch(err){
    await pool.query('ROLLBACK')
    console.error('Erro ao inserir/atualizar usuário:', err)
    process.exitCode = 1
  } finally {
    pool.end()
  }
}

main()
