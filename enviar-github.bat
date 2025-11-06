@echo off
echo ============================================
echo  ENVIANDO ALTERACOES PARA O GITHUB
echo ============================================
echo.

echo Arquivos que serao enviados:
echo   - frontend/.env.example (atualizado)
echo   - frontend/src/lib/env.ts (corrigido)
echo   - GUIA-COMANDOS.md (novo)
echo   - RELATORIO-ANALISE-SISTEMA.md (novo)
echo   - RESUMO-ANALISE.md (novo)
echo   - STATUS-RAPIDO.md (novo)
echo   - test-backend.ps1 (novo)
echo   - testar-sistema.bat (novo)
echo.

echo [1/4] Adicionando arquivos...
git add frontend/.env.example
git add frontend/src/lib/env.ts
git add GUIA-COMANDOS.md
git add RELATORIO-ANALISE-SISTEMA.md
git add RESUMO-ANALISE.md
git add STATUS-RAPIDO.md
git add test-backend.ps1
git add testar-sistema.bat

echo [2/4] Criando commit...
git commit -m "fix: corrige variavel de ambiente e adiciona documentacao completa

- Corrige env.ts para aceitar VITE_API_BASE_URL e URL_BASE_API_VITE
- Adiciona compatibilidade com Vercel
- Adiciona documentacao completa do sistema
- Adiciona scripts de teste e inicializacao automatica"

echo.
echo [3/4] Enviando para GitHub...
git push origin main

echo.
echo [4/4] Concluido!
echo.
echo ============================================
echo  ALTERACOES ENVIADAS COM SUCESSO!
echo ============================================
echo.
pause
