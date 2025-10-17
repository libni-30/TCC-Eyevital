#!/usr/bin/env pwsh
# Script de teste rápido do sistema de chat
# Uso: .\test-chat.ps1

Write-Host "🧪 Teste do Sistema de Chat - Eyevital" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

$API_URL = "http://127.0.0.1:3000"

# 1. Criar usuário de teste
Write-Host "1️⃣  Criando usuário de teste..." -ForegroundColor Yellow
$timestamp = Get-Random
$email = "chattest$timestamp@example.com"
$password = "Teste123!"

$registerBody = @{
    email = $email
    password = $password
    username = "ChatTester$timestamp"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "$API_URL/auth/register" -Method Post -ContentType 'application/json' -Body $registerBody
    $token = $registerResponse.token
    Write-Host "   ✅ Usuário criado: $email" -ForegroundColor Green
    Write-Host "   🔑 Token: $($token.Substring(0, 20))..." -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Erro ao criar usuário: $_" -ForegroundColor Red
    exit 1
}

$headers = @{ Authorization = "Bearer $token" }

# 2. Verificar contador inicial
Write-Host "`n2️⃣  Verificando contador de perguntas..." -ForegroundColor Yellow
try {
    $countResponse = Invoke-RestMethod -Uri "$API_URL/chat/count" -Headers $headers
    Write-Host "   ✅ Perguntas feitas: $($countResponse.count)/10" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Erro ao buscar contador: $_" -ForegroundColor Red
}

# 3. Enviar 3 mensagens de teste
Write-Host "`n3️⃣  Enviando 3 mensagens de teste..." -ForegroundColor Yellow
$questions = @(
    "Como posso cuidar melhor da minha visão?",
    "Quais são os sintomas de miopia?",
    "Com que frequência devo ir ao oftalmologista?"
)

foreach ($question in $questions) {
    $msgBody = @{ message = $question } | ConvertTo-Json
    try {
        $sendResponse = Invoke-RestMethod -Uri "$API_URL/chat/send" -Method Post -Headers $headers -ContentType 'application/json' -Body $msgBody
        Write-Host "   ✅ Pergunta enviada: $($question.Substring(0, 40))..." -ForegroundColor Green
        Write-Host "      📊 Perguntas restantes: $($sendResponse.questionsRemaining)" -ForegroundColor Gray
        Start-Sleep -Milliseconds 500
    } catch {
        Write-Host "   ❌ Erro ao enviar: $_" -ForegroundColor Red
    }
}

# 4. Verificar histórico
Write-Host "`n4️⃣  Verificando histórico de mensagens..." -ForegroundColor Yellow
try {
    $historyResponse = Invoke-RestMethod -Uri "$API_URL/chat/messages" -Headers $headers
    Write-Host "   ✅ Total de mensagens: $($historyResponse.Count)" -ForegroundColor Green
    Write-Host "   📝 Últimas 3 mensagens:" -ForegroundColor Gray
    $historyResponse | Select-Object -Last 3 | ForEach-Object {
        $senderIcon = if ($_.sender -eq 'user') { "👤" } else { "👨‍⚕️" }
        Write-Host "      $senderIcon $($_.sender): $($_.message.Substring(0, [Math]::Min(50, $_.message.Length)))..." -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Erro ao buscar histórico: $_" -ForegroundColor Red
}

# 5. Testar limite (enviar mais 7 para atingir 10)
Write-Host "`n5️⃣  Testando limite de 10 perguntas..." -ForegroundColor Yellow
Write-Host "   📤 Enviando mais 7 perguntas para atingir limite..." -ForegroundColor Gray

for ($i = 4; $i -le 10; $i++) {
    $msgBody = @{ message = "Pergunta de teste número $i" } | ConvertTo-Json
    try {
        $sendResponse = Invoke-RestMethod -Uri "$API_URL/chat/send" -Method Post -Headers $headers -ContentType 'application/json' -Body $msgBody
        Write-Host "   ✅ Pergunta $i/10 enviada (restam: $($sendResponse.questionsRemaining))" -ForegroundColor Green
        Start-Sleep -Milliseconds 300
    } catch {
        Write-Host "   ❌ Erro na pergunta $i`: $_" -ForegroundColor Red
    }
}

# 6. Tentar enviar após limite
Write-Host "`n6️⃣  Tentando enviar após limite (deve falhar)..." -ForegroundColor Yellow
$msgBody = @{ message = "Esta mensagem deve ser rejeitada" } | ConvertTo-Json
try {
    $sendResponse = Invoke-RestMethod -Uri "$API_URL/chat/send" -Method Post -Headers $headers -ContentType 'application/json' -Body $msgBody
    Write-Host "   ❌ ERRO: Mensagem foi aceita mesmo após limite!" -ForegroundColor Red
} catch {
    if ($_.Exception.Message -like "*403*") {
        Write-Host "   ✅ Limite aplicado corretamente (403 Forbidden)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Erro inesperado: $_" -ForegroundColor Yellow
    }
}

# 7. Verificar contador final
Write-Host "`n7️⃣  Verificando contador final..." -ForegroundColor Yellow
try {
    $countResponse = Invoke-RestMethod -Uri "$API_URL/chat/count" -Headers $headers
    Write-Host "   ✅ Perguntas feitas: $($countResponse.count)/10" -ForegroundColor Green
    if ($countResponse.count -eq 10) {
        Write-Host "   🎯 Limite atingido corretamente!" -ForegroundColor Green
    }
} catch {
    Write-Host "   ❌ Erro ao buscar contador: $_" -ForegroundColor Red
}

# 8. Limpar histórico (opcional)
Write-Host "`n8️⃣  Limpando histórico de teste..." -ForegroundColor Yellow
$response = Read-Host "   Deseja limpar o histórico? (s/N)"
if ($response -eq 's' -or $response -eq 'S') {
    try {
        Invoke-RestMethod -Uri "$API_URL/chat/clear" -Method Delete -Headers $headers | Out-Null
        Write-Host "   ✅ Histórico limpo" -ForegroundColor Green
    } catch {
        Write-Host "   ❌ Erro ao limpar: $_" -ForegroundColor Red
    }
} else {
    Write-Host "   ⏭️  Histórico mantido" -ForegroundColor Gray
}

Write-Host "`n✅ Teste concluído!" -ForegroundColor Cyan
Write-Host "📧 Email de teste: $email" -ForegroundColor Gray
Write-Host "🔑 Senha de teste: $password" -ForegroundColor Gray
Write-Host "`nVocê pode fazer login no frontend com estas credenciais para testar a UI.`n" -ForegroundColor Yellow
