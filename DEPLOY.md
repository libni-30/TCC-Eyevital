# ðŸš€ Guia de Deploy - TCC EyeVital

## Estrutura Reorganizada

\\\
TCC-Eyevital-6/
â”œâ”€â”€ frontend/          # React + Vite
â”‚   â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ .env
â”œâ”€â”€ backend/           # Express + Prisma
â”‚   â”œâ”€â”€ prisma/
â”‚   â”œâ”€â”€ index.js
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ .env
â”œâ”€â”€ start.bat          # Iniciar tudo
â””â”€â”€ README.md
\\\

## ðŸ“¦ InstalaÃ§Ã£o Inicial

\\\ash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
\\\

## â–¶ï¸ Iniciar Localmente

### OpÃ§Ã£o 1: Script automÃ¡tico
\\\ash
# Clique duas vezes em start.bat
# OU execute:
start.bat
\\\

### OpÃ§Ã£o 2: Manual
\\\ash
# Terminal 1 - Backend
cd backend
node index.js

# Terminal 2 - Frontend
cd frontend
npm run dev
\\\

## ðŸŒ Deploy

### Frontend (Vercel)

1. Instale a CLI do Vercel:
\\\ash
npm i -g vercel
\\\

2. Deploy:
\\\ash
cd frontend
vercel
\\\

3. Configure variÃ¡veis de ambiente na dashboard:
   - \VITE_API_BASE_URL\ â†’ URL da API backend

### Backend (Railway)

1. Crie conta em railway.app

2. Novo Projeto â†’ Deploy from GitHub

3. Configure:
   - Root Directory: \ackend\
   - Build Command: \
pm install && npm run db:push\
   - Start Command: \
ode index.js\

4. VariÃ¡veis de ambiente:
   - \DATABASE_URL\ â†’ String do PostgreSQL
   - \JWT_SECRET\ â†’ Chave secreta
   - \PORT\ â†’ \${{PORT}}\ (Railway fornece)

### Alternativas

**Frontend:**
- Netlify
- GitHub Pages
- Cloudflare Pages

**Backend:**
- Render
- Fly.io
- Heroku
- DigitalOcean App Platform

## ðŸ” Checklist de SeguranÃ§a

- [ ] Alterar \JWT_SECRET\ em produÃ§Ã£o
- [ ] Configurar CORS para domÃ­nio especÃ­fico
- [ ] Usar HTTPS em produÃ§Ã£o
- [ ] NÃ£o commitar arquivos \.env\
- [ ] Revisar permissÃµes do banco de dados

## ðŸ“ Notas

- O frontend pode ser deployado em CDN (Vercel, Netlify)
- O backend precisa de servidor Node.js
- Banco de dados PostgreSQL (Neon Ã© grÃ¡tis)
- SSL/TLS Ã© obrigatÃ³rio em produÃ§Ã£o
