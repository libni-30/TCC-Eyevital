# TCC EyeVital - Backend API

API REST para o sistema EyeVital (consultas oftalmológicas e conteúdo educativo).

## 🚀 Configuração Inicial

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie o arquivo `server/.env` com:
```env
DATABASE_URL='postgresql://user:pass@host/db?sslmode=require'
JWT_SECRET='sua-chave-secreta-aqui'
PORT=3001
HOST=0.0.0.0
```

### 3. Inicializar banco de dados (apenas primeira vez)
```bash
npm run db:init
```

**IMPORTANTE:** Execute `npm run db:init` **apenas na primeira vez** ou após limpar o banco. O script:
- Cria todas as tabelas necessárias
- Cria índices
- Registra a migração no banco (v1)
- Nas execuções seguintes, detecta que já foi inicializado e não recria tabelas

### 4. Iniciar servidor
```bash
npm run dev    # Modo desenvolvimento (auto-reload)
npm start      # Modo produção
```

## 📊 Estrutura do Banco

### Tabelas
- **users** - Usuários do sistema (auth)
- **consultas** - Agendamentos/consultas (privado)
- **educacao_materials** - Conteúdo educativo (público)
- **schema_migrations** - Controle de versão do schema

### Comportamento de Inicialização

#### ❌ Antes (Problema)
```
Servidor inicia → CREATE TABLE IF NOT EXISTS (sempre)
                → CREATE INDEX IF NOT EXISTS (sempre)
                → Logs poluídos a cada restart
                → Overhead desnecessário
```

#### ✅ Depois (Solução)
```
Primeira vez:
  npm run db:init → Cria tabelas e índices
                  → Registra migração v1 em schema_migrations

Restarts seguintes:
  npm run dev → Valida se tabelas existem (query rápida)
              → Não recria nada
              → Log limpo: "✅ Schema validado"
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
npm run dev              # Inicia servidor em modo dev (auto-reload)
npm start                # Inicia servidor em modo produção
npm run db:init          # Inicializa banco (apenas primeira vez)
npm run db:seed:user     # Cria usuário de teste
```

## 🐛 Troubleshooting

### "Tabelas não encontradas"
```bash
npm run db:init
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
2. Libere porta no firewall (comando acima)
3. Teste de outro dispositivo: `http://SEU_IP:3001/health`

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

- **express** - Framework web
- **pg** - Cliente PostgreSQL
- **bcryptjs** - Hash de senhas
- **jsonwebtoken** - Autenticação JWT
- **cors** - Cross-origin requests
- **dotenv** - Variáveis de ambiente
