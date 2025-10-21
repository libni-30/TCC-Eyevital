# 🚀 INSTRUÇÕES DE INSTALAÇÃO - MIGRAÇÃO PRISMA

Este guia irá te ajudar a migrar o servidor do sistema antigo (SQL manual) para Prisma ORM de forma segura.

## ⚡ Instalação Rápida (3 Comandos)

```bash
cd server
migrate-to-prisma.bat
npm run db:push
npm run dev
```

Pronto! ✨

---

## 📋 Instalação Detalhada

### Passo 1: Navegar para o diretório do servidor

```bash
cd c:\Users\libni\Documents\tcc-eyevital\TCC-Eyevital-6\server
```

### Passo 2: Instalar dependências do Prisma

**Opção A: Automaticamente (se npm funcionar)**
```bash
npm install
```

**Opção B: Manualmente (se tiver problemas com PowerShell)**
1. Abra o CMD como Administrador
2. Execute:
   ```cmd
   npm install @prisma/client
   npm install --save-dev prisma
   ```

### Passo 3: Fazer backup do arquivo antigo

```bash
copy index.js index.old.js
```

### Passo 4: Substituir pelo novo arquivo

```bash
copy index.new.js index.js
copy scripts\seed-user.new.js scripts\seed-user.js
```

### Passo 5: Gerar o Prisma Client

```bash
npm run db:generate
```

Você deve ver:
```
✔ Generated Prisma Client to .\node_modules\@prisma\client
```

### Passo 6: Configurar variáveis de ambiente

Certifique-se que o arquivo `.env` existe e tem:

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"
JWT_SECRET="seu-secret-forte-aqui"
NODE_ENV="development"
PORT=3001
HOST="0.0.0.0"
```

### Passo 7: Sincronizar schema com o banco

**⚠️ IMPORTANTE: Este comando NÃO apaga dados!**

```bash
npm run db:push
```

Isso irá:
- Comparar o schema Prisma com o banco atual
- Aplicar apenas as mudanças necessárias
- Preservar todos os dados existentes

Você deve ver:
```
🚀  Your database is now in sync with your Prisma schema.
```

### Passo 8: Testar o servidor

```bash
npm run dev
```

Você deve ver:
```
🔄 Testando conexão com o banco de dados...
✅ Conexão com o banco estabelecida com sucesso!
✅ API listening on http://localhost:3001
📡 Servidor pronto para receber conexões
🔒 Modo seguro: Schema gerenciado pelo Prisma (sem recriação automática)
```

### Passo 9: Verificar endpoints

Abra o navegador e teste:
- http://localhost:3001/health
- http://localhost:3001/db/health

Ambos devem retornar `{"ok": true}`

---

## ✅ Checklist de Validação

Marque cada item conforme completa:

- [ ] Dependências instaladas (`@prisma/client`, `prisma`)
- [ ] Backup criado (`index.old.js`)
- [ ] Arquivo `index.js` substituído
- [ ] Prisma Client gerado (sem erros)
- [ ] Arquivo `.env` configurado
- [ ] Schema sincronizado com banco (`db:push`)
- [ ] Servidor iniciou sem erros
- [ ] Endpoint `/health` funciona
- [ ] Endpoint `/db/health` funciona
- [ ] Login/Register funcionando
- [ ] Chat funcionando (se aplicável)

---

## 🎯 Testando a Migração

### 1. Criar usuário de teste

```bash
npm run db:seed
```

Ou com dados customizados:
```bash
node scripts/seed-user.js teste@email.com MinhaSenh@123 MeuNome
```

### 2. Testar login

Use Postman, Insomnia ou curl:

```bash
curl -X POST http://localhost:3001/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"teste@email.com\",\"password\":\"MinhaSenh@123\"}"
```

Deve retornar:
```json
{
  "user": { "id": "1", "email": "teste@email.com", "username": "MeuNome" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Visualizar dados no Prisma Studio

```bash
npm run db:studio
```

Abre uma interface visual no navegador onde você pode ver/editar dados.

---

## 🐛 Problemas Comuns e Soluções

### ❌ Erro: "Cannot find module '@prisma/client'"

**Solução:**
```bash
npm run db:generate
```

### ❌ Erro: "Can't reach database server"

**Causas possíveis:**
1. `DATABASE_URL` incorreta no `.env`
2. Sem conexão com internet
3. Banco Neon pausado (acordar acessando o dashboard)

**Solução:**
1. Verifique a URL no `.env`
2. Teste conexão: `npx prisma db pull`
3. Acesse dashboard do Neon e verifique se está ativo

### ❌ Erro: "A migration failed to apply"

**Solução (dev apenas):**
```bash
npm run db:push
```

Este comando força sincronização sem criar migração.

### ❌ Erro: "P2002: Unique constraint failed"

Isso significa que você está tentando criar um registro duplicado (ex: email já existe).

**Solução:**
- Para seed: o script já usa `upsert` que atualiza se existir
- Para register: use outro email

### ❌ PowerShell bloqueia scripts

**Solução 1: Use CMD ao invés de PowerShell**

**Solução 2: Libere execução (como Admin)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### ❌ Servidor não inicia após migração

**Diagnóstico:**
1. Verifique erros no console
2. Confirme que `index.js` foi substituído corretamente
3. Verifique se todas as dependências foram instaladas

**Rollback de emergência:**
```bash
copy index.old.js index.js
npm start
```

---

## 📊 Comparação: Antes vs Depois

| Aspecto | Antes (SQL Manual) | Depois (Prisma) |
|---------|-------------------|-----------------|
| **Criação de tabelas** | A cada reinício | Apenas via migração |
| **Segurança** | ❌ Risco de perda | ✅ 100% seguro |
| **Type Safety** | ❌ Nenhuma | ✅ Total |
| **Queries** | SQL raw | Type-safe methods |
| **Versionamento** | ❌ Nenhum | ✅ Git + migrations |
| **Rollback** | ❌ Impossível | ✅ Suportado |
| **Performance** | Manual | ✅ Otimizado |
| **Manutenção** | Difícil | ✅ Fácil |

---

## 🚀 Próximos Passos

Após completar a instalação:

1. **Desenvolvimento:**
   - Use `npm run dev` para desenvolvimento
   - Use `npm run db:studio` para visualizar dados
   - Crie migrações com `npm run db:migrate:dev`

2. **Deploy em Produção:**
   - Leia `PRISMA-DEPLOY-GUIDE.md`
   - Configure variáveis de ambiente
   - Use `npm run db:migrate` antes de `npm start`

3. **Manutenção:**
   - Commit migrações no Git
   - Documente mudanças no schema
   - Teste localmente antes de fazer deploy

---

## 📞 Precisa de Ajuda?

**Documentação criada:**
- `QUICK-START.txt` - Guia visual rápido
- `MIGRATION-SUMMARY.md` - Resumo executivo
- `MIGRATION-README.md` - Documentação completa
- `PRISMA-DEPLOY-GUIDE.md` - Guia de deploy
- `README.md` - README atualizado

**Links úteis:**
- Documentação Prisma: https://www.prisma.io/docs
- Prisma Migrate: https://www.prisma.io/docs/concepts/components/prisma-migrate
- Troubleshooting: https://www.prisma.io/docs/guides/database/troubleshooting

---

## ✨ Conclusão

Parabéns! Se você chegou até aqui, seu servidor está usando Prisma ORM de forma segura e profissional.

**Benefícios conquistados:**
- ✅ Dados em produção protegidos
- ✅ Migrações versionadas
- ✅ Type-safety completo
- ✅ Código mais limpo e mantível
- ✅ Performance otimizada

**Boa sorte com o TCC-EyeVital!** 🎉👁️
