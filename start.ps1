# TCC EyeVital - Script de Inicialização
# Execute com: .\start.ps1

Write-Host "`n========================================"  -ForegroundColor Cyan
Write-Host "   TCC EyeVital - Iniciando Projeto"  -ForegroundColor Cyan
Write-Host "========================================`n"  -ForegroundColor Cyan

# Verificar dependências
if (-not (Test-Path "node_modules")) {
    Write-Host "[ERRO] Dependências do frontend não encontradas!" -ForegroundColor Red
    Write-Host "Execute: npm install" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

if (-not (Test-Path "server\node_modules")) {
    Write-Host "[ERRO] Dependências do backend não encontradas!" -ForegroundColor Red
    Write-Host "Execute: cd server && npm install" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar arquivos .env
if (-not (Test-Path ".env")) {
    Write-Host "[AVISO] Arquivo .env não encontrado na raiz!" -ForegroundColor Yellow
    Write-Host "Copie .env.example para .env e configure." -ForegroundColor Yellow
}

if (-not (Test-Path "server\.env")) {
    Write-Host "[ERRO] Arquivo server\.env não encontrado!" -ForegroundColor Red
    Write-Host "Copie server\.env.example para server\.env e configure DATABASE_URL." -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Iniciar Backend
Write-Host "[1/3] Iniciando Backend (porta 3001)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; node index.js" -WindowStyle Normal

# Aguardar backend inicializar
Write-Host "[2/3] Aguardando backend inicializar..." -ForegroundColor Green
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "[3/3] Iniciando Frontend (porta 5173)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-ExecutionPolicy", "Bypass", "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev" -WindowStyle Normal

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Projeto Iniciado com Sucesso!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "Backend:  " -NoNewline; Write-Host "http://localhost:3001" -ForegroundColor Yellow
Write-Host "Frontend: " -NoNewline; Write-Host "http://localhost:5173" -ForegroundColor Yellow
Write-Host "`nDuas janelas foram abertas. Feche-as para parar os servidores.`n"

Read-Host "Pressione Enter para fechar esta janela"
