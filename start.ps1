# TCC EyeVital - Script de InicializaÃ§Ã£o

Write-Host "
========================================" -ForegroundColor Cyan
Write-Host "   TCC EyeVital - Iniciando Projeto" -ForegroundColor Cyan
Write-Host "========================================
" -ForegroundColor Cyan

# Verificar dependÃªncias
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "[ERRO] DependÃªncias do frontend nÃ£o encontradas!" -ForegroundColor Red
    Write-Host "Execute: cd frontend && npm install" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

if (-not (Test-Path "backend\node_modules")) {
    Write-Host "[ERRO] DependÃªncias do backend nÃ£o encontradas!" -ForegroundColor Red
    Write-Host "Execute: cd backend && npm install" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Iniciar Backend
Write-Host "[1/3] Iniciando Backend (porta 3001)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; node index.js" -WindowStyle Normal

# Aguardar backend inicializar
Write-Host "[2/3] Aguardando backend inicializar..." -ForegroundColor Green
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "[3/3] Iniciando Frontend (porta 5173)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-ExecutionPolicy", "Bypass", "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -WindowStyle Normal

Write-Host "
========================================" -ForegroundColor Cyan
Write-Host "   Projeto Iniciado com Sucesso!" -ForegroundColor Cyan
Write-Host "========================================
" -ForegroundColor Cyan
Write-Host "Backend:  " -NoNewline; Write-Host "http://localhost:3001" -ForegroundColor Yellow
Write-Host "Frontend: " -NoNewline; Write-Host "http://localhost:5173" -ForegroundColor Yellow
Write-Host "
Duas janelas foram abertas. Feche-as para parar os servidores.
"

Read-Host "Pressione Enter para fechar esta janela"
