# Script de Migração para Prisma ORM
# Execute este script para migrar do sistema antigo para Prisma

Write-Host "🚀 Iniciando migração para Prisma ORM..." -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretório correto
if (!(Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script dentro da pasta 'server'" -ForegroundColor Red
    exit 1
}

# Passo 1: Backup do arquivo antigo
Write-Host "📦 Fazendo backup do index.js antigo..." -ForegroundColor Yellow
if (Test-Path "index.js") {
    Copy-Item "index.js" "index.old.js" -Force
    Write-Host "✅ Backup criado: index.old.js" -ForegroundColor Green
}

# Passo 2: Substituir pelo novo arquivo
Write-Host ""
Write-Host "🔄 Substituindo index.js pelo novo com Prisma..." -ForegroundColor Yellow
if (Test-Path "index.new.js") {
    Copy-Item "index.new.js" "index.js" -Force
    Write-Host "✅ index.js atualizado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro: Arquivo index.new.js não encontrado" -ForegroundColor Red
    exit 1
}

# Passo 3: Instalar dependências
Write-Host ""
Write-Host "📥 Instalando dependências do Prisma..." -ForegroundColor Yellow
npm install @prisma/client
npm install -D prisma

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}

# Passo 4: Gerar cliente Prisma
Write-Host ""
Write-Host "⚙️ Gerando Prisma Client..." -ForegroundColor Yellow
npm run db:generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Prisma Client gerado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao gerar Prisma Client" -ForegroundColor Red
    exit 1
}

# Passo 5: Verificar conexão com banco
Write-Host ""
Write-Host "🔍 Verificando conexão com o banco..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Para sincronizar com banco existente, execute:" -ForegroundColor Cyan
Write-Host "  npm run db:push" -ForegroundColor White
Write-Host ""
Write-Host "Para criar uma nova migração, execute:" -ForegroundColor Cyan
Write-Host "  npm run db:migrate:dev" -ForegroundColor White
Write-Host ""

# Mensagem final
Write-Host "✨ Migração concluída com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "  1. Sincronize o schema: npm run db:push" -ForegroundColor White
Write-Host "  2. Inicie o servidor: npm run dev" -ForegroundColor White
Write-Host "  3. Leia o guia: PRISMA-DEPLOY-GUIDE.md" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANTE: O servidor agora NÃO recria tabelas automaticamente!" -ForegroundColor Yellow
Write-Host "   Isso protege seus dados em produção. 🛡️" -ForegroundColor Green
