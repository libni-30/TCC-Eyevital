# 🔧 Como Atualizar as Credenciais do Banco Neon

## ❌ Problema Atual
```
DB ERROR: password authentication failed for user 'neondb_owner'
```

Isso significa que a senha do banco mudou ou está incorreta.

## ✅ Solução Passo a Passo

### 1️⃣ Acesse o Painel do Neon
1. Abra https://console.neon.tech
2. Faça login na sua conta
3. Selecione o projeto do TCC EyeVital

### 2️⃣ Obtenha a String de Conexão Correta

#### Opção A - Connection String Direta
1. No painel do Neon, vá em **"Dashboard"** do seu projeto
2. Procure por **"Connection String"** ou **"Connection Details"**
3. Copie a string completa que começa com `postgresql://`
4. **IMPORTANTE**: Certifique-se de que está copiando a versão com a senha visível

#### Opção B - Reset da Senha
Se a senha foi perdida:
1. No painel do Neon, vá em **"Settings"** > **"Connection Details"**
2. Clique em **"Reset Password"**
3. Copie a nova senha gerada
4. Monte a string de conexão:
   ```
   postgresql://[usuário]:[senha]@[host]/[database]?sslmode=require
   ```

### 3️⃣ Atualize o Arquivo `.env`

1. Abra o arquivo: `server/.env`

2. Substitua a linha `DATABASE_URL` pela nova string de conexão:

```env
DATABASE_URL='postgresql://SUA_NOVA_STRING_AQUI'
JWT_SECRET='eyevital-super-secret-key-2025-tcc-projeto'
```

### 4️⃣ Reinicie o Servidor

Após salvar o `.env`:

1. **Pare o servidor** (pressione Ctrl+C no terminal onde está rodando)
2. **Inicie novamente**:
   ```powershell
   cd server
   npm start
   ```

### 5️⃣ Teste a Conexão

Deve aparecer:
```
API listening on http://localhost:3000
```

Teste no navegador ou com:
```powershell
curl http://localhost:3000/health
```

Deve retornar:
```json
{"ok":true}
```

## 🎯 Exemplo de String de Conexão Válida

```env
DATABASE_URL='postgresql://usuario:senha@ep-nome-projeto.us-east-1.aws.neon.tech/neondb?sslmode=require'
```

## ⚠️ Cuidados Importantes

- ❌ **NÃO COMITE** o arquivo `.env` no Git
- ✅ **SEMPRE** use aspas simples ao redor da string
- ✅ **VERIFIQUE** se não há espaços extras
- ✅ **CONFIRME** que a string termina com `?sslmode=require`

## 🆘 Ainda com Problemas?

Se após seguir todos os passos ainda não funcionar:

1. Verifique se o projeto Neon está ativo (não em sleep mode)
2. Confirme que você tem acesso ao banco
3. Tente criar um novo usuário no Neon com novas credenciais
4. Verifique se há restrições de IP no Neon (deve permitir "anywhere")

---

**Após corrigir as credenciais, você conseguirá fazer login e registro normalmente!** ✨
