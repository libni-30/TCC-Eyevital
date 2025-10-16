import 'dotenv/config'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

console.log('Testando conexão com Neon...')
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Definida' : 'NÃO DEFINIDA')

pool.query('SELECT 1 as test')
  .then(result => {
    console.log('✅ Conexão com banco OK!')
    console.log('Resultado:', result.rows[0])
    process.exit(0)
  })
  .catch(err => {
    console.error('❌ Erro na conexão:')
    console.error(err.message)
    console.error(err.stack)
    process.exit(1)
  })
