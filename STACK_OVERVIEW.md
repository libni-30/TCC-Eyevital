# Visão Geral da Stack e Decisões do Projeto

> Documento gerado automaticamente – descreve tecnologias, padrões e decisões já aplicadas até o estado atual do repositório.

## 1. Stack Principal
- **Build/Dev**: Vite (SPA, HMR rápido)
- **UI Library**: React 19 (hooks, StrictMode)
- **Linguagem**: TypeScript (tipagem em componentes e estado)
- **Estilos utilitários**: Tailwind CSS v4 (import único `@import "tailwindcss"`)
- **HTML de entrada**: `index.html` (single entrypoint)

## 2. Estrutura de Pastas Relevante
```
index.html
src/
  main.tsx        # Bootstrap + ErrorBoundary
  App.tsx         # Raiz lógico -> PaginaInicial
  components/
    PaginaInicial.tsx  # Landing (ainda parcialmente legado / DOM direto)
    AuthPage.tsx       # Tela unificada Login/Registro
IMAGENS/          # Assets (ainda fora de public/)
assets/css/       # CSS legado
```

## 3. Componentes Principais
### PaginaInicial
- Função: Landing page + gateway para autenticação.
- Lógica: Observers (IntersectionObserver) + manipulação de DOM para menu ativo (legacy style).
- Query param `?auth=` para abrir diretamente Login ou Registro.

### AuthPage
- Unifica Login e Registro (alternância via estado `isLoginView`).
- Estados controlados: `formData`, `showPassword`, `showConfirm`, `touched`, `confirmBlurred`, `submitting`.
- Validações derivadas (senha mínima, mismatch progressivo).
- Acessibilidade: `aria-invalid`, `aria-describedby`, `role="tablist"`, `aria-selected`, `aria-pressed`.

## 4. Lógica de Validação do Formulário
- `passwordValid`: comprimento >= 6.
- `bothFilled`: senha e confirmação preenchidas.
- `progressedEnough`: usuário digitou confirmação com comprimento >= senha (evita erro prematuro).
- `showMismatch`: só exibe quando: modo registro + senha válida + campo confirm tocado + ambos preenchidos + (progressedEnough ou blur final) + valores diferentes.
- Botão de submit habilitado somente se regras atendidas.

## 5. Acessibilidade (A11y)
- Estados de erro expostos via `aria-*`.
- Alternância tab-like para Login/Registrar.
- Ícones de mostrar/ocultar senha com `aria-label` e `aria-pressed`.
- Estrutura semântica básica mantida.

## 6. Tratamento de Erros
- `ErrorBoundary` customizado em `main.tsx` captura erros de render/hook.
- Exibição amigável + log no console `[ErrorBoundary]`.

## 7. Diagnóstico / Observabilidade
- Logs estratégicos: `[main]`, `[App]`, `[PaginaInicial]`, `[AuthPage]` (montagem e modo).
- Borda de debug temporária no container de `AuthPage`.
- Heading `DEBUG AUTH` provisório.

## 8. Decisões Arquiteturais
- Migração para SPA única (remoção de múltiplos HTMLs como entrypoints).
- Manter arquivos legados marcados antes da remoção física para segurança.
- Uso de condicionais simples em vez de roteador (Router previsto como melhoria futura).
- Derivação de estados (evitar duplicar flags de validação).

## 9. Itens Legados / Técnicos a Refatorar
| Área | Situação | Ação futura sugerida |
|------|----------|----------------------|
| `IMAGENS/` | Fora de `public/` | Mover para `public/IMAGENS` para servir estaticamente com cache control |
| Menu / Scroll | DOM imperativo | Migrar para React + refs / observer hook |
| CSS legado | Mistura de utilitários e regras | Unificar gradualmente em utilitários Tailwind ou módulos CSS |
| `script.js` antigo | Não usado | Remover após confirmação final |
| Múltiplas páginas HTML | Marcadas como legado | Excluir depois de validar SPA em produção |
| Validação no Auth | Em componente | Extrair para `useAuthForm` hook para testes |

## 10. Qualidade e Configuração
- TSConfigs separados (`app`, `node`) para otimizar build.
- ESLint configurado (arquivo base presente; regras não detalhadas ainda neste doc).
- Tailwind v4 import global – sem uso de plugin adicional até o momento.

## 11. Próximas Melhorias (Backlog Técnico)
1. Forçar render isolada de `AuthPage` para concluir depuração visual atual.
2. Migrar assets para `public/`.
3. Implementar React Router (ex: `/auth?mode=login`).
4. Criar hook `useAuthForm` + testes unitários (Jest / Vitest).
5. Refinar acessibilidade: foco ao trocar modo, mensagens live region.
6. Remover CSS e HTML legados após confirmação.
7. Adicionar feedback pós-submit (spinner real + mensagens).

## 12. Segurança & UX Futuras
- Sanitização de entrada (futuro backend / API).
- Política de senha forte configurável.
- Persistência segura (evitar armazenar senha plana; placeholder atual apenas demonstra fluxo).

## 13. Resumo Rápido
Este projeto já está estruturado como uma SPA React + TypeScript com Tailwind v4, validação de formulário acessível e controle centralizado de estado para autenticação. O ambiente tem ferramentas de diagnóstico e está preparado para evoluir com roteamento, testes e limpeza de legado.

---
*Gerado em: (data de geração automática).* 
