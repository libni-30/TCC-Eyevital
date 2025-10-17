# 🚀 Guia Rápido - Sistema de Chat

## ⚡ Início Rápido (3 minutos)

### Opção 1: Script Automático (Recomendado)

```bash
# Windows: Duplo clique em
setup-rapido.bat
```

### Opção 2: Manual

**1. Instalar dependências:**

```bash
# Backend
cd server
npm install

# Frontend
cd ..
npm install
```

**2. Configurar `.env` files:**

`server/.env`:

```env
DATABASE_URL=postgres://seu_usuario:senha@host.neon.tech/db?sslmode=require
JWT_SECRET=um_secret_forte_aqui
```

`.env` (raiz):

```env
VITE_API_BASE_URL=http://127.0.0.1:3000
```

**3. Inicializar banco:**

```bash
cd server
node scripts/init-db.js
```

**4. Iniciar servidores:**

Terminal 1:

```bash
cd server
node index.js
```

Terminal 2:

```bash
npm run dev
```

**5. Acessar:** http://localhost:5173/paginainicial.html

---

## 🎯 Como Testar o Chat

### No Navegador:

```
1. Clicar em "Registrar" → Criar conta
2. Fazer login
3. Clicar em "Consultas" no menu
4. Digitar mensagem no chat
5. Pressionar Enter ou clicar no botão ✈️
6. Ver resposta do especialista
7. Repetir até 10 perguntas
8. Após 10 → Clicar em "Contatos"
```

### Via Script PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\test-chat.ps1
```

---

## 📁 Estrutura de Arquivos do Chat

```
TCC-Eyevital/
├── server/
│   ├── index.js                    ← Backend do chat (endpoints)
│   └── scripts/
│       └── init-db.js              ← Cria tabela chat_messages
│
├── src/
│   ├── components/
│   │   ├── ChatIntro.tsx           ← Componente do chat (UI + lógica)
│   │   └── ConsultasPage.tsx       ← Página que usa o chat
│   └── lib/
│       └── api.ts                  ← Cliente HTTP (chamadas API)
│
├── CHAT-IMPLEMENTATION.md          ← Documentação técnica completa
├── CHAT-RESUMO.md                  ← Este arquivo - resumo executivo
├── test-chat.ps1                   ← Script de teste automatizado
└── setup-rapido.bat                ← Instalação automática
```

---

## 🔌 Endpoints da API

| Método | Endpoint         | Descrição              | Limite                |
| ------ | ---------------- | ---------------------- | --------------------- |
| GET    | `/chat/messages` | Histórico de mensagens | 🔒 Protegido          |
| GET    | `/chat/count`    | Contador de perguntas  | 🔒 Protegido          |
| POST   | `/chat/send`     | Enviar mensagem        | 🔒 Protegido (10 max) |
| DELETE | `/chat/clear`    | Limpar histórico       | 🔒 Dev only           |

**Autenticação:** Todas as rotas exigem header:

```
Authorization: Bearer <seu_token_jwt>
```

---

## 🎨 Interface do Chat

### Estados:

**1. Inicial (0 perguntas):**

```
┌─────────────────────────────────────┐
│ Bem vindo ao chat!                  │
│ Você tem direito a até 10 perguntas│
│                                     │
│ Pergunte à vontade!                 │
│                                     │
│ [Digite aqui...            ] [✈️]   │
│ 0/10 perguntas                      │
└─────────────────────────────────────┘
```

**2. Com mensagens (5 perguntas):**

```
┌─────────────────────────────────────┐
│ Bem vindo ao chat!                  │
│                                     │
│ ┌─ Você ────────────────────┐      │
│ │ Como cuidar da visão?     │      │
│ └───────────────────────────┘      │
│                                     │
│ ┌─ Especialista ────────────┐      │
│ │ Obrigado pela pergunta!   │      │
│ └───────────────────────────┘      │
│                                     │
│ [Digite aqui...            ] [✈️]   │
│ 5/10 perguntas                      │
└─────────────────────────────────────┘
```

**3. Limite atingido (10 perguntas):**

```
┌─────────────────────────────────────┐
│ ⚠️  Você chegou ao limite de 10     │
│    perguntas. Para continuar:       │
│                                     │
│    [📞 Contatos]                    │
│                                     │
│ [Digite aqui (bloqueado)] [✈️]      │
│ 10/10 perguntas                     │
└─────────────────────────────────────┘
```

---

## 🧪 Teste Rápido (1 minuto)

```bash
# PowerShell
$body = @{ email='test@example.com'; password='Test123!' } | ConvertTo-Json
$res = Invoke-RestMethod http://127.0.0.1:3000/auth/register -Method Post -Body $body -ContentType 'application/json'
$token = $res.token

$headers = @{ Authorization = "Bearer $token" }
$msg = @{ message='Teste!' } | ConvertTo-Json
Invoke-RestMethod http://127.0.0.1:3000/chat/send -Method Post -Headers $headers -Body $msg -ContentType 'application/json'
```

✅ Se retornar JSON com `userMessage` e `specialistMessage` → **Funcionando!**

---

## 🐛 Problemas Comuns

### ❌ "Cannot find package 'dotenv'"

**Solução:** `cd server && npm install`

### ❌ "Failed to fetch"

**Solução:** Backend não está rodando. Execute `cd server && node index.js`

### ❌ "401 Unauthorized"

**Solução:** Faça login novamente para obter novo token

### ❌ "403 Forbidden"

**Solução:** Você atingiu 10 perguntas. Use `/chat/clear` para resetar

---

## 📊 Banco de Dados

**Tabela:** `chat_messages`

| Coluna       | Tipo        | Descrição              |
| ------------ | ----------- | ---------------------- |
| `id`         | BIGSERIAL   | ID único da mensagem   |
| `user_id`    | BIGINT      | ID do usuário (FK)     |
| `message`    | TEXT        | Conteúdo da mensagem   |
| `sender`     | TEXT        | 'user' ou 'specialist' |
| `created_at` | TIMESTAMPTZ | Data/hora              |

**Query para ver mensagens de um usuário:**

```sql
SELECT * FROM chat_messages
WHERE user_id = 123
ORDER BY created_at ASC;
```

**Query para contar perguntas:**

```sql
SELECT COUNT(*) FROM chat_messages
WHERE user_id = 123 AND sender = 'user';
```

---

## ✅ Checklist de Validação

Antes de considerar o chat pronto:

- [ ] Servidor backend iniciando sem erros
- [ ] Frontend carregando sem erros
- [ ] Consegue fazer login
- [ ] Página "Consultas" exibe o chat
- [ ] Consegue enviar mensagem
- [ ] Mensagem aparece no histórico
- [ ] Resposta do especialista aparece
- [ ] Contador atualiza (X/10)
- [ ] Após 10 perguntas, input bloqueia
- [ ] Botão "Contatos" aparece
- [ ] Link para /contato funciona

---

## 🎓 Para Apresentação do TCC

### Pontos Importantes:

✅ **Sistema de limitação implementado** (10 perguntas por usuário)  
✅ **Banco de dados relacional** (PostgreSQL via Neon)  
✅ **Autenticação segura** (JWT + bcrypt)  
✅ **API RESTful** seguindo boas práticas  
✅ **Frontend React moderno** com TypeScript  
✅ **Integração completa** frontend ↔ backend ↔ banco

### Demonstração Sugerida:

1. Mostrar arquitetura (diagrama em CHAT-RESUMO.md)
2. Fazer login no sistema
3. Enviar 3-4 mensagens no chat
4. Mostrar histórico sendo atualizado
5. Enviar até atingir 10 perguntas
6. Mostrar bloqueio e redirecionamento

---

## 📚 Documentação Adicional

- **Técnica Completa:** `CHAT-IMPLEMENTATION.md`
- **Visão Geral Projeto:** `README.md`
- **Segurança:** `SECURITY.md`
- **Setup Colaborador:** `SETUP-COLABORADOR.md`

---

## 🎉 Status: ✅ IMPLEMENTADO E FUNCIONAL!

**Última atualização:** 17/10/2025  
**Versão:** 1.0.0  
**Status:** Pronto para testes e apresentação
