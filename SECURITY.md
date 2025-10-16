# 🔐 Guia de Segurança - Gerenciamento de Credenciais

## Por que as credenciais não estão no GitHub?

### ❌ Riscos de expor credenciais:
- **Acesso não autorizado** ao banco de dados
- **Vazamento de dados** de usuários
- **Custos inesperados** (uso indevido da conta Neon)
- **Ataques maliciosos** (roubo, modificação, exclusão de dados)
- **Violação de compliance** (LGPD, GDPR)

### ✅ Boa prática (atual):
- Credenciais em `.env` (local, ignorado pelo Git)
- `.env.example` versionado (sem valores reais)
- Documentação clara de como obter/configurar

---

## 📋 Onde estão minhas credenciais?

### **Credenciais do Neon Postgres:**

1. **Console Neon:** https://console.neon.tech
   - Login → Dashboard → Connection Details
   - Copie a **Connection String**

2. **Formato da Connection String:**
   ```
   postgres://[usuario]:[senha]@[host]/[database]?sslmode=require
   ```

3. **Exemplo (NÃO USAR - apenas referência):**
   ```
   postgres://myuser:abc123xyz@ep-cool-name-123456.us-east-1.aws.neon.tech/mydb?sslmode=require
   ```

### **JWT Secret:**
- Gere um segredo forte (32+ caracteres aleatórios)
- Ferramentas:
  ```bash
  # Node.js
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  
  # PowerShell
  -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
  ```

---

## 🛡️ Como armazenar credenciais com segurança

### **1. Durante desenvolvimento local:**

✅ **FAZER:**
- Manter em `server/.env` (já no `.gitignore`)
- Usar gerenciador de senhas (1Password, Bitwarden, LastPass)
- Backup criptografado em nuvem privada

❌ **NÃO FAZER:**
- Commitar no Git
- Compartilhar por email/Slack público
- Deixar em arquivo de texto desprotegido
- Hard-coded no código

### **2. Para compartilhar com equipe:**

✅ **Métodos seguros:**
- **1Password/Bitwarden Teams** (compartilhamento de vault)
- **Mensagem direta criptografada** (Signal, Telegram secreto)
- **Reunião presencial** (anotar e guardar)
- **Arquivo criptografado** (7zip com senha forte)

❌ **Métodos inseguros:**
- Email
- WhatsApp/Telegram normal
- Slack/Discord público
- Comentário no GitHub
- Compartilhamento de tela gravado

### **3. Para deploy em produção:**

✅ **Usar painel da plataforma:**

**Vercel:**
```
Settings → Environment Variables
Adicionar: DATABASE_URL, JWT_SECRET
```

**Railway:**
```
Variables tab → New Variable
RAW Editor para múltiplas variáveis
```

**Render:**
```
Environment → Environment Variables
Add Environment Variable
```

**Fly.io:**
```bash
flyctl secrets set DATABASE_URL="postgres://..."
flyctl secrets set JWT_SECRET="..."
```

---

## 🚨 O que fazer se credenciais vazarem?

### **Ação imediata:**

1. **Revogar acesso:**
   - Neon: Regenerar senha do banco
   - JWT: Alterar `JWT_SECRET` (invalida todos tokens)

2. **Remover do histórico Git:**
   ```bash
   # Se commitou por engano
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch server/.env' \
   --prune-empty --tag-name-filter cat -- --all
   
   # Ou use BFG Repo-Cleaner (mais rápido)
   ```

3. **Notificar equipe:**
   - Avisar todos para atualizar `.env` local
   - Forçar logout de usuários (se necessário)

4. **Auditar logs:**
   - Neon Console → Logs
   - Verificar acessos suspeitos

---

## ✅ Checklist de segurança

Antes de cada commit:
- [ ] `.env` está no `.gitignore`?
- [ ] Não há credenciais hard-coded no código?
- [ ] `.env.example` não contém valores reais?
- [ ] Rodei `git status` para verificar arquivos staged?

Antes de cada deploy:
- [ ] Variáveis de ambiente configuradas no painel?
- [ ] Credenciais de produção são diferentes de dev?
- [ ] JWT_SECRET de produção é forte e único?

---

## 📚 Recursos adicionais

- [OWASP - Credential Storage](https://cheatsheetseries.owasp.org/cheatsheets/Credential_Storage_Cheat_Sheet.html)
- [GitHub - Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Neon - Security best practices](https://neon.tech/docs/security/security-overview)
- [The Twelve-Factor App - Config](https://12factor.net/config)

---

## 💡 Resumo rápido

```
❌ NUNCA:
- Commitar .env no Git
- Hard-code credenciais
- Compartilhar por canal inseguro

✅ SEMPRE:
- Usar .env local (gitignored)
- Compartilhar via canal seguro
- Usar variáveis de ambiente em produção
- Gerenciador de senhas para backup
```
