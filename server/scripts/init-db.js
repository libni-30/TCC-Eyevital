// Script de inicialização/migração simples para o banco Postgres (Neon)
// Executa criação de tabelas idempotente. Rode com: npm run db:init
import 'dotenv/config'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from 'pg'
const { Pool } = pkg

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Carrega .env local do backend e o .env raiz (fallback BD_UM)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })

function sanitize(v) {
	if (!v) return v
	return v.replace(/^"|"$/g, '').trim()
}

const connectionString = sanitize(process.env.DATABASE_URL) || sanitize(process.env.BD_UM)
if (!connectionString) {
	console.error('\u274c Nenhuma variável DATABASE_URL ou BD_UM definida. Preencha .env antes de rodar o script.')
	process.exit(1)
}

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })

async function run() {
	console.log('-> Conectando ao banco...')
	await pool.query('SELECT 1')
	console.log('-> Criando tabela users (se não existir)...')
	await pool.query(`
		CREATE TABLE IF NOT EXISTS users (
			id BIGSERIAL PRIMARY KEY,
			email TEXT UNIQUE NOT NULL,
			username TEXT,
			password_hash TEXT NOT NULL,
			created_at TIMESTAMPTZ DEFAULT now()
		);
	`)
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
		console.log('-> Índices...')
		await pool.query('CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);')
		await pool.query('CREATE INDEX IF NOT EXISTS idx_consultas_user_id ON consultas(user_id);')
		await pool.query('CREATE INDEX IF NOT EXISTS idx_educacao_created_at ON educacao_materials(created_at);')

	console.log('\u2705 Migração concluída.')
}

run()
	.catch(err => {
		console.error('Erro durante migração:', err)
		process.exit(1)
	})
	.finally(() => pool.end())
