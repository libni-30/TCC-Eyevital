# TCC-Eyevital (React + TypeScript + Vite)

Este projeto usa React com Vite. A página oficial do app é `paginainicial.html`. O arquivo `index.html` existe apenas para redirecionar automaticamente para `paginainicial.html` (compatível com GitHub Pages que exige `index.html`).

## Como rodar

- Desenvolvimento: `npm run dev` e acesse http://localhost:5173/paginainicial.html (a raiz também redireciona).
- Build de produção: `npm run build` gera `dist/` com `paginainicial.html` e um `index.html` que redireciona.
- Preview: `npm run preview` e acesse http://localhost:4173/paginainicial.html.

## Variáveis de ambiente (.env)

Este projeto usa Vite. Para expor variáveis no frontend, o nome deve começar com `VITE_`.

1. Copie `.env.example` para `.env` (ou crie `.env.local`).
2. Preencha pelo menos:

```
VITE_API_BASE_URL=https://sua-api.exemplo.com
```

3. No código, use `import.meta.env` indiretamente via utilitário em `src/lib/env.ts` e o cliente `src/lib/api.ts`.

Exemplo de chamada:

```ts
// import { get } from './src/lib/api'
// const result = await get('/health')
```

Arquivos sensíveis `.env*` já estão no `.gitignore` (não serão commitados). Apenas `.env.example` fica versionado.

## Backend / API e Banco (Neon Postgres)

O backend Express está em `server/` e expõe endpoints de autenticação e saúde:

- `GET /health` – saúde da API
- `GET /db/health` – teste simples de conexão ao banco
- `GET /db/info` – informações do usuário/banco/versão
- `POST /auth/register` { email, password, username? }
- `POST /auth/login` { email, password }
- `GET /auth/me` (Authorization: Bearer <token>)
- `POST /auth/logout`

### 🔐 Como obter e configurar as credenciais do Neon

**⚠️ IMPORTANTE:** As credenciais do banco **NUNCA** devem ser commitadas no GitHub por segurança!

#### **Para o dono do projeto (você):**

1. **Obter credenciais do Neon:**
   - Acesse https://console.neon.tech
   - Faça login e selecione seu projeto
   - Vá em **Dashboard** → **Connection Details**
   - Copie a **Connection String** completa:
     ```
     postgres://usuario:senha@ep-xxxxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
     ```

2. **Salvar localmente (já feito):**
   - Você já tem o arquivo `server/.env` configurado localmente
   - Este arquivo está no `.gitignore` e **não** vai para o GitHub

3. **Guardar com segurança:**
   - **Opção 1:** Salve num gerenciador de senhas (1Password, Bitwarden, etc.)
   - **Opção 2:** Arquivo criptografado local
   - **Opção 3:** Nuvem privada (Google Drive pessoal, OneDrive, etc.)

#### **Para outros desenvolvedores (colaboradores):**

Quando alguém clonar este repositório, deve seguir estes passos:

1. **Copiar o arquivo de exemplo:**
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Preencher com as credenciais reais:**
   - Você (dono) deve compartilhar as credenciais de forma segura (não por email ou chat público!)
   - Use: Slack privado, Discord DM, 1Password compartilhado, ou encontro presencial

3. **Editar `server/.env`:**
   ```bash
   DATABASE_URL=postgres://[CREDENCIAL_RECEBIDA_DO_DONO]
   JWT_SECRET=[SEGREDO_RECEBIDO_DO_DONO]
   ```

#### **Para deploy em produção:**

Quando fizer deploy (Vercel, Railway, Render, etc.):
- **NÃO** use o arquivo `.env` 
- Configure as variáveis de ambiente no painel da plataforma
- Exemplo Vercel: Settings → Environment Variables
- Exemplo Railway: Variables tab

### Passos para conectar ao Neon (continuação)

1. Crie um banco no Neon e copie a connection string completa (incluindo `?sslmode=require`).
2. Em `server/.env` (crie a partir de `server/.env.example`):

```
DATABASE_URL=postgres://usuario:senha@ep-xxxxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=troque-por-um-segredo-forte
```

3. (Opcional) Preencha também o `.env` na raiz se quiser reutilizar variáveis no frontend (não necessário para a API funcionar).
4. Rode as migrações/tabelas básicas:

```
cd server
npm install
npm run db:init
```

5. Inicie o backend:

```
npm run dev
```

6. No arquivo `.env` da raiz configure o frontend para apontar para a API local:

```
VITE_API_BASE_URL=http://127.0.0.1:3000
```

> Dica: Se ao reabrir o VS Code aparecer "Failed to fetch" no Login/Registro, é porque os servidores pararam. Suba novamente o backend (cd server; npm start) e o frontend (npm run dev) e confirme que o `.env` da raiz aponta para a mesma porta da API (ex.: `VITE_API_BASE_URL=http://127.0.0.1:3001` se a API estiver na 3001).

### Testes rápidos (PowerShell)

Registro + /auth/me:

```
$ts = Get-Random; $email = "tcc$ts@example.com"; $body = @{ email=$email; password="Senha123!"; username="User$ts" } | ConvertTo-Json; \
Invoke-RestMethod -Uri http://127.0.0.1:3000/auth/register -Method Post -ContentType 'application/json' -Body $body | Tee-Object -Variable reg | Out-Null; \
$token = $reg.token; Invoke-RestMethod -Uri http://127.0.0.1:3000/auth/me -Headers @{ Authorization = "Bearer $token" }
```

Login:

```
$body = @{ email='<email-usado>'; password='Senha123!' } | ConvertTo-Json; \
Invoke-RestMethod -Uri http://127.0.0.1:3000/auth/login -Method Post -ContentType 'application/json' -Body $body
```

Se precisar criar novas tabelas, edite `server/scripts/init-db.js` e rode novamente `npm run db:init` (as operações são idempotentes para CREATE TABLE/INDEX usados aqui).


## Estrutura de entradas HTML

- `paginainicial.html`: entrada principal do app React (carrega `/src/main.tsx`).
- `index.html`: somente redireciona para `paginainicial.html` para evitar conflitos de nome com outras páginas.

---

Conteúdo padrão do template Vite abaixo (para referência):

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
