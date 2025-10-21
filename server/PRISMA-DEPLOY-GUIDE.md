# 🚀 Guia de Deploy Seguro com Prisma ORM

## ⚠️ PROBLEMA RESOLVIDO

O problema anterior era que o servidor executava `ensureSchema()` toda vez que iniciava, recriando tabelas em produção e causando perda de dados. **Agora usamos Prisma ORM** que gerencia migrações de forma segura e profissional.

---

## 📋 Pré-requisitos

1. Node.js 18+ instalado
2. Acesso ao banco de dados PostgreSQL (Neon)
3. Variável `DATABASE_URL` configurada

---

## 🔧 Setup Inicial (Primeira Vez)

### 1. Instalar Dependências

```bash
cd server
npm install
```

Isso irá instalar:
- `@prisma/client` - Cliente do Prisma
- `prisma` - CLI do Prisma (dev dependency)
- Todas as outras dependências

### 2. Gerar Cliente Prisma

```bash
npm run db:generate
```

Isso gera os tipos TypeScript e o cliente baseado no `schema.prisma`.

### 3. Criar a Primeira Migração (Desenvolvimento)

Se você está em **desenvolvimento local**:

```bash
npm run db:migrate:dev
```

Isso irá:
- Comparar o schema com o banco
- Criar uma migração se houver diferenças
- Aplicar a migração
- Gerar o cliente Prisma

### 4. Deploy em Produção (Primeira Vez)

Se você já tem o banco de dados existente (Neon), você precisa sincronizar o schema Prisma com o estado atual:

**Opção A: Se o banco já tem as tabelas (migração do sistema antigo)**

```bash
# Criar uma migração inicial baseada no estado do banco
npx prisma db pull

# Isso cria o schema.prisma baseado no banco atual
# Depois, aplique o schema:
npm run db:push
```

**Opção B: Se é um banco novo**

```bash
npm run db:migrate
```

---

## 🔄 Workflow de Desenvolvimento

### Fazendo mudanças no schema

1. Edite o arquivo `server/prisma/schema.prisma`
2. Crie uma migração:
   ```bash
   npm run db:migrate:dev
   ```
3. Commit a migração no Git (pasta `prisma/migrations/`)

### Aplicando mudanças em Produção

```bash
npm run db:migrate
```

**IMPORTANTE**: Este comando é seguro e **NÃO recria tabelas**. Ele apenas aplica migrações pendentes.

---

## 📦 Deploy em Produção (Step-by-Step)

### Para Vercel, Render, Railway, etc.

1. **Adicione as variáveis de ambiente**:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
   JWT_SECRET=seu-segredo-forte-aqui
   NODE_ENV=production
   ```

2. **Configure o build command**:
   ```
   cd server && npm install && npm run db:generate
   ```

3. **Configure o start command**:
   ```
   cd server && npm run db:migrate && npm start
   ```

4. **Deploy**: O servidor irá:
   - Instalar dependências
   - Gerar o cliente Prisma
   - Aplicar migrações pendentes (seguro)
   - Iniciar o servidor

---

## 🛡️ Segurança Garantida

### ✅ O que mudou:

| Antes (PERIGOSO) | Agora (SEGURO) |
|------------------|----------------|
| `ensureSchema()` executava em cada inicialização | Prisma só aplica migrações quando solicitado |
| `CREATE TABLE IF NOT EXISTS` recriava índices | Migrações são versionadas e idempotentes |
| Sem controle de versão do schema | Histórico completo em `prisma/migrations/` |
| Queries SQL raw em todo lugar | Type-safe queries com Prisma Client |

### ✅ Benefícios do Prisma:

- **Não recria tabelas**: Migrações são aplicadas apenas uma vez
- **Versionamento**: Cada mudança tem um histórico
- **Type-safety**: Erros são detectados em tempo de desenvolvimento
- **Rollback**: Possível reverter migrações se necessário
- **Zero downtime**: Migrações são seguras para produção

---

## 🔍 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run db:migrate:dev` | Cria e aplica migração (dev) |
| `npm run db:migrate` | Aplica migrações pendentes (prod) |
| `npm run db:generate` | Gera o cliente Prisma |
| `npm run db:studio` | Abre interface visual do banco |
| `npm run db:push` | Sincroniza schema sem criar migração (dev) |

---

## 🚨 Troubleshooting

### Erro: "Can't reach database server"

Verifique a `DATABASE_URL`:
```bash
# No arquivo .env
DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require"
```

### Erro: "Prisma Client is not generated"

Execute:
```bash
npm run db:generate
```

### Erro: "Migration failed"

1. Verifique logs da migração
2. Se necessário, faça rollback:
   ```bash
   npx prisma migrate resolve --rolled-back <migration_name>
   ```

### Banco está fora de sincronia

Se o banco de produção tem mudanças manuais:
```bash
# Puxe o schema atual do banco
npx prisma db pull

# Revise as mudanças
# Depois crie uma nova migração
npm run db:migrate:dev
```

---

## 📚 Recursos Adicionais

- [Documentação Prisma](https://www.prisma.io/docs)
- [Guia de Migração](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Deploy Guides](https://www.prisma.io/docs/guides/deployment)

---

## ⚙️ Estrutura de Arquivos

```
server/
├── prisma/
│   ├── schema.prisma          # Definição do schema
│   └── migrations/            # Histórico de migrações
│       └── 20241021_initial/  # Exemplo de migração
├── index.js                   # Servidor com Prisma (NOVO)
├── index.old.js              # Backup do servidor antigo
├── package.json              # Scripts atualizados
└── .env                      # Variáveis de ambiente
```

---

## ✨ Migração Concluída

O sistema agora está usando **Prisma ORM** de forma segura. Não há mais risco de perda de dados em produção! 🎉
