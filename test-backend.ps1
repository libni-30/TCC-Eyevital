# Script para testar o backend
Write-Host "Testando Backend do TCC-Eyevital..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3001"

# Teste 1: Health Check da API
Write-Host "1. Testando /health..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    if ($health.ok -eq $true) {
        Write-Host "   OK - API esta funcionando!" -ForegroundColor Green
    } else {
        Write-Host "   ERRO - API retornou ok=false" -ForegroundColor Red
    }
} catch {
    Write-Host "   ERRO - Nao foi possivel conectar com a API" -ForegroundColor Red
    Write-Host "   Certifique-se que o backend esta rodando" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Teste 2: Health Check do Banco de Dados
Write-Host "2. Testando /db/health..." -ForegroundColor Yellow
try {
    $dbHealth = Invoke-RestMethod -Uri "$baseUrl/db/health" -Method Get
    if ($dbHealth.ok -eq $true) {
        Write-Host "   OK - Banco de dados esta conectado!" -ForegroundColor Green
    } else {
        Write-Host "   ERRO - Banco de dados nao esta acessivel" -ForegroundColor Red
    }
} catch {
    Write-Host "   ERRO - Falha ao testar banco de dados" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Teste 3: Informações do Banco
Write-Host "3. Obtendo informacoes do banco..." -ForegroundColor Yellow
try {
    $dbInfo = Invoke-RestMethod -Uri "$baseUrl/db/info" -Method Get
    if ($dbInfo.ok -eq $true) {
        Write-Host "   OK - Informacoes obtidas com sucesso!" -ForegroundColor Green
        Write-Host "   Usuario: $($dbInfo.info.current_user)" -ForegroundColor Cyan
        Write-Host "   Database: $($dbInfo.info.current_database)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "   ERRO - Falha ao obter informacoes" -ForegroundColor Red
}

Write-Host ""

# Teste 4: Teste de Autenticação (Registro)
Write-Host "4. Testando autenticacao (registro)..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$testEmail = "teste$timestamp@eyevital.local"
$testPassword = "SenhaSegura123!"

try {
    $registerBodyJson = "{`"email`":`"$testEmail`",`"password`":`"$testPassword`",`"username`":`"Usuario Teste`"}"

    $registerResult = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body $registerBodyJson -ContentType "application/json"
    
    if ($registerResult.token) {
        Write-Host "   OK - Registro de usuario funcionando!" -ForegroundColor Green
        Write-Host "   Email: $testEmail" -ForegroundColor Cyan
        Write-Host "   Token JWT recebido" -ForegroundColor Cyan
        
        # Teste 5: Verificar token com /auth/me
        Write-Host ""
        Write-Host "5. Testando autenticacao com token..." -ForegroundColor Yellow
        $headers = @{
            Authorization = "Bearer $($registerResult.token)"
        }
        
        $meResult = Invoke-RestMethod -Uri "$baseUrl/auth/me" -Method Get -Headers $headers
        if ($meResult.email -eq $testEmail) {
            Write-Host "   OK - Token JWT valido!" -ForegroundColor Green
            Write-Host "   Usuario autenticado: $($meResult.email)" -ForegroundColor Cyan
        }
    }
} catch {
    Write-Host "   ERRO - Falha no teste de autenticacao" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RESUMO: Backend testado com sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "   1. Iniciar frontend: cd frontend; npm run dev" -ForegroundColor White
Write-Host "   2. Acessar: http://localhost:5173" -ForegroundColor White
Write-Host ""
