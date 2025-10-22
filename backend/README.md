# Backend - TCC EyeVital

## Stack
- Node.js 18+
- Express 4
- Prisma ORM 5.22
- PostgreSQL (Neon)
- JWT Authentication

## InstalaÃ§Ã£o
```bash
npm install
```

## Desenvolvimento
```bash
npm start
```
Servidor: http://localhost:3001

## Banco de Dados
```bash
# Sincronizar schema
npm run db:push

# Abrir Prisma Studio
npm run db:studio
```

## VariÃ¡veis de Ambiente
Copie \.env.example\ para \.env\ e configure:
- \DATABASE_URL\ - String de conexÃ£o PostgreSQL
- \JWT_SECRET\ - Chave secreta para JWT
- \PORT\ - Porta do servidor (default: 3001)

## Deploy
Pode ser deployado em:
- Railway
- Render
- Fly.io
- Heroku
