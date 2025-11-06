@echo off
echo ============================================
echo  TESTE COMPLETO DO SISTEMA TCC-EYEVITAL
echo ============================================
echo.

echo [1/4] Verificando dependencias...
echo.

if not exist "backend\node_modules" (
    echo Backend: Instalando dependencias...
    cd backend
    call npm install
    cd ..
) else (
    echo Backend: Dependencias OK
)

if not exist "frontend\node_modules" (
    echo Frontend: Instalando dependencias...
    cd frontend
    call npm install
    cd ..
) else (
    echo Frontend: Dependencias OK
)

echo.
echo [2/4] Iniciando backend...
echo.

start "TCC-Eyevital Backend" cmd /k "cd backend && node index.js"

echo Aguardando backend inicializar...
timeout /t 5 /nobreak > nul

echo.
echo [3/4] Testando backend...
echo.

powershell -Command "try { $r = Invoke-RestMethod -Uri http://localhost:3001/health; if($r.ok){Write-Host 'Backend: OK' -ForegroundColor Green}else{Write-Host 'Backend: ERRO' -ForegroundColor Red} } catch { Write-Host 'Backend: NAO CONECTADO' -ForegroundColor Red }"

echo.
echo [4/4] Iniciando frontend...
echo.

start "TCC-Eyevital Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ============================================
echo  SISTEMA INICIADO!
echo ============================================
echo.
echo Backend rodando em:  http://localhost:3001
echo Frontend rodando em: http://localhost:5173
echo.
echo Aguarde alguns segundos e acesse:
echo http://localhost:5173
echo.
echo Pressione qualquer tecla para encerrar tudo...
pause > nul

echo.
echo Encerrando processos...
taskkill /FI "WINDOWTITLE eq TCC-Eyevital Backend" /F > nul 2>&1
taskkill /FI "WINDOWTITLE eq TCC-Eyevital Frontend" /F > nul 2>&1

echo Concluido!
