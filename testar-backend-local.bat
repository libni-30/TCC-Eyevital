@echo off
chcp 65001 > nul
echo.
echo ========================================
echo 🧪 TESTANDO BACKEND LOCAL
echo ========================================
echo.

cd backend

echo 📦 Verificando se node_modules existe...
if not exist "node_modules" (
    echo ⚠️  node_modules não encontrado. Instalando dependências...
    call npm install
)

echo.
echo 🔄 Iniciando servidor backend...
echo 📍 URL: http://localhost:3001
echo.
echo ⚠️  Pressione Ctrl+C para parar o servidor
echo.

node index.js

pause
