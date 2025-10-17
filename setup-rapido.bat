@echo off
REM Script de inicialização rápida do sistema de chat
REM Uso: Duplo clique neste arquivo

echo ========================================
echo      TCC Eyevital - Setup Rapido
echo ========================================
echo.

echo [1/5] Verificando Node.js...
node --version
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Instale em: https://nodejs.org
    pause
    exit /b 1
)

echo.
echo [2/5] Instalando dependencias do backend...
cd server
call npm install
if errorlevel 1 (
    echo ERRO: Falha ao instalar dependencias do backend
    pause
    exit /b 1
)

echo.
echo [3/5] Instalando dependencias do frontend...
cd ..
call npm install
if errorlevel 1 (
    echo ERRO: Falha ao instalar dependencias do frontend
    pause
    exit /b 1
)

echo.
echo [4/5] Verificando arquivo .env...
if not exist "server\.env" (
    echo AVISO: Arquivo server\.env nao encontrado!
    echo Crie o arquivo com as credenciais do Neon Database.
    echo Exemplo em: server\.env.example
    pause
)

if not exist ".env" (
    echo AVISO: Arquivo .env (raiz) nao encontrado!
    echo Crie o arquivo com VITE_API_BASE_URL=http://127.0.0.1:3000
    pause
)

echo.
echo [5/5] Inicializando banco de dados...
cd server
node scripts\init-db.js
if errorlevel 1 (
    echo ERRO: Falha ao inicializar banco
    echo Verifique as credenciais em server\.env
    pause
    exit /b 1
)

echo.
echo ========================================
echo      Setup concluido com sucesso!
echo ========================================
echo.
echo Para iniciar o projeto:
echo.
echo Terminal 1 (Backend):
echo   cd server
echo   node index.js
echo.
echo Terminal 2 (Frontend):
echo   npm run dev
echo.
echo Depois acesse: http://localhost:5173/paginainicial.html
echo.
pause
