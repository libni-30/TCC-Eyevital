# Script de Reorganização do Projeto TCC-EyeVital
# Separa Frontend e Backend para Deploy

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Reorganizando Projeto para Deploy" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Parar servidores
Write-Host "[1/10] Parando servidores..." -ForegroundColor Yellow
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Criar backup
Write-Host "[2/10] Criando backup..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFolder = "backup_$timestamp"
New-Item -ItemType Directory -Path $backupFolder -ErrorAction SilentlyContinue | Out-Null

# Criar nova estrutura
Write-Host "[3/10] Criando nova estrutura..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "frontend" -ErrorAction SilentlyContinue | Out-Null
New-Item -ItemType Directory -Path "backend" -ErrorAction SilentlyContinue | Out-Null

# Mover arquivos do frontend
Write-Host "[4/10] Movendo arquivos do frontend..." -ForegroundColor Yellow
$frontendItems = @(
    "src",
    "public",
    "index.html",
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "vite.config.ts",
    "tailwind.config.js",
    "postcss.config.js",
    "postcss.config.cjs",
    "eslint.config.js",
    ".env",
    ".env.example"
)

foreach ($item in $frontendItems) {
    if (Test-Path $item) {
        Move-Item -Path $item -Destination "frontend\" -Force -ErrorAction SilentlyContinue
        Write-Host "  ✓ $item" -ForegroundColor Green
    }
}

# Mover node_modules do frontend
if (Test-Path "node_modules") {
    Write-Host "[5/10] Movendo node_modules do frontend..." -ForegroundColor Yellow
    Move-Item -Path "node_modules" -Destination "frontend\" -Force -ErrorAction SilentlyContinue
}

# Mover arquivos do backend
Write-Host "[6/10] Movendo arquivos do backend..." -ForegroundColor Yellow
if (Test-Path "server") {
    Get-ChildItem -Path "server" | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "backend\" -Force -ErrorAction SilentlyContinue
        Write-Host "  ✓ $($_.Name)" -ForegroundColor Green
    }
    Remove-Item "server" -Force -ErrorAction SilentlyContinue
}

# Criar README para cada pasta
Write-Host "[7/10] Criando READMEs..." -ForegroundColor Yellow

# README do Frontend
@"
# Frontend - TCC EyeVital

## Stack
- React 19
- Vite 7
- TypeScript
- TailwindCSS 4
- React Router 6

## Instalação
``````bash
npm install
``````

## Desenvolvimento
``````bash
npm run dev
``````
Acesse: http://localhost:5173

## Build para Produção
``````bash
npm run build
``````

## Variáveis de Ambiente
Copie \`.env.example\` para \`.env\` e configure:
- \`VITE_API_BASE_URL\` - URL da API backend

## Deploy
Pode ser deployado em:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
"@ | Out-File -FilePath "frontend\README.md" -Encoding UTF8

# README do Backend
@"
# Backend - TCC EyeVital

## Stack
- Node.js 18+
- Express 4
- Prisma ORM 5.22
- PostgreSQL (Neon)
- JWT Authentication

## Instalação
``````bash
npm install
``````

## Desenvolvimento
``````bash
npm start
``````
Servidor: http://localhost:3001

## Banco de Dados
``````bash
# Sincronizar schema
npm run db:push

# Abrir Prisma Studio
npm run db:studio
``````

## Variáveis de Ambiente
Copie \`.env.example\` para \`.env\` e configure:
- \`DATABASE_URL\` - String de conexão PostgreSQL
- \`JWT_SECRET\` - Chave secreta para JWT
- \`PORT\` - Porta do servidor (default: 3001)

## Deploy
Pode ser deployado em:
- Railway
- Render
- Fly.io
- Heroku
"@ | Out-File -FilePath "backend\README.md" -Encoding UTF8

# Criar novos scripts
Write-Host "[8/10] Criando scripts de inicialização..." -ForegroundColor Yellow

# start-backend.bat
@"
@echo off
cd backend
node index.js
"@ | Out-File -FilePath "start-backend.bat" -Encoding ASCII

# start-frontend.bat
@"
@echo off
cd frontend
npm run dev
"@ | Out-File -FilePath "start-frontend.bat" -Encoding ASCII

# Atualizar start.bat principal
@"
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
"@ | Out-File -FilePath "start.bat" -Encoding ASCII -Force

# Atualizar start.ps1
@"
# TCC EyeVital - Script de Inicialização

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   TCC EyeVital - Iniciando Projeto" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Verificar dependências
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "[ERRO] Dependências do frontend não encontradas!" -ForegroundColor Red
    Write-Host "Execute: cd frontend && npm install" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

if (-not (Test-Path "backend\node_modules")) {
    Write-Host "[ERRO] Dependências do backend não encontradas!" -ForegroundColor Red
    Write-Host "Execute: cd backend && npm install" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Iniciar Backend
Write-Host "[1/3] Iniciando Backend (porta 3001)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '`$PSScriptRoot\backend'; node index.js" -WindowStyle Normal

# Aguardar backend inicializar
Write-Host "[2/3] Aguardando backend inicializar..." -ForegroundColor Green
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "[3/3] Iniciando Frontend (porta 5173)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-ExecutionPolicy", "Bypass", "-NoExit", "-Command", "cd '`$PSScriptRoot\frontend'; npm run dev" -WindowStyle Normal

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Projeto Iniciado com Sucesso!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "Backend:  " -NoNewline; Write-Host "http://localhost:3001" -ForegroundColor Yellow
Write-Host "Frontend: " -NoNewline; Write-Host "http://localhost:5173" -ForegroundColor Yellow
Write-Host "`nDuas janelas foram abertas. Feche-as para parar os servidores.`n"

Read-Host "Pressione Enter para fechar esta janela"
"@ | Out-File -FilePath "start.ps1" -Encoding UTF8 -Force

Write-Host "[9/10] Criando .gitignore atualizado..." -ForegroundColor Yellow
@"
# Dependências
node_modules
frontend/node_modules
backend/node_modules

# Build
dist
frontend/dist
backend/dist
dist-ssr
*.local

# Ambiente
.env
.env.local
frontend/.env
backend/.env
*.env.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Editor
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Backup
backup_*

# Sistema
Thumbs.db
.DS_Store
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8 -Force

Write-Host "[10/10] Criando guia de deploy..." -ForegroundColor Yellow
@"
# 🚀 Guia de Deploy - TCC EyeVital

## Estrutura Reorganizada

\`\`\`
TCC-Eyevital-6/
├── frontend/          # React + Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
├── backend/           # Express + Prisma
│   ├── prisma/
│   ├── index.js
│   ├── package.json
│   └── .env
├── start.bat          # Iniciar tudo
└── README.md
\`\`\`

## 📦 Instalação Inicial

\`\`\`bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
\`\`\`

## ▶️ Iniciar Localmente

### Opção 1: Script automático
\`\`\`bash
# Clique duas vezes em start.bat
# OU execute:
start.bat
\`\`\`

### Opção 2: Manual
\`\`\`bash
# Terminal 1 - Backend
cd backend
node index.js

# Terminal 2 - Frontend
cd frontend
npm run dev
\`\`\`

## 🌐 Deploy

### Frontend (Vercel)

1. Instale a CLI do Vercel:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
cd frontend
vercel
\`\`\`

3. Configure variáveis de ambiente na dashboard:
   - \`VITE_API_BASE_URL\` → URL da API backend

### Backend (Railway)

1. Crie conta em railway.app

2. Novo Projeto → Deploy from GitHub

3. Configure:
   - Root Directory: \`backend\`
   - Build Command: \`npm install && npm run db:push\`
   - Start Command: \`node index.js\`

4. Variáveis de ambiente:
   - \`DATABASE_URL\` → String do PostgreSQL
   - \`JWT_SECRET\` → Chave secreta
   - \`PORT\` → \`${{PORT}}\` (Railway fornece)

### Alternativas

**Frontend:**
- Netlify
- GitHub Pages
- Cloudflare Pages

**Backend:**
- Render
- Fly.io
- Heroku
- DigitalOcean App Platform

## 🔐 Checklist de Segurança

- [ ] Alterar \`JWT_SECRET\` em produção
- [ ] Configurar CORS para domínio específico
- [ ] Usar HTTPS em produção
- [ ] Não commitar arquivos \`.env\`
- [ ] Revisar permissões do banco de dados

## 📝 Notas

- O frontend pode ser deployado em CDN (Vercel, Netlify)
- O backend precisa de servidor Node.js
- Banco de dados PostgreSQL (Neon é grátis)
- SSL/TLS é obrigatório em produção
"@ | Out-File -FilePath "DEPLOY.md" -Encoding UTF8

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  ✅ REORGANIZAÇÃO CONCLUÍDA!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "📁 Nova estrutura:" -ForegroundColor Cyan
Write-Host "   - frontend/  (React + Vite)" -ForegroundColor White
Write-Host "   - backend/   (Express + Prisma)" -ForegroundColor White
Write-Host ""

Write-Host "⚙️  Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. cd frontend; npm install" -ForegroundColor Yellow
Write-Host "   2. cd backend; npm install" -ForegroundColor Yellow
Write-Host "   3. Execute: .\start.bat" -ForegroundColor Yellow
Write-Host ""

Write-Host "📚 Documentação:" -ForegroundColor Cyan
Write-Host "   - DEPLOY.md (novo)" -ForegroundColor White
Write-Host "   - frontend/README.md" -ForegroundColor White
Write-Host "   - backend/README.md" -ForegroundColor White
Write-Host ""

Read-Host "Pressione Enter para continuar"
