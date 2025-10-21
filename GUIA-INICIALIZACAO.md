# 🚀 Guia de Inicialização - TCC EyeVital

Este guia garante que o projeto funcione perfeitamente sempre que você abrir o código novamente.

## 📋 Pré-requisitos

- **Node.js** v18+ instalado
- **Git** instalado
- Conta no **Neon PostgreSQL** (ou acesso ao banco existente)
- **PowerShell** ou **cmd** no Windows

## 🔧 Configuração Inicial (Primeira vez apenas)

### 1. Clone o repositório (se ainda não tiver)
```bash
git clone https://github.com/libni-30/TCC-Eyevital.git
cd TCC-Eyevital
```

### 2. Instale as dependências do FRONTEND
```bash
npm install
```

### 3. Instale as dependências do BACKEND
```bash
cd server
npm install
cd ..
```

### 4. Configure as variáveis de ambiente

#### **Frontend** - Arquivo `.env` na raiz do projeto:
```properties
# URL da API backend
VITE_API_BASE_URL=http://localhost:3001

# Caminhos de autenticação (opcionais - já são os padrões)
VITE_AUTH_LOGIN_PATH=/auth/login
VITE_AUTH_REGISTER_PATH=/auth/register
VITE_AUTH_ME_PATH=/auth/me
VITE_AUTH_LOGOUT_PATH=/auth/logout

# Chave para reset de senha em desenvolvimento
VITE_DEV_RESET_KEY=devkey
```

#### **Backend** - Arquivo `server/.env`:
```properties
# String de conexão do PostgreSQL (Neon)
# ⚠️ IMPORTANTE: SEM ASPAS ao redor da URL!
DATABASE_URL=postgresql://neondb_owner:npg_A4YULx3PgOze@ep-sparkling-field-adqcvpzg-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Porta do servidor backend
PORT=3001

# Chave secreta para JWT (troque em produção!)
JWT_SECRET=eyevital-super-secret-key-2025-tcc-projeto

# Configuração SMTP (opcional - para envio de emails)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=seu-email@gmail.com
# SMTP_PASS=sua-senha-app
# SMTP_FROM="EyeVital <noreply@eyevital.com>"
```

### 5. Sincronize o banco de dados (Primeira vez)
```bash
cd server
npm run db:push
```

Isso criará todas as tabelas no Neon PostgreSQL.

---

## ▶️ Como Iniciar o Projeto (Toda vez que abrir)

### Método 1: Dois terminais separados (Recomendado)

#### **Terminal 1 - Backend:**
```bash
cd server
npm start
# ou: node index.js
```

Aguarde ver:
```
✅ API listening on http://localhost:3001
📡 Servidor pronto para receber conexões
🗄️  Usando Prisma ORM para gerenciar banco de dados
```

#### **Terminal 2 - Frontend:**
```bash
npm run dev
```

Aguarde ver:
```
➜  Local:   http://localhost:5173/
```

### Método 2: Script automatizado (Windows)

Crie um arquivo `start.bat` na raiz:
```batch
@echo off
echo Iniciando TCC EyeVital...
start cmd /k "cd server && npm start"
timeout /t 3 /nobreak > nul
start cmd /k "npm run dev"
echo Projeto iniciado!
```

Execute clicando duas vezes em `start.bat`.

---

## ✅ Checklist de Verificação

Antes de começar a trabalhar, verifique:

- [ ] ✅ Arquivo `.env` existe na raiz (frontend)
- [ ] ✅ Arquivo `server/.env` existe (backend)
- [ ] ✅ `DATABASE_URL` **NÃO** tem aspas ao redor
- [ ] ✅ `VITE_API_BASE_URL` está correto (http://localhost:3001)
- [ ] ✅ Node.js instalado (`node --version`)
- [ ] ✅ Dependências instaladas (`node_modules` existe)
- [ ] ✅ Backend rodando na porta 3001
- [ ] ✅ Frontend rodando na porta 5173

---

## 🔍 Resolução de Problemas

### Problema: "Failed to fetch" no login

**Causa:** Frontend não consegue conectar ao backend.

**Solução:**
1. Verifique se o backend está rodando (`http://localhost:3001`)
2. Verifique se `VITE_API_BASE_URL` está correto no `.env`
3. **REINICIE o Vite** (Ctrl+C e `npm run dev` novamente)

### Problema: "HTTP 500 Internal Server Error"

**Causa 1:** Credenciais do banco incorretas.
- Verifique `DATABASE_URL` no `server/.env`
- Certifique-se que **NÃO há aspas** ao redor da URL

**Causa 2:** Campos com nome errado (snake_case vs camelCase).
- O Prisma usa **camelCase**: `userId`, `createdAt`, `passwordHash`
- O código deve usar os mesmos nomes

**Solução:** 
```bash
cd server
npm run db:push  # Resincroniza o schema
```

### Problema: "Cannot find module 'pg'"

**Causa:** Tentando usar biblioteca antiga (`pg`) em vez do Prisma.

**Solução:**
```bash
cd server
npm install  # Reinstala dependências corretas
```

### Problema: Política de execução do PowerShell

**Solução temporária:**
```powershell
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

**Solução permanente (Admin):**
```powershell
Set-ExecutionPolicy RemoteSigned
```

---

## 📦 Estrutura de Arquivos Importantes

```
TCC-Eyevital-6/
├── .env                          # ✅ Config frontend (VITE_*)
├── package.json                  # Dependências frontend
├── vite.config.ts               # Config do Vite
├── src/                         # Código React
│   ├── lib/
│   │   ├── api.ts              # Funções de API
│   │   └── env.ts              # Lê variáveis VITE_*
│   └── components/
└── server/
    ├── .env                     # ✅ Config backend (DATABASE_URL)
    ├── index.js                 # ✅ Servidor Express + Prisma
    ├── package.json             # Dependências backend
    └── prisma/
        └── schema.prisma        # ✅ Schema do banco de dados
```

---

## 🗄️ Banco de Dados (Neon PostgreSQL)

### Tabelas criadas automaticamente:
- `users` - Usuários cadastrados
- `educacao_materials` - Conteúdo educacional
- `chat_messages` - Mensagens do chat (limite 10 por usuário)
- `consultas` - Agendamentos de consultas

### Comandos úteis:

```bash
cd server

# Ver dados no navegador
npm run db:studio

# Resincronizar schema (sem migrations)
npm run db:push

# Gerar Prisma Client (após mudar schema)
npm run db:generate
```

---

## 🔐 Segurança

⚠️ **NUNCA commitar arquivos `.env` com credenciais reais!**

Os arquivos `.env` já estão no `.gitignore`, mas sempre verifique:
```bash
git status
```

Se `.env` aparecer, adicione ao `.gitignore`:
```
.env
server/.env
```

---

## 📝 Notas Importantes

1. **Prisma vs pg:** O projeto usa **Prisma ORM**, não mais a biblioteca `pg` direta.

2. **CamelCase obrigatório:** No código JavaScript, use sempre:
   - `userId` (não `user_id`)
   - `createdAt` (não `created_at`)
   - `passwordHash` (não `password_hash`)

3. **BigInt nos IDs:** O Prisma retorna IDs como BigInt. O código já inclui:
   ```javascript
   BigInt.prototype.toJSON = function() { return this.toString(); };
   ```

4. **CORS configurado:** O backend aceita requisições de qualquer origem em desenvolvimento.

5. **JWT válido por 7 dias:** Tokens de autenticação expiram automaticamente.

---

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs do backend (terminal onde `node index.js` está rodando)
2. Verifique o console do navegador (F12)
3. Consulte este guia
4. Verifique os arquivos `.env` (especialmente as **aspas**)

---

## ✨ Comandos Rápidos

```bash
# Iniciar tudo (dois terminais)
Terminal 1: cd server && npm start
Terminal 2: npm run dev

# Parar tudo (Ctrl+C em cada terminal)

# Reinstalar dependências (se der erro)
npm install
cd server && npm install

# Ver banco de dados
cd server && npm run db:studio

# Commitar mudanças (sem .env)
git add .
git commit -m "sua mensagem"
git push origin main
```

---

**Última atualização:** 21/10/2025
**Versão do Prisma:** 5.22.0
**Node.js recomendado:** v18+
