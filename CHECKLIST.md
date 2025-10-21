# ✅ Checklist de Verificação - TCC EyeVital

Use esta checklist toda vez que abrir o projeto para garantir que tudo funcione.

## 📂 Arquivos Obrigatórios

- [ ] ✅ `.env` existe na raiz do projeto
- [ ] ✅ `server/.env` existe
- [ ] ✅ `node_modules/` existe na raiz
- [ ] ✅ `server/node_modules/` existe

## 🔧 Configuração dos Arquivos .env

### `.env` (raiz - Frontend)
```properties
VITE_API_BASE_URL=http://localhost:3001
```

### `server/.env` (Backend)
```properties
DATABASE_URL=postgresql://usuario:senha@host/database
# ⚠️ SEM ASPAS ao redor da URL!
PORT=3001
JWT_SECRET=alguma-chave-secreta
```

## 🚀 Passos para Iniciar

### Opção 1: Script Automático
1. Clique duas vezes em `start.bat` OU
2. Execute `.\start.ps1` no PowerShell

### Opção 2: Manual (2 terminais)

**Terminal 1 - Backend:**
```bash
cd server
node index.js
```

Aguarde ver:
- ✅ API listening on http://localhost:3001
- 📡 Servidor pronto para receber conexões
- 🗄️ Usando Prisma ORM para gerenciar banco de dados

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Aguarde ver:
- ➜ Local: http://localhost:5173/

## 🔍 Verificação Final

Abra o navegador em `http://localhost:5173` e teste:

- [ ] Página carrega sem erros
- [ ] Não aparece "Failed to fetch"
- [ ] Consegue fazer login
- [ ] Dados são salvos no banco

## ⚠️ Problemas Comuns

### "Failed to fetch"
**Solução:**
1. Backend está rodando? Verifique terminal
2. `.env` tem `VITE_API_BASE_URL`?
3. **REINICIE o Vite** (Ctrl+C e `npm run dev`)

### "HTTP 500"
**Solução:**
1. Verifique `DATABASE_URL` em `server/.env`
2. **REMOVA ASPAS** ao redor da URL
3. Reinicie o backend

### "Cannot find module 'pg'"
**Solução:**
```bash
cd server
npm install
```

### PowerShell não executa scripts
**Solução:**
```powershell
powershell -ExecutionPolicy Bypass -File start.ps1
```

## 🎯 Resultado Esperado

Quando tudo estiver correto:

1. ✅ Backend rodando em http://localhost:3001
2. ✅ Frontend rodando em http://localhost:5173
3. ✅ Login funciona
4. ✅ Dados são persistidos no Neon PostgreSQL
5. ✅ Nenhum erro no console do navegador

## 📝 Observações Importantes

1. **Sempre inicie o BACKEND primeiro** (aguarde 2-3 segundos)
2. **Depois inicie o FRONTEND**
3. **Não commite arquivos `.env`** (já estão no .gitignore)
4. **DATABASE_URL NÃO pode ter aspas**
5. **Reinicie o Vite** se mudar o arquivo `.env`

---

✨ **Dica:** Marque este arquivo nos favoritos e consulte sempre que abrir o projeto!
