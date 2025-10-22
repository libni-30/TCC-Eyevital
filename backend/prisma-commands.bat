@echo off
REM =============================================================================
REM   CHEAT SHEET - COMANDOS PRISMA
REM =============================================================================

echo.
echo ===============================================================================
echo                        PRISMA ORM - COMANDOS RAPIDOS
echo ===============================================================================
echo.

:menu
echo.
echo [1] Instalar dependencias
echo [2] Gerar Prisma Client
echo [3] Sincronizar schema com banco (push)
echo [4] Criar nova migracao (dev)
echo [5] Aplicar migracoes pendentes (prod)
echo [6] Ver status das migracoes
echo [7] Abrir Prisma Studio (interface visual)
echo [8] Criar usuario de teste (seed)
echo [9] Validar schema.prisma
echo [10] Iniciar servidor (dev)
echo [11] Iniciar servidor (prod)
echo [0] Sair
echo.

set /p choice="Escolha uma opcao: "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto generate
if "%choice%"=="3" goto push
if "%choice%"=="4" goto migrate_dev
if "%choice%"=="5" goto migrate_prod
if "%choice%"=="6" goto status
if "%choice%"=="7" goto studio
if "%choice%"=="8" goto seed
if "%choice%"=="9" goto validate
if "%choice%"=="10" goto dev
if "%choice%"=="11" goto start
if "%choice%"=="0" goto end
goto menu

:install
echo.
echo [EXECUTANDO] npm install
call npm install
echo.
echo [OK] Dependencias instaladas!
pause
goto menu

:generate
echo.
echo [EXECUTANDO] npm run db:generate
call npm run db:generate
echo.
echo [OK] Prisma Client gerado!
pause
goto menu

:push
echo.
echo [EXECUTANDO] npm run db:push
call npm run db:push
echo.
echo [OK] Schema sincronizado!
pause
goto menu

:migrate_dev
echo.
set /p name="Nome da migracao: "
echo [EXECUTANDO] npx prisma migrate dev --name %name%
call npx prisma migrate dev --name %name%
echo.
echo [OK] Migracao criada!
pause
goto menu

:migrate_prod
echo.
echo [EXECUTANDO] npm run db:migrate
call npm run db:migrate
echo.
echo [OK] Migracoes aplicadas!
pause
goto menu

:status
echo.
echo [EXECUTANDO] npx prisma migrate status
call npx prisma migrate status
echo.
pause
goto menu

:studio
echo.
echo [EXECUTANDO] npm run db:studio
echo.
echo Abrindo Prisma Studio no navegador...
call npm run db:studio
pause
goto menu

:seed
echo.
set /p email="Email (deixe vazio para auto): "
set /p password="Senha (deixe vazio para auto): "
set /p username="Username (deixe vazio para auto): "
echo [EXECUTANDO] node scripts/seed-user.js %email% %password% %username%
call node scripts/seed-user.js %email% %password% %username%
echo.
pause
goto menu

:validate
echo.
echo [EXECUTANDO] npx prisma validate
call npx prisma validate
echo.
echo [OK] Schema valido!
pause
goto menu

:dev
echo.
echo [EXECUTANDO] npm run dev
call npm run dev
pause
goto menu

:start
echo.
echo [EXECUTANDO] npm start
call npm start
pause
goto menu

:end
echo.
echo Ate logo!
echo.
exit /b 0
