# EyeVital — SMTP (provedor transacional)

Este projeto já envia e‑mails via SMTP (Nodemailer). Basta configurar um provedor transacional e preencher o `.env` do backend.

## Opção recomendada (produção)

SendGrid (exemplo)

1) Criar API Key (Full Access ou Mail Send)
2) Verificar remetente (Single Sender) ou domínio (melhor: SPF/DKIM)
3) Usar SMTP com as credenciais abaixo

.env (backend/.env)

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SMTP_FROM=EyeVital <no-reply@eyevital.com>
FRONTEND_BASE_URL=http://localhost:5173

Notas
- `SMTP_USER=apikey` é fixo no SendGrid; `SMTP_PASS` é sua API key.
- Em produção, troque `FRONTEND_BASE_URL` pelo domínio real (ex: https://app.eyevital.com).
- Autentique o domínio no SendGrid (SPF/DKIM) para melhor entregabilidade.

## Outras opções

Mailgun
- SMTP_HOST=smtp.mailgun.org
- SMTP_PORT=587
- SMTP_USER=postmaster@SEU-DOMINIO
- SMTP_PASS=<senha SMTP>
- SMTP_FROM=EyeVital <no-reply@SEU-DOMINIO>

Amazon SES
- SMTP_HOST=email-smtp.<regiao>.amazonaws.com
- SMTP_PORT=587
- SMTP_USER=<SMTP username>
- SMTP_PASS=<SMTP password>
- SMTP_FROM=EyeVital <no-reply@SEU-DOMINIO>

Postmark
- SMTP_HOST=smtp.postmarkapp.com
- SMTP_PORT=587
- SMTP_USER=<server token>
- SMTP_PASS=<server token>
- SMTP_FROM=EyeVital <no-reply@SEU-DOMINIO>

## Teste rápido

1) Coloque as variáveis no `backend/.env` (não commitar). 
2) Reinicie o backend (porta 3001).
3) No app, abra “Esqueceu sua senha?”, informe um e‑mail cadastrado e envie.
   - Se o SMTP não estiver configurado, o backend loga o link de reset no console.
   - Com SMTP configurado, o provedor entregará o e‑mail com o link.
4) Clique no link recebido (/#/reset-password?token=...) e defina a nova senha.

## Dúvidas comuns

- Caiu no spam: autentique o domínio (SPF/DKIM) e use um remetente do seu domínio.
- Sandbox/limites: alguns provedores exigem liberar destinatários/domínios ou sair do modo sandbox.
- Porta 465: se usar 465, o backend detecta e ativa `secure=true`. Caso contrário, 587 (STARTTLS) é o padrão.

## Caminho mais rápido (conta dedicada Gmail)

Para entregar no prazo, você pode criar uma conta Gmail dedicada e usar Senha de app.

Passos
- Crie/usar um Gmail só para o projeto (ex.: eyevital.app@gmail.com).
- Ative 2FA nessa conta (Google Account > Security > 2‑Step Verification).
- Em Security > App passwords, gere uma senha para "Mail" em "Windows Computer" (ou similar). Guarde a senha de 16 caracteres.
- Preencha backend/.env:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=eyevital.app@gmail.com
SMTP_PASS=<SENHA_DE_APP_16_CHARS>
SMTP_FROM=EyeVital <eyevital.app@gmail.com>
FRONTEND_BASE_URL=http://localhost:5173
```

- Reinicie o backend e use "Esqueceu sua senha?" ou o endpoint POST /email/test (enviando header x-dev-key=devkey em ambiente dev) para validar.

Observações
- Gmail tem limites diários e pode colocar e-mails no Spam. Para produção, migre depois para SendGrid/Mailgun/SES com domínio autenticado.
