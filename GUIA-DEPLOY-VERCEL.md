# 🚀 Guia Completo de Deploy no Vercel

## 📋 Status Atual

- ✅ **Frontend**: Já está no Vercel (`tcc-eyevital.vercel.app`)
- ⏳ **Backend**: Precisa fazer deploy

---

## 🔧 Passo 1: Deploy do Backend no Vercel

### 1.1 - Acessar o Vercel Dashboard

1. Acesse: https://vercel.com/dashboard
2. Clique em **"Add New..."** → **"Project"**

### 1.2 - Importar Repositório

1. Selecione o repositório: **libni-30/TCC-Eyevital**
2. Clique em **"Import"**

### 1.3 - Configurar o Projeto Backend

**⚠️ IMPORTANTE - Configure EXATAMENTE assim:**

```
Project Name: tcc-eyevital-backend
Framework Preset: Other
Root Directory: backend    ← MARQUE ESTA OPÇÃO E SELECIONE "backend"
Build Command: npm install
Output Directory: (deixe em branco)
Install Command: npm install
```

### 1.4 - Configurar Environment Variables

Clique em **"Environment Variables"** e adicione:

```
DATABASE_URL
postgresql://neondb_owner:npg_A4YULx3PgOze@ep-sparkling-field-adqcvpzg-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

JWT_SECRET
eyevital-super-secret-key-2025-tcc-projeto

DEV_RESET_KEY
devkey

NODE_ENV
production
```

### 1.5 - Deploy

1. Clique em **"Deploy"**
2. Aguarde o deploy finalizar (2-3 minutos)
3. Copie a URL gerada (exemplo: `https://tcc-eyevital-backend.vercel.app`)

---

## 🎨 Passo 2: Atualizar Frontend com URL do Backend

### 2.1 - Acessar Projeto Frontend no Vercel

1. No Vercel Dashboard, abra o projeto: **tcc-eyevital**
2. Vá em **Settings** → **Environment Variables**

### 2.2 - Atualizar URL_BASE_API_VITE

```
URL_BASE_API_VITE
https://tcc-eyevital-backend.vercel.app
```

**⚠️ Substitua pela URL REAL do backend que você acabou de criar!**

### 2.3 - Redeploy do Frontend

1. Vá na aba **"Deployments"**
2. Clique nos **3 pontinhos** do último deployment
3. Clique em **"Redeploy"**
4. Aguarde finalizar

---

## ✅ Passo 3: Testar o Sistema

### 3.1 - Testar Backend

Abra no navegador:
```
https://tcc-eyevital-backend.vercel.app/health
```

**Resposta esperada:**
```json
{"ok":true}
```

### 3.2 - Testar Frontend

Abra no navegador:
```
https://tcc-eyevital.vercel.app
```

Tente fazer login ou cadastro para verificar se está conectando ao backend.

---

## 🔍 Verificação de Configurações

### Backend no Vercel

**Environment Variables:**
- ✅ `DATABASE_URL` - String de conexão do Neon
- ✅ `JWT_SECRET` - Chave secreta do JWT
- ✅ `DEV_RESET_KEY` - Chave para reset (dev)
- ✅ `NODE_ENV` - production

**Root Directory:**
- ✅ Deve estar configurado como: `backend`

### Frontend no Vercel

**Environment Variables:**
- ✅ `URL_BASE_API_VITE` - URL do backend no Vercel

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch" no frontend

**Causa:** Frontend não consegue conectar ao backend

**Solução:**
1. Verifique se a URL do backend está correta no frontend
2. Certifique-se que tem `https://` no início
3. Teste se o backend está respondendo em `/health`

### Erro: "Database connection failed"

**Causa:** Backend não consegue conectar ao banco de dados

**Solução:**
1. Verifique se `DATABASE_URL` está correto no Vercel
2. Certifique-se que a string tem `sslmode=require`
3. Teste a conexão do Neon no dashboard deles

### Erro: "Module not found"

**Causa:** Dependências não foram instaladas

**Solução:**
1. Vá em Settings → General
2. Verifique se "Install Command" está: `npm install`
3. Force um redeploy

---

## 📝 URLs Finais

Após tudo configurado, você terá:

```
Frontend: https://tcc-eyevital.vercel.app
Backend:  https://tcc-eyevital-backend.vercel.app

Banco de dados: Neon PostgreSQL (já configurado)
```

---

## 🎯 Checklist Final

- [ ] Backend deployado no Vercel
- [ ] Environment Variables do backend configuradas
- [ ] Backend respondendo em `/health`
- [ ] Frontend atualizado com URL do backend
- [ ] Frontend redployado
- [ ] Login/Cadastro funcionando
- [ ] Chat funcionando
- [ ] Sistema acessível de qualquer computador

---

## 🚨 Importante

- ✅ Os arquivos `vercel.json` já foram criados
- ✅ As configurações estão prontas
- ✅ Basta seguir os passos acima
- ✅ Não precisa alterar código

**Tudo está pronto para o deploy! 🎉**
