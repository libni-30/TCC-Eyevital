@echo off
REM Script de Migração para Prisma ORM (Windows CMD)
echo.
echo ========================================
echo   Migracao para Prisma ORM
echo ========================================
echo.

REM Verificar se estamos no diretório correto
if not exist "package.json" (
    echo [ERRO] Execute este script dentro da pasta 'server'
    exit /b 1
)

REM Passo 1: Backup
echo [1/5] Fazendo backup do index.js antigo...
if exist "index.js" (
    copy /Y "index.js" "index.old.js" >nul
    echo [OK] Backup criado: index.old.js
)

REM Passo 2: Substituir arquivo
echo.
echo [2/5] Substituindo index.js pelo novo com Prisma...
if exist "index.new.js" (
    copy /Y "index.new.js" "index.js" >nul
    echo [OK] index.js atualizado!
) else (
    echo [ERRO] Arquivo index.new.js nao encontrado
    exit /b 1
)

REM Passo 3: Instalar dependências
echo.
echo [3/5] Instalando dependencias do Prisma...
call npm install @prisma/client
call npm install -D prisma

if %ERRORLEVEL% neq 0 (
    echo [ERRO] Falha ao instalar dependencias
    exit /b 1
)
echo [OK] Dependencias instaladas!

REM Passo 4: Gerar cliente
echo.
echo [4/5] Gerando Prisma Client...
call npm run db:generate

if %ERRORLEVEL% neq 0 (
    echo [ERRO] Falha ao gerar Prisma Client
    exit /b 1
)
echo [OK] Prisma Client gerado!

REM Passo 5: Instruções finais
echo.
echo [5/5] Migracao concluida!
echo.
echo ========================================
echo   Proximos Passos
echo ========================================
echo.
echo 1. Sincronize o schema:
echo    npm run db:push
echo.
echo 2. Inicie o servidor:
echo    npm run dev
echo.
echo 3. Leia o guia completo:
echo    PRISMA-DEPLOY-GUIDE.md
echo.
echo [IMPORTANTE] O servidor agora NAO recria tabelas automaticamente!
echo              Isso protege seus dados em producao.
echo.
pause
