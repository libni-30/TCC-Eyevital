# 🔑 Guia: Como Compartilhar Credenciais com Seu Colega de TCC

Este guia é para **VOCÊ** (dono do projeto) compartilhar o acesso ao banco Neon com seu colega.

---

## 📋 Passo 1: Obter suas credenciais

### **1.1 - Pegar a DATABASE_URL do Neon:**

1. Acesse: https://console.neon.tech
2. Faça login
3. Selecione seu projeto **TCC-Eyevital**
4. No Dashboard, clique em **"Connection Details"**
5. Copie a **Connection String** completa

Ela será algo como:
```
postgres://usuario:senha123@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### **1.2 - Pegar o JWT_SECRET:**

Abra o arquivo `server/.env` no seu computador e copie o valor de `JWT_SECRET`:

```bash
# No seu computador, abra:
server/.env

# Copie a linha:
JWT_SECRET=abc123xyz...
```

---

## 📤 Passo 2: Compartilhar com seu colega (ESCOLHA UMA OPÇÃO)

### **Opção A - WhatsApp/Telegram (Recomendado para TCC)** ⭐

**Por que é seguro o suficiente para TCC:**
- Conversa privada (não em grupo)
- Você pode deletar a mensagem depois
- Dados de desenvolvimento (não produção)

**Como fazer:**

1. Abra uma conversa **PRIVADA** com seu colega (não em grupo!)

2. Envie a seguinte mensagem:

```
🔐 Credenciais TCC-Eyevital

Cole isso no arquivo server/.env do projeto:

DATABASE_URL=postgres://[COLE_AQUI_A_CONNECTION_STRING_DO_NEON]
JWT_SECRET=[COLE_AQUI_O_SEU_JWT_SECRET]

⚠️ Depois de copiar, me avise para eu deletar esta mensagem!
```

3. **Importante:** Depois que ele confirmar que copiou, **DELETE a mensagem**!

4. Peça para ele também deletar no lado dele (se possível)

---

### **Opção B - Discord/Slack DM**

**Como fazer:**

1. Mande DM (mensagem direta) para seu colega

2. Cole:
```
Credenciais do banco (cole no server/.env):

DATABASE_URL=postgres://...
JWT_SECRET=...

Delete depois de copiar!
```

3. Depois que ele copiar, delete a mensagem

---

### **Opção C - Presencial (Mais Segura)**

**Como fazer:**

1. Encontrem-se pessoalmente ou por videochamada

2. Mostre na sua tela o arquivo `server/.env`

3. Ele anota ou digita diretamente no PC dele

4. **Vantagem:** Nada fica gravado em mensagem

---

### **Opção D - Arquivo Criptografado (Paranoia Mode)** 🔒

Se quiserem máxima segurança:

**No seu PC:**

1. Crie um arquivo `credenciais.txt`:
```
DATABASE_URL=postgres://...
JWT_SECRET=...
```

2. Compacte com senha no 7-Zip:
```
- Botão direito → 7-Zip → Add to archive...
- Marque: Encrypt file names
- Defina uma senha forte
- Salva como: credenciais.7z
```

3. Envie o arquivo `credenciais.7z` por email/WhatsApp/Drive

4. **SEPARADAMENTE** (outro canal!), envie a senha:
   - Se enviou o arquivo por WhatsApp, mande a senha por Telegram
   - Ou vice-versa

5. Depois que ele confirmar, delete o arquivo e as mensagens

---

## 📥 Passo 3: Instrução para seu colega

Mande também este texto para ele:

```
📝 Como configurar no seu PC:

1. Clone o repositório:
   git clone https://github.com/libni-30/TCC-Eyevital.git
   cd TCC-Eyevital

2. Instale as dependências:
   npm install
   cd server
   npm install

3. Configure o frontend (.env na raiz):
   - Copie: .env.example para .env
   - Edite .env e coloque:
     VITE_API_BASE_URL=http://localhost:3000

4. Configure o backend (server/.env):
   - Copie: server/.env.example para server/.env
   - Edite server/.env e COLE AS CREDENCIAIS QUE EU PASSEI

5. Teste se funcionou:
   - Terminal 1: cd server && npm run start
   - Terminal 2: npm run dev
   - Abra: http://localhost:5173
   - Tente fazer login com um usuário existente

✅ Se aparecer "API listening on http://localhost:3000" = FUNCIONOU!
```

---

## ✅ Passo 4: Verificar se funcionou

### **Teste rápido para seu colega fazer:**

Peça para ele rodar este comando no terminal (dentro da pasta `server`):

```bash
# Windows PowerShell
try { Invoke-RestMethod -Uri http://localhost:3000/db/health | ConvertTo-Json } catch { Write-Output "ERRO" }
```

**Se retornar `{ "ok": true, ... }`** = ✅ Conectou no banco!

**Se retornar erro** = ❌ Credenciais erradas ou servidor não rodando

---

## 🔐 Checklist de Segurança

Antes de compartilhar, verifique:

- [ ] Vou enviar por canal privado (não público)
- [ ] Vou deletar a mensagem depois que ele copiar
- [ ] Não vou mandar por email corporativo/faculdade
- [ ] Não vou colocar em issue/PR do GitHub
- [ ] Não vou postar em grupo do WhatsApp/Discord

Depois de compartilhar:

- [ ] Meu colega confirmou que copiou
- [ ] Deletei a mensagem com as credenciais
- [ ] Ele conseguiu conectar no banco (teste passou)

---

## 🚨 E se eu compartilhar errado?

**Cenários de risco:**

### **Compartilhei em grupo do WhatsApp/Discord por engano:**

1. Delete imediatamente
2. Peça para todos deletarem também
3. **Troque a senha do banco:**
   - Neon Console → Settings → Reset Password
   - Atualize seu `server/.env` local
   - Passe a nova credencial para seu colega (corretamente agora)

### **Postei no GitHub/issue público:**

1. Delete o comentário/arquivo
2. **URGENTE:** Troque a senha do Neon
3. Se commitou no Git:
   ```bash
   # Remove do histórico
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch server/.env' \
   --prune-empty -- --all
   
   git push --force
   ```

### **Enviei para pessoa errada:**

1. Avise a pessoa para deletar
2. Se não confiar: troque a senha do banco
3. Atualize as credenciais

---

## 💡 Dicas Extras

### **Para facilitar a vida do seu colega:**

Crie um arquivo `CREDENCIAIS-TEMPLATE.txt` e mande para ele:

```txt
# Cole isso no arquivo server/.env

DATABASE_URL=postgres://...
JWT_SECRET=...

# Cole isso no arquivo .env (raiz do projeto)

VITE_API_BASE_URL=http://localhost:3000
```

Aí você só substitui os `...` pelas credenciais reais antes de enviar.

### **Combinado importante com seu colega:**

```
❌ NÃO FAÇAM:
- Commitarem o .env no Git
- Compartilharem com outras pessoas sem avisar
- Usarem em produção (essas são credenciais de DEV)

✅ FAÇAM:
- Manterem o .env apenas local
- Avisar se precisar regenerar credenciais
- Comunicar mudanças no schema do banco
```

---

## 📞 Resumo - TL;DR

**Você vai:**
1. Pegar `DATABASE_URL` do Neon Console
2. Pegar `JWT_SECRET` do seu `server/.env`
3. Mandar para seu colega por WhatsApp/Telegram privado
4. Deletar a mensagem depois que ele copiar

**Seu colega vai:**
1. Clonar o repo
2. Copiar `.env.example` → `.env` e `server/.env.example` → `server/.env`
3. Colar as credenciais que você passou
4. Rodar `npm install` e iniciar o projeto

**Resultado:**
✅ Vocês dois usando o mesmo banco Neon
✅ Dados sincronizados em tempo real
✅ Trabalho colaborativo funcionando

---

**Pronto! Agora você sabe exatamente como compartilhar de forma segura! 🎉**
