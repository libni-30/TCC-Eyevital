# 👥 Guia de Setup para Colaboradores

Este guia é para quem vai trabalhar junto neste projeto.

## 🚀 Primeiros passos (Novo desenvolvedor)

### 1. Clonar o repositório

```bash
git clone https://github.com/libni-30/TCC-Eyevital.git
cd TCC-Eyevital
```

### 2. Instalar dependências

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 3. Configurar variáveis de ambiente

#### **IMPORTANTE:** Você precisa das credenciais do banco!

**🎯 Opção A - Banco compartilhado (RECOMENDADO para TCC):**
- ✅ **Vantagens:** Mesmos dados, trabalho colaborativo real, sem duplicação
- Peça ao dono do projeto para compartilhar as credenciais de forma segura
- Ele deve enviar via mensagem privada (WhatsApp, Telegram, Discord DM)
- **NÃO** peça por issue/pull request público!
- **Veja:** `COMO-COMPARTILHAR-CREDENCIAIS.md` (dono do projeto)

**Opção B - Seu próprio banco (dados isolados):**
- ⚠️ **Desvantagem:** Vocês terão dados diferentes (usuários, consultas, etc.)
- ✅ **Vantagem:** Total independência para testes
- Crie uma conta grátis no Neon: https://neon.tech
- Crie um novo projeto
- Copie a connection string

#### **Configurar Frontend:**

```bash
# Na raiz do projeto
cp .env.example .env
```

Edite `.env` e adicione:
```env
VITE_API_BASE_URL=http://localhost:3000
```

#### **Configurar Backend:**

```bash
# Na pasta server
cd server
cp .env.example .env
```

Edite `server/.env` e adicione as credenciais:

**Se estiver usando o banco compartilhado:**
```env
DATABASE_URL=postgres://[CREDENCIAIS_QUE_VOCE_RECEBEU]
JWT_SECRET=[SEGREDO_QUE_VOCE_RECEBEU]
```

**Se criou seu próprio banco Neon:**
```env
DATABASE_URL=postgres://[SUA_CONNECTION_STRING_DO_NEON]
JWT_SECRET=[GERE_UM_SEGREDO_FORTE]
```

Para gerar um JWT_SECRET forte:
```bash
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Rodar migrações (se usar banco próprio)

```bash
cd server
npm run db:init       # Cria as tabelas
npm run db:seed:user  # Cria um usuário de teste
```

**Anote as credenciais do usuário criado!**

### 5. Iniciar o projeto

**Terminal 1 - Backend:**
```bash
cd server
npm run start
```

Deve exibir: `API listening on http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Deve exibir: `Local: http://localhost:5173/`

### 6. Testar no navegador

Abra: http://localhost:5173/

- Deve carregar a página inicial
- Tente fazer login com o usuário criado no seed
- Acesse as rotas protegidas (Educação, Consultas)

---

## 🔄 Workflow de desenvolvimento

### Antes de começar a trabalhar:

```bash
git pull origin main  # Pega as últimas alterações
npm install           # Atualiza dependências se houver
cd server && npm install && cd ..
```

### Durante o desenvolvimento:

1. Crie uma branch para sua feature:
   ```bash
   git checkout -b feat/minha-feature
   ```

2. Faça suas alterações

3. Teste localmente

4. Commit:
   ```bash
   git add .
   git commit -m "feat: Descrição da mudança"
   ```

5. Push:
   ```bash
   git push origin feat/minha-feature
   ```

6. Abra um Pull Request no GitHub

### Sincronizar com mudanças dos colegas:

```bash
git checkout main
git pull origin main
git checkout sua-branch
git merge main  # Ou: git rebase main
```

---

## 🐛 Problemas comuns

### "Failed to fetch" ao fazer login

**Causa:** Backend não está rodando ou URL errada

**Solução:**
1. Verifique se o backend está rodando na porta 3000
2. Teste: http://localhost:3000/health no navegador
3. Verifique o `.env` na raiz: `VITE_API_BASE_URL=http://localhost:3000`

### "Database connection error"

**Causa:** Credenciais erradas no `server/.env`

**Solução:**
1. Verifique se o `DATABASE_URL` está correto
2. Teste a conexão: `cd server && npm run db:init`
3. Peça as credenciais corretas ao dono do projeto

### Estilos do Tailwind não aparecem

**Causa:** PostCSS não configurado

**Solução:**
1. Verifique se existe `postcss.config.cjs`
2. Reinstale dependências: `npm install`
3. Reinicie o Vite: `npm run dev`

### Erro de importação de módulos

**Causa:** Dependências não instaladas

**Solução:**
```bash
npm install          # Frontend
cd server && npm install  # Backend
```

---

## 📞 Precisa de ajuda?

1. **Verifique a documentação:**
   - `README.md` - Visão geral
   - `SECURITY.md` - Segurança e credenciais
   - Este arquivo - Setup

2. **Teste os endpoints:**
   - http://localhost:3000/health
   - http://localhost:3000/db/health

3. **Verifique os logs:**
   - Terminal do backend
   - Console do navegador (F12)

4. **Fale com o dono do projeto:**
   - Se precisar de credenciais
   - Se encontrar bugs
   - Se tiver dúvidas

---

## ✅ Checklist - Ambiente pronto

Antes de começar a programar, verifique:

- [ ] Repositório clonado
- [ ] `npm install` rodado (frontend e backend)
- [ ] `.env` configurado na raiz
- [ ] `server/.env` configurado
- [ ] Banco de dados acessível (se banco próprio: migrations rodadas)
- [ ] Backend rodando em http://localhost:3000
- [ ] Frontend rodando em http://localhost:5173
- [ ] Login funciona no navegador
- [ ] Rotas protegidas redirecionam corretamente

**Pronto! Você está pronto para desenvolver! 🎉**
