# 📋 TEMPLATE - Cole e envie para seu colega

---

## Mensagem 1 - Instruções Iniciais

```
🚀 TCC-Eyevital - Setup do Projeto

Oi! Vou te passar as instruções para rodar o projeto localmente.

Primeiro, clone e instale:

1. git clone https://github.com/libni-30/TCC-Eyevital.git
2. cd TCC-Eyevital
3. npm install
4. cd server && npm install && cd ..

Agora precisa configurar os arquivos .env (vou mandar as credenciais na próxima mensagem)
```

---

## Mensagem 2 - Credenciais (APAGUE DEPOIS!)

```
🔐 Credenciais do Banco (COPIE E DELETE ESTA MENSAGEM)

==== server/.env ====

DATABASE_URL=[COLE_AQUI_SUA_CONNECTION_STRING_DO_NEON]
JWT_SECRET=[COLE_AQUI_SEU_JWT_SECRET]

==== .env (raiz do projeto) ====

VITE_API_BASE_URL=http://localhost:3000

⚠️ AVISE QUANDO COPIAR PARA EU DELETAR!
```

**LEMBRE-SE:** Substitua os `[...]` pelas suas credenciais reais antes de enviar!

---

## Mensagem 3 - Como Configurar

```
📝 Configurando os arquivos .env:

1. Copie o arquivo de exemplo do FRONTEND:
   
   Na raiz do projeto:
   - Copie .env.example para .env
   - Abra .env e cole:
     VITE_API_BASE_URL=http://localhost:3000

2. Copie o arquivo de exemplo do BACKEND:
   
   Na pasta server:
   - Copie server/.env.example para server/.env
   - Abra server/.env e cole as credenciais que mandei acima

3. Teste se funcionou:
   
   Terminal 1: cd server && npm run start
   Terminal 2: npm run dev
   
   Se aparecer:
   "API listening on http://localhost:3000" ✅
   "Local: http://localhost:5173/" ✅
   
   = Funcionou!

4. Abra no navegador: http://localhost:5173
```

---

## Mensagem 4 - Teste de Conexão

```
🧪 Teste se conectou no banco:

Cole no PowerShell (dentro da pasta server):

try { Invoke-RestMethod -Uri http://localhost:3000/db/health | ConvertTo-Json } catch { Write-Output "ERRO" }

Se retornar { "ok": true } = ✅ CONECTOU!
Se der erro = ❌ Algo errado nas credenciais

Me avisa o resultado!
```

---

## Mensagem 5 - Usuário de Teste

```
👤 Para testar o login, use:

Email: [COLOQUE_UM_EMAIL_DE_USUARIO_QUE_VOCE_JA_CRIOU]
Senha: [COLOQUE_A_SENHA]

Ou registre um novo usuário pelo site mesmo!

Qualquer dúvida é só chamar 👍
```

---

## 💡 Como Usar Este Template

### **Passo a passo:**

1. **Copie a "Mensagem 1"** e envie para seu colega
   - Não precisa mudar nada

2. **Edite a "Mensagem 2"** ANTES de enviar:
   ```
   Substitua:
   [COLE_AQUI_SUA_CONNECTION_STRING_DO_NEON]
   por:
   postgres://usuario:senha@ep-xxxxx.neon.tech/neondb?sslmode=require
   
   Substitua:
   [COLE_AQUI_SEU_JWT_SECRET]
   por:
   seu-jwt-secret-real-aqui
   ```

3. **Envie a "Mensagem 2"** 
   - ⚠️ Espere ele confirmar que copiou
   - ⚠️ DELETE a mensagem depois!

4. **Copie e envie a "Mensagem 3"**
   - Não precisa mudar nada

5. **Copie e envie a "Mensagem 4"**
   - Aguarde ele testar e confirmar

6. **Edite e envie a "Mensagem 5"**
   - Coloque um email/senha de usuário que você já criou
   - Ou mande ele criar um novo

---

## ✅ Checklist Final

Antes de enviar:

- [ ] Substituí `[COLE_AQUI_SUA_CONNECTION_STRING_DO_NEON]` pela string real
- [ ] Substituí `[COLE_AQUI_SEU_JWT_SECRET]` pelo secret real
- [ ] Vou enviar por canal PRIVADO (não grupo)
- [ ] Vou deletar a mensagem 2 depois que ele copiar

Depois que ele configurar:

- [ ] Ele confirmou que rodou `npm install`
- [ ] Backend rodando (porta 3000)
- [ ] Frontend rodando (porta 5173)
- [ ] Teste de conexão passou (db/health)
- [ ] Ele conseguiu fazer login

---

**Pronto! Use este template para facilitar sua vida! 📋**
