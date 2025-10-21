@echo off
echo.
echo ========================================
echo    TCC EyeVital - Iniciando Projeto
echo ========================================
echo.

REM Verificar se as dependencias estao instaladas
if not exist "node_modules\" (
    echo [ERRO] Dependencias do frontend nao encontradas!
    echo Execute: npm install
    pause
    exit /b 1
)

if not exist "server\node_modules\" (
    echo [ERRO] Dependencias do backend nao encontradas!
    echo Execute: cd server ^&^& npm install
    pause
    exit /b 1
)

REM Verificar se os arquivos .env existem
if not exist ".env" (
    echo [AVISO] Arquivo .env nao encontrado na raiz!
    echo Copie .env.example para .env e configure.
    pause
)

if not exist "server\.env" (
    echo [ERRO] Arquivo server\.env nao encontrado!
    echo Copie server\.env.example para server\.env e configure DATABASE_URL.
    pause
    exit /b 1
)

echo [1/3] Iniciando Backend (porta 3001)...
start "EyeVital Backend" cmd /k "cd /d %~dp0server && node index.js"

echo [2/3] Aguardando backend inicializar...
timeout /t 3 /nobreak > nul

echo [3/3] Iniciando Frontend (porta 5173)...
start "EyeVital Frontend" cmd /k "cd /d %~dp0 && npm run dev"

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
