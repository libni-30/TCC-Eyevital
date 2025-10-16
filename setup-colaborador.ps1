# Script de Setup Automático para Colaboradores
# Execute com: .\setup-colaborador.ps1

Write-Host "🚀 Setup TCC-Eyevital - Bem-vindo!" -ForegroundColor Cyan
Write-Host ""

# Verificar se está na raiz do projeto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Execute este script na raiz do projeto!" -ForegroundColor Red
    exit 1
}

# 1. Instalar dependências
Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do frontend" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Instalando dependências do backend..." -ForegroundColor Yellow
Set-Location server
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do backend" -ForegroundColor Red
    exit 1
}
Set-Location ..

# 2. Configurar .env do frontend
Write-Host ""
Write-Host "⚙️  Configurando frontend..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Arquivo .env criado na raiz" -ForegroundColor Green
    
    # Adicionar URL base automaticamente
    $envContent = Get-Content ".env"
    $envContent = $envContent -replace "VITE_API_BASE_URL=", "VITE_API_BASE_URL=http://localhost:3000"
    Set-Content ".env" $envContent
    Write-Host "✅ VITE_API_BASE_URL configurado" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env já existe, pulando..." -ForegroundColor Yellow
}

# 3. Configurar .env do backend
Write-Host ""
Write-Host "⚙️  Configurando backend..." -ForegroundColor Yellow
if (-not (Test-Path "server/.env")) {
    Copy-Item "server/.env.example" "server/.env"
    Write-Host "✅ Arquivo server/.env criado" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  ATENÇÃO: Você precisa preencher as credenciais em server/.env" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opções:" -ForegroundColor Cyan
    Write-Host "  1. Banco compartilhado: Peça as credenciais ao dono do projeto" -ForegroundColor White
    Write-Host "  2. Banco próprio: Crie uma conta em https://neon.tech" -ForegroundColor White
    Write-Host ""
    
    # Perguntar qual opção
    $opcao = Read-Host "Qual opção você vai usar? [1/2]"
    
    if ($opcao -eq "1") {
        Write-Host ""
        Write-Host "📋 Cole a DATABASE_URL que você recebeu:" -ForegroundColor Cyan
        $dbUrl = Read-Host
        
        Write-Host "📋 Cole o JWT_SECRET que você recebeu:" -ForegroundColor Cyan
        $jwtSecret = Read-Host
        
        # Atualizar .env
        $envContent = Get-Content "server/.env"
        $envContent = $envContent -replace "DATABASE_URL=", "DATABASE_URL=$dbUrl"
        $envContent = $envContent -replace "JWT_SECRET=.*", "JWT_SECRET=$jwtSecret"
        Set-Content "server/.env" $envContent
        
        Write-Host "✅ Credenciais configuradas!" -ForegroundColor Green
        
    } elseif ($opcao -eq "2") {
        Write-Host ""
        Write-Host "🌐 Abra https://neon.tech e crie uma conta" -ForegroundColor Cyan
        Write-Host "📋 Depois de criar o projeto, copie a Connection String" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Cole a DATABASE_URL do Neon:" -ForegroundColor Cyan
        $dbUrl = Read-Host
        
        # Gerar JWT_SECRET
        Write-Host "🔐 Gerando JWT_SECRET..." -ForegroundColor Yellow
        $jwtSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
        
        # Atualizar .env
        $envContent = Get-Content "server/.env"
        $envContent = $envContent -replace "DATABASE_URL=", "DATABASE_URL=$dbUrl"
        $envContent = $envContent -replace "JWT_SECRET=.*", "JWT_SECRET=$jwtSecret"
        Set-Content "server/.env" $envContent
        
        Write-Host "✅ Credenciais configuradas!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🔧 Rodando migrações..." -ForegroundColor Yellow
        Set-Location server
        npm run db:init
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Tabelas criadas!" -ForegroundColor Green
            Write-Host ""
            Write-Host "👤 Criando usuário de teste..." -ForegroundColor Yellow
            npm run db:seed:user
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Usuário criado! Anote as credenciais acima." -ForegroundColor Green
            }
        }
        Set-Location ..
    }
} else {
    Write-Host "⚠️  server/.env já existe, pulando..." -ForegroundColor Yellow
}

# 4. Resumo final
Write-Host ""
Write-Host "✅ Setup concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos passos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. Abra DOIS terminais:" -ForegroundColor White
Write-Host "     Terminal 1: cd server && npm run start" -ForegroundColor Gray
Write-Host "     Terminal 2: npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Acesse http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "  3. Teste o login com o usuário criado" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Bom desenvolvimento!" -ForegroundColor Green
