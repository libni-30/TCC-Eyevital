@echo off
echo ========================================
echo   Reorganizando Projeto para Deploy
echo ========================================
echo.

REM Parar servidores antes de reorganizar
echo [1/8] Parando servidores...
taskkill /F /IM node.exe 2>nul

REM Criar nova estrutura
echo [2/8] Criando nova estrutura de pastas...
if not exist "frontend" mkdir frontend
if not exist "backend" mkdir backend

REM Mover arquivos do frontend
echo [3/8] Movendo arquivos do frontend...
move /Y "src" "frontend\" 2>nul
move /Y "public" "frontend\" 2>nul
move /Y "index.html" "frontend\" 2>nul
move /Y "package.json" "frontend\" 2>nul
move /Y "package-lock.json" "frontend\" 2>nul
move /Y "tsconfig.json" "frontend\" 2>nul
move /Y "tsconfig.app.json" "frontend\" 2>nul
move /Y "tsconfig.node.json" "frontend\" 2>nul
move /Y "vite.config.ts" "frontend\" 2>nul
move /Y "tailwind.config.js" "frontend\" 2>nul
move /Y "postcss.config.js" "frontend\" 2>nul
move /Y "postcss.config.cjs" "frontend\" 2>nul
move /Y "eslint.config.js" "frontend\" 2>nul
move /Y ".env" "frontend\" 2>nul
move /Y ".env.example" "frontend\" 2>nul

REM Mover arquivos do backend
echo [4/8] Movendo arquivos do backend...
move /Y "server\*" "backend\" 2>nul
rmdir "server" 2>nul

REM Mover arquivos de documentacao para raiz
echo [5/8] Organizando documentacao...
REM (Mantem na raiz: README.md, GUIA-INICIALIZACAO.md, etc)

REM Criar novos scripts de inicializacao
echo [6/8] Criando novos scripts de inicializacao...

echo @echo off > start-backend.bat
echo cd backend >> start-backend.bat
echo node index.js >> start-backend.bat

echo @echo off > start-frontend.bat
echo cd frontend >> start-frontend.bat
echo npm run dev >> start-frontend.bat

REM Atualizar script principal
echo [7/8] Atualizando script start.bat...
(
echo @echo off
echo echo.
echo echo ========================================
echo echo    TCC EyeVital - Iniciando Projeto
echo echo ========================================
echo echo.
echo.
echo if not exist "frontend\node_modules\" ^(
echo     echo [ERRO] Dependencias do frontend nao encontradas!
echo     echo Execute: cd frontend ^&^& npm install
echo     pause
echo     exit /b 1
echo ^)
echo.
echo if not exist "backend\node_modules\" ^(
echo     echo [ERRO] Dependencias do backend nao encontradas!
echo     echo Execute: cd backend ^&^& npm install
echo     pause
echo     exit /b 1
echo ^)
echo.
echo echo [1/3] Iniciando Backend ^(porta 3001^)...
echo start "EyeVital Backend" cmd /k "cd /d %%~dp0backend ^&^& node index.js"
echo.
echo echo [2/3] Aguardando backend inicializar...
echo timeout /t 3 /nobreak ^> nul
echo.
echo echo [3/3] Iniciando Frontend ^(porta 5173^)...
echo start "EyeVital Frontend" cmd /k "cd /d %%~dp0frontend ^&^& npm run dev"
echo.
echo echo.
echo echo ========================================
echo echo    Projeto Iniciado!
echo echo ========================================
echo echo.
echo echo Backend:  http://localhost:3001
echo echo Frontend: http://localhost:5173
echo echo.
echo pause
) > start-new.bat

echo [8/8] Reorganizacao concluida!
echo.
echo ========================================
echo   PROXIMOS PASSOS:
echo ========================================
echo.
echo 1. Verifique a nova estrutura:
echo    - frontend/  (React + Vite)
echo    - backend/   (Express + Prisma)
echo.
echo 2. Reinstale dependencias:
echo    cd frontend ^&^& npm install
echo    cd backend ^&^& npm install
echo.
echo 3. Use o novo start-new.bat para iniciar
echo.
pause
