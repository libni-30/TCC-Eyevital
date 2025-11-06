# 🚀 GUIA RÁPIDO - COMANDOS ESSENCIAIS

## ⚡ Iniciar o Sistema Rapidamente

### Opção 1: Tudo Automatizado (Recomendado)
```cmd
testar-sistema.bat
```
**O que faz:**
- ✅ Verifica dependências
- ✅ Inicia backend (porta 3001)
- ✅ Inicia frontend (porta 5173)
- ✅ Abre em janelas separadas

---

### Opção 2: Scripts Individuais

**Iniciar apenas o Backend:**
```cmd
start-backend.bat
```

**Iniciar apenas o Frontend:**
```cmd
start-frontend.bat
```

**Iniciar ambos:**
```cmd
start.bat
```

---

### Opção 3: Manual (Terminal)

**Terminal 1 - Backend:**
```cmd
cd backend
node index.js
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
npm run dev
```

---

## 🔍 Testar se está funcionando

### Testar Backend (PowerShell)
```powershell
Invoke-RestMethod http://localhost:3001/health
```
**Resposta esperada:** `{ "ok": true }`

### Testar Banco de Dados
```powershell
Invoke-RestMethod http://localhost:3001/db/health
```
**Resposta esperada:** `{ "ok": true }`

### Testar Frontend
Abra no navegador:
```
http://localhost:5173
```

---

## 📦 Instalar/Atualizar Dependências

### Backend
```cmd
cd backend
npm install
```

### Frontend
```cmd
cd frontend
npm install
```

### Ambos de uma vez
```cmd
cd backend && npm install && cd ../frontend && npm install
```

---

## 🗄️ Comandos do Banco de Dados (Prisma)

### Gerar Prisma Client
```cmd
cd backend
npm run db:generate
```

### Criar/Atualizar Tabelas (Migrations)
```cmd
cd backend
npm run db:migrate:dev
```

### Abrir Prisma Studio (Interface Visual)
```cmd
cd backend
npm run db:studio
```
**Abre em:** http://localhost:5555

### Push Schema (sem criar migration)
```cmd
cd backend
npm run db:push
```

### Deploy Migrations (Produção)
```cmd
cd backend
npm run db:migrate
```

---

## 🧪 Testes e Validações

### Testar Backend Completo
```powershell
.\test-backend.ps1
```
**O que testa:**
- ✅ /health
- ✅ /db/health
- ✅ /db/info
- ✅ /auth/register
- ✅ /auth/me

### Lint do Frontend
```cmd
cd frontend
npm run lint
```

### Build do Frontend
```cmd
cd frontend
npm run build
```

### Preview do Build
```cmd
cd frontend
npm run preview
```

---

## 🔐 Gerenciar Usuários (Dev)

### Criar um Seed de Usuário
```cmd
cd backend
npm run db:seed
```

### Resetar Senha de um Usuário (Dev)
```powershell
$body = '{"email":"teste@exemplo.com","newPassword":"NovaSenha123!"}'
Invoke-RestMethod -Uri http://localhost:3001/auth/dev-reset-password -Method Post -Body $body -ContentType "application/json" -Headers @{"x-dev-key"="devkey"}
```

---

## 📧 Testar Envio de Email (Dev)

```powershell
$body = '{"to":"seu@email.com","subject":"Teste","text":"Email de teste"}'
Invoke-RestMethod -Uri http://localhost:3001/email/test -Method Post -Body $body -ContentType "application/json" -Headers @{"x-dev-key"="devkey"}
```

---

## 🛠️ Manutenção

### Ver Logs do Backend (se rodando como serviço)
```cmd
cd backend
npm run dev
```
**Com nodemon, reinicia automaticamente ao editar arquivos**

### Limpar node_modules (se houver problemas)
```cmd
cd backend
rmdir /s /q node_modules
npm install

cd ../frontend
rmdir /s /q node_modules
npm install
```

### Atualizar Prisma
```cmd
cd backend
npm i --save-dev prisma@latest
npm i @prisma/client@latest
npm run db:generate
```

### Resolver Vulnerabilidades npm
```cmd
cd backend
npm audit fix

cd ../frontend
npm audit fix
```

---

## 🌐 URLs Importantes

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | http://localhost:5173 | Aplicação React |
| Backend API | http://localhost:3001 | API REST |
| Health Check | http://localhost:3001/health | Status da API |
| DB Health | http://localhost:3001/db/health | Status do Banco |
| DB Info | http://localhost:3001/db/info | Info do PostgreSQL |
| Prisma Studio | http://localhost:5555 | Interface visual do DB |

---

## 🔥 Comandos de Emergência

### Parar tudo (se travou)
```cmd
taskkill /F /IM node.exe
```

### Liberar porta 3001
```powershell
Get-NetTCPConnection -LocalPort 3001 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### Liberar porta 5173
```powershell
Get-NetTCPConnection -LocalPort 5173 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### Resetar tudo
```cmd
cd backend
rmdir /s /q node_modules
npm install
npm run db:generate

cd ../frontend
rmdir /s /q node_modules
npm install
```

---

## 📚 Documentação do Projeto

- `README.md` - Documentação principal
- `RELATORIO-ANALISE-SISTEMA.md` - Análise técnica completa
- `RESUMO-ANALISE.md` - Resumo visual
- `GUIA-COMANDOS.md` - Este arquivo
- `CHAT-IMPLEMENTATION.md` - Documentação do sistema de chat
- `backend/README.md` - Documentação da API
- `frontend/README.md` - Documentação do frontend

---

## 🎯 Fluxo de Trabalho Típico

### Dia a Dia (Desenvolvimento)

1. **Iniciar Sistema:**
   ```cmd
   start.bat
   ```

2. **Fazer Alterações no Código**
   - Backend: `backend/index.js` ou outros arquivos
   - Frontend: `frontend/src/` (componentes, páginas, etc.)

3. **Testar no Navegador:**
   - http://localhost:5173

4. **Ver Logs:**
   - Backend: Terminal onde rodou `node index.js`
   - Frontend: Terminal onde rodou `npm run dev`

5. **Parar Sistema:**
   - Ctrl+C em cada terminal
   - Ou fechar as janelas

---

### Quando Alterar o Schema do Banco

1. **Editar Schema:**
   ```
   backend/prisma/schema.prisma
   ```

2. **Criar Migration:**
   ```cmd
   cd backend
   npm run db:migrate:dev
   ```

3. **Gerar Client:**
   ```cmd
   npm run db:generate
   ```

4. **Reiniciar Backend**

---

### Quando Instalar Nova Dependência

**Backend:**
```cmd
cd backend
npm install nome-do-pacote
```

**Frontend:**
```cmd
cd frontend
npm install nome-do-pacote
```

---

## 💡 Dicas Úteis

### Atalhos Úteis

- **Ctrl+C** - Parar processo no terminal
- **Ctrl+Shift+C** - Copiar do terminal
- **Ctrl+Shift+V** - Colar no terminal

### Onde Estão os Arquivos Importantes

```
TCC-Eyevital/
├── backend/
│   ├── index.js              ← Servidor principal
│   ├── .env                  ← Configurações secretas
│   ├── package.json          ← Dependências
│   └── prisma/
│       └── schema.prisma     ← Schema do banco
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx          ← Componente principal
│   │   ├── main.tsx         ← Entry point
│   │   └── components/      ← Componentes React
│   ├── .env                 ← Configurações do frontend
│   └── package.json         ← Dependências
│
└── Scripts úteis:
    ├── start.bat
    ├── testar-sistema.bat
    └── test-backend.ps1
```

---

## 🆘 Problemas Comuns

### "Porta já está em uso"

**Solução:**
```powershell
# Para porta 3001 (backend)
Get-NetTCPConnection -LocalPort 3001 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# Para porta 5173 (frontend)
Get-NetTCPConnection -LocalPort 5173 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### "Cannot find module"

**Solução:**
```cmd
cd backend
npm install

cd ../frontend
npm install
```

### "Prisma Client not found"

**Solução:**
```cmd
cd backend
npm run db:generate
```

### "Database connection failed"

**Solução:**
1. Verificar se `DATABASE_URL` está correto no `backend/.env`
2. Verificar se o banco Neon está online
3. Testar conexão: `npm run db:info`

---

**Última atualização:** 06/11/2025  
**Mantido por:** Equipe TCC-Eyevital
