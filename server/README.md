# TCC EyeVital - Backend API

API REST para o sistema EyeVital (consultas oftalmológicas e conteúdo educativo).

## ⚠️ ATUALIZAÇÃO IMPORTANTE: Migração para Prisma ORM

Este servidor foi migrado de SQL manual para **Prisma ORM** para garantir segurança em produção.

**� Guias de Migração:**
- `QUICK-START.txt` - Guia rápido visual
- `MIGRATION-SUMMARY.md` - Resumo executivo
- `PRISMA-DEPLOY-GUIDE.md` - Guia completo de deploy

---

## �🚀 Configuração Inicial

### 1. Instalar dependências
```bash
npm install
```

Isso irá instalar todas as dependências incluindo Prisma e gerar automaticamente o Prisma Client.

### 2. Configurar variáveis de ambiente
Crie o arquivo `server/.env` com:
```env
DATABASE_URL='postgresql://user:pass@host.neon.tech/db?sslmode=require'
JWT_SECRET='sua-chave-secreta-aqui'
NODE_ENV='development'
PORT=3001
HOST=0.0.0.0
```

### 3. Sincronizar schema do banco (apenas primeira vez)
```bash
npm run db:push
```

Este comando sincroniza o schema Prisma com o banco de dados de forma segura, **sem perder dados existentes**.

**⚠️ IMPORTANTE:** Não use mais `npm run db:init` - ele foi substituído pelo Prisma.

### 4. Iniciar servidor
```bash
npm run dev    # Modo desenvolvimento (auto-reload)
npm start      # Modo produção
```

## 📊 Estrutura do Banco (Prisma ORM)

### Models (Tabelas)
- **User** - Usuários do sistema (auth)
- **Consulta** - Agendamentos/consultas (privado)
- **EducacaoMaterial** - Conteúdo educativo (público)
- **ChatMessage** - Mensagens do chat (privado)

### Schema
O schema é definido em `prisma/schema.prisma` e gerenciado pelo Prisma Migrate.

### Comportamento de Inicialização

#### ❌ Antes (Sistema Antigo - PROBLEMA)
```
Servidor inicia → ensureSchema() executa
                → CREATE TABLE IF NOT EXISTS (sempre)
                → CREATE INDEX IF NOT EXISTS (sempre)
                → Risco de perda de dados em produção
```

#### ✅ Agora (Prisma ORM - SEGURO)
```
Desenvolvimento:
  npm run db:migrate:dev → Cria migração versionada
                         → Aplica no banco
                         → Gera Prisma Client

Produção:
  npm run db:migrate → Aplica apenas migrações pendentes
                     → NUNCA recria tabelas existentes
                     → Dados 100% seguros

Servidor inicia:
  prisma.$connect() → Apenas conecta ao banco
                    → NÃO modifica schema
                    → Log limpo
```

## 🌐 Conectividade

### Acesso Local (este computador)
O servidor escuta em `0.0.0.0:3001`, aceitando:
- http://localhost:3001
- http://127.0.0.1:3001

### Acesso Externo (outros computadores na rede)

**Status:** ⚠️ Pode não funcionar devido a:

1. **Firewall do Windows**
   - Solução: Adicionar exceção para Node.js na porta 3001
   ```powershell
   # Como Administrador
   New-NetFirewallRule -DisplayName "Node.js API 3001" -Direction Inbound -Protocol TCP -LocalPort 3001 -Action Allow
   ```

2. **Antivírus/Windows Defender**
   - Solução: Adicionar exceção para `node.exe` ou a pasta do projeto

3. **Rede Isolada (VPN/Corporativa)**
   - Sem solução: redes corporativas frequentemente bloqueiam servidores locais

4. **IP local dinâmico**
   - Descobrir IP: `ipconfig` → Procurar "Adaptador de Rede" → IPv4
   - Testar de outro PC: `http://SEU_IP_LOCAL:3001/health`

### Teste de Conectividade

```bash
# No mesmo computador
curl http://localhost:3001/health

# De outro computador na mesma rede
curl http://192.168.X.X:3001/health
```

Esperado: `{"ok":true}`

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor em modo dev (auto-reload)
npm run db:studio        # Interface visual do banco (Prisma Studio)
npm run db:migrate:dev   # Criar nova migração
npm run db:push          # Sync rápido (sem migração)

# Produção
npm start                # Inicia servidor
npm run db:migrate       # Aplicar migrações pendentes
npm run db:generate      # Re-gerar Prisma Client

# Utilities
npx prisma migrate status    # Ver status das migrações
npx prisma validate          # Validar schema.prisma
```

### ⚠️ Scripts Deprecados (não usar mais)
- ~~`npm run db:init`~~ → Use `npm run db:push`
- ~~`npm run db:seed:user`~~ → Use Prisma Studio ou crie script novo

## 🐛 Troubleshooting

### "Prisma Client não encontrado"
```bash
npm run db:generate
```

### "Can't reach database server"
Verifique:
1. Variável `DATABASE_URL` no `.env`
2. Conexão com internet (Neon é cloud)
3. Credenciais corretas

### "Migration failed"
```bash
# Ver status
npx prisma migrate status

# Forçar sincronização (dev apenas)
npm run db:push
```

### "Failed to fetch" no frontend
1. Certifique-se de que o servidor está rodando: `npm run dev`
2. Verifique o `.env` do frontend: `VITE_API_BASE_URL=http://localhost:3001`
3. Teste no navegador: http://localhost:3001/health

### Erro "EADDRINUSE" (porta em uso)
```bash
# Altere PORT no .env ou mate o processo:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Conexão externa não funciona
1. Verifique IP local: `ipconfig`
2. Libere porta no firewall:
   ```powershell
   # Como Administrador
   New-NetFirewallRule -DisplayName "Node.js API 3001" -Direction Inbound -Protocol TCP -LocalPort 3001 -Action Allow
   ```
3. Teste de outro dispositivo: `http://SEU_IP:3001/health`

### Preciso voltar ao sistema antigo?
```bash
copy index.old.js index.js
npm start
```
(Não recomendado - o novo sistema é muito mais seguro)

## 📝 Endpoints

### Públicos
- `GET /health` - Health check
- `GET /db/health` - Verifica conexão com banco
- `GET /educacao` - Lista materiais educativos
- `GET /educacao/:id` - Detalhes de um material

### Auth
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login (retorna JWT)
- `GET /auth/me` - Dados do usuário logado (requer token)
- `POST /auth/logout` - Logout (cliente)

### Consultas (requer autenticação)
- `GET /consultas` - Listar consultas do usuário
- `POST /consultas` - Criar nova consulta
- `GET /consultas/:id` - Detalhes de uma consulta
- `PUT /consultas/:id` - Atualizar consulta
- `DELETE /consultas/:id` - Deletar consulta

### Dev (apenas desenvolvimento)
- `POST /auth/dev-reset-password` - Reset de senha (requer header `x-dev-key`)

## 🔐 Segurança

- JWT com expiração de 7 dias
- Senhas hasheadas com bcrypt (10 rounds)
- CORS relaxado em dev (configurar para produção)
- Endpoints de consultas protegidos por autenticação

## 📦 Dependências

### Core
- **express** - Framework web
- **@prisma/client** - Prisma ORM (substitui pg)
- **bcryptjs** - Hash de senhas
- **jsonwebtoken** - Autenticação JWT
- **cors** - Cross-origin requests
- **dotenv** - Variáveis de ambiente

### Dev
- **prisma** - CLI do Prisma para migrações
- **nodemon** - Auto-reload em desenvolvimento

### Removidas na Migração
- ~~**pg**~~ - Substituído por @prisma/client (type-safe, migrations, etc.)
