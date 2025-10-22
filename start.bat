@echo off
echo.
echo ========================================
echo    TCC EyeVital - Iniciando Projeto
echo ========================================
echo.

REM Verificar dependencias
if not exist "frontend\node_modules\" (
    echo [ERRO] Dependencias do frontend nao encontradas!
    echo Execute: cd frontend && npm install
    pause
    exit /b 1
)

if not exist "backend\node_modules\" (
    echo [ERRO] Dependencias do backend nao encontradas!
    echo Execute: cd backend && npm install
    pause
    exit /b 1
)

echo [1/3] Iniciando Backend (porta 3001)...
start "EyeVital Backend" cmd /k "cd /d %~dp0backend && node index.js"

echo [2/3] Aguardando backend inicializar...
timeout /t 3 /nobreak > nul

echo [3/3] Iniciando Frontend (porta 5173)...
start "EyeVital Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo    Projeto Iniciado!
echo ========================================
echo.
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Pressione qualquer tecla para fechar esta janela
echo (Os servidores continuarao rodando)
echo.
pause > nul
