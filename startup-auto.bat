@echo off
REM Script para iniciar automaticamente ao ligar o PC
REM Coloque este arquivo na pasta: shell:startup

REM Aguardar 10 segundos para Windows carregar completamente
timeout /t 10 /nobreak > nul

REM Navegar para a pasta do projeto
cd /d "c:\Users\libni\Documents\tcc-eyevital\TCC-Eyevital-6"

REM Iniciar backend em janela minimizada
start /min "EyeVital Backend" cmd /c "cd server && node index.js"

REM Aguardar 3 segundos
timeout /t 3 /nobreak > nul

REM Iniciar frontend em janela minimizada
start /min "EyeVital Frontend" cmd /c "npm run dev"

REM Aguardar 5 segundos para servidores iniciarem
timeout /t 5 /nobreak > nul

REM Abrir navegador automaticamente
start http://localhost:5173

exit
