// Script de inicialização do banco de dados (executar apenas uma vez)
// Cria tabelas, índices e registra migração
// Execute com: npm run db:init
import 'dotenv/config'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from 'pg'
const { Pool } = pkg

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })

function sanitize(v) {
  if (!v) return v
  return v.replace(/^"|"$/g, '').trim()
}

const connectionString = sanitize(process.env.DATABASE_URL) || sanitize(process.env.BD_UM)
if (!connectionString) {
  console.error('❌ DATABASE_URL não definido em .env')
  process.exit(1)
}

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })

async function run() {
  console.log('🔄 Inicializando banco de dados...')
  
  try {
    await pool.query('SELECT 1')
    console.log('✅ Conectado ao banco')

    // Tabela de controle de migrações
    console.log('📊 Criando tabela de migrações...')
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version INTEGER PRIMARY KEY,
        applied_at TIMESTAMPTZ DEFAULT now(),
        description TEXT
      );
    `)

    // Verificar se migração v1 já foi aplicada
    const migrationCheck = await pool.query(
      'SELECT version FROM schema_migrations WHERE version = 1'
    )

    if (migrationCheck.rowCount > 0) {
      console.log('ℹ️  Schema já inicializado (migração v1 aplicada anteriormente)')
      console.log('✅ Nenhuma ação necessária')
      return
    }

    console.log('📊 Criando tabela users...')
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `)

    console.log('📊 Criando tabela educacao_materials...')
    await pool.query(`
      CREATE TABLE IF NOT EXISTS educacao_materials (
        id BIGSERIAL PRIMARY KEY,
        titulo TEXT NOT NULL,
        conteudo TEXT,
        categoria TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `)

    console.log('📊 Criando tabela consultas...')
    await pool.query(`
      CREATE TABLE IF NOT EXISTS consultas (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        titulo TEXT NOT NULL,
        descricao TEXT,
        data_horario TIMESTAMPTZ,
        status TEXT DEFAULT 'pendente',
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `)

    console.log('📊 Criando índices...')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_consultas_user_id ON consultas(user_id);')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_educacao_created_at ON educacao_materials(created_at);')

    // Registrar migração como aplicada
    await pool.query(
      "INSERT INTO schema_migrations (version, description) VALUES (1, 'Schema inicial: users, consultas, educacao_materials')"
    )

    console.log('✅ Banco de dados inicializado com sucesso!')
    console.log('✅ Migração v1 registrada')
    
  } catch (err) {
    console.error('❌ Erro ao inicializar banco:', err)
    throw err
  }
}

run()
	.catch(err => {
		console.error('Erro durante migração:', err)
		process.exit(1)
	})
	.finally(() => pool.end())
