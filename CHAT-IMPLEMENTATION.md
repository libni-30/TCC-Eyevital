# 💬 Sistema de Chat - Implementação

## 📋 Visão Geral

O sistema de chat permite que usuários autenticados façam até **10 perguntas** para um especialista. Após atingir o limite, são redirecionados para a página de contatos.

## 🗄️ Estrutura do Banco de Dados

### Tabela: `chat_messages`

```sql
CREATE TABLE chat_messages (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sender TEXT NOT NULL DEFAULT 'user', -- 'user' ou 'specialist'
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Índice:**

```sql
CREATE INDEX idx_chat_user_id ON chat_messages(user_id);
```

## 🔌 Endpoints da API

### 1. `GET /chat/messages` (Protegido)

Retorna histórico de mensagens do usuário autenticado.

**Response:**

```json
[
  {
    "id": 1,
    "message": "Como cuidar da minha visão?",
    "sender": "user",
    "created_at": "2025-10-17T10:30:00Z"
  },
  {
    "id": 2,
    "message": "Olá! É importante...",
    "sender": "specialist",
    "created_at": "2025-10-17T10:30:05Z"
  }
]
```

### 2. `GET /chat/count` (Protegido)

Retorna quantas perguntas o usuário já fez.

**Response:**

```json
{
  "count": 3
}
```

### 3. `POST /chat/send` (Protegido)

Envia uma nova mensagem (limite de 10 perguntas).

**Request:**

```json
{
  "message": "Qual a melhor forma de prevenir miopia?"
}
```

**Response (Sucesso):**

```json
{
  "userMessage": {
    "id": 5,
    "message": "Qual a melhor forma de prevenir miopia?",
    "sender": "user",
    "created_at": "2025-10-17T11:00:00Z"
  },
  "specialistMessage": {
    "id": 6,
    "message": "Obrigado pela sua pergunta! Um especialista irá responder em breve.",
    "sender": "specialist",
    "created_at": "2025-10-17T11:00:01Z"
  },
  "questionsRemaining": 7
}
```

**Response (Limite atingido - 403):**

```json
{
  "error": "limit_reached",
  "message": "Você atingiu o limite de 10 perguntas"
}
```

### 4. `DELETE /chat/clear` (Protegido)

Limpa todo o histórico de chat do usuário (útil para testes).

**Response:**

```json
{
  "ok": true,
  "message": "Histórico limpo com sucesso"
}
```

## 🎨 Frontend - Componente ChatIntro

**Localização:** `src/components/ChatIntro.tsx`

### Funcionalidades:

- ✅ Carrega histórico de mensagens automaticamente
- ✅ Mostra contador de perguntas (X/10)
- ✅ Envia mensagens via API
- ✅ Recebe resposta automática do "especialista"
- ✅ Bloqueia após 10 perguntas
- ✅ Exibe alerta com link para contatos quando limite é atingido
- ✅ Loading state durante envio
- ✅ Tratamento de erros
- ✅ Suporte para Enter no input

### Uso:

```tsx
import ChatIntro from "./ChatIntro";

// Em ConsultasPage.tsx
<ChatIntro limit={10} />;
```

## 🚀 Como Testar

### 1. Inicializar o Banco

```bash
cd server
npm run db:init
```

### 2. Iniciar Backend

```bash
cd server
npm run dev
```

### 3. Iniciar Frontend

```bash
npm run dev
```

### 4. Testar Fluxo Completo

1. **Registrar/Login** na aplicação
2. **Navegar** para `/consultas`
3. **Enviar** uma mensagem no chat
4. **Verificar** resposta automática do especialista
5. **Enviar** mais 9 mensagens para atingir limite
6. **Verificar** bloqueio e link para contatos

### 5. Testar via API (PowerShell)

**Fazer login e obter token:**

```powershell
$body = @{ email='seu@email.com'; password='SuaSenha123!' } | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://127.0.0.1:3000/auth/login -Method Post -ContentType 'application/json' -Body $body
$token = $response.token
```

**Enviar mensagem:**

```powershell
$headers = @{ Authorization = "Bearer $token" }
$body = @{ message='Como prevenir problemas de visão?' } | ConvertTo-Json
Invoke-RestMethod -Uri http://127.0.0.1:3000/chat/send -Method Post -Headers $headers -ContentType 'application/json' -Body $body
```

**Ver histórico:**

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3000/chat/messages -Headers $headers
```

**Contar perguntas:**

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3000/chat/count -Headers $headers
```

**Limpar histórico:**

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3000/chat/clear -Method Delete -Headers $headers
```

## 🔮 Melhorias Futuras

### Curto Prazo:

- [ ] Melhorar estilização do histórico de mensagens
- [ ] Adicionar scroll automático para última mensagem
- [ ] Validação de tamanho máximo de mensagem (ex: 500 caracteres)
- [ ] Debounce no botão de enviar para evitar cliques duplos

### Médio Prazo:

- [ ] Integrar com IA (ChatGPT, Gemini) para respostas reais
- [ ] Sistema de notificações quando especialista responder
- [ ] Permitir anexar imagens (ex: fotos de exames)
- [ ] Categorizar perguntas (urgente, normal, dúvida geral)

### Longo Prazo:

- [ ] Chat em tempo real com WebSocket
- [ ] Dashboard admin para especialistas responderem
- [ ] Sistema de avaliação de respostas
- [ ] Exportar histórico em PDF

## 🐛 Troubleshooting

### Erro: "Failed to fetch"

- Verificar se backend está rodando (`cd server && npm run dev`)
- Verificar se `.env` tem `VITE_API_BASE_URL=http://127.0.0.1:3000`
- Verificar console do navegador para detalhes do erro

### Erro: "401 Unauthorized"

- Token JWT pode ter expirado (válido por 7 dias)
- Fazer logout e login novamente
- Verificar se `Authorization: Bearer <token>` está sendo enviado

### Erro: "limit_reached"

- Usuário já fez 10 perguntas
- Usar endpoint `/chat/clear` para resetar (apenas em desenvolvimento)
- Ou criar novo usuário para testar novamente

### Mensagens não aparecem

- Abrir DevTools → Network → verificar requisições
- Verificar se `loadChatData()` está sendo chamado
- Verificar console para erros JavaScript

## 📝 Notas Técnicas

- **Resposta Automática:** Atualmente, o especialista responde automaticamente. Pode ser substituído por integração com IA ou dashboard admin.
- **Limite:** Hardcoded para 10 perguntas, mas pode ser configurável por usuário/plano no futuro.
- **Persistência:** Mensagens são salvas permanentemente até usuário deletar conta.
- **Performance:** Índice em `user_id` garante queries rápidas mesmo com muitas mensagens.
