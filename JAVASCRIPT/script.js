// LEGADO: A lógica deste arquivo foi migrada para o componente React `AuthPage`.
// Este script permanece apenas como referência temporária e poderá ser removido.
// Alternância entre formulários
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const registerPassword = document.getElementById('register-password');
const registerPasswordConfirm = document.getElementById('register-password-confirm');
const registerPasswordError = document.getElementById('register-password-error');
const registerPasswordConfirmError = document.getElementById('register-password-confirm-error');
let registerTouched = { password: false, confirm: false };
let confirmBlurred = false;

loginBtn.addEventListener("click", () => {
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
  loginForm.style.display = "block";
  registerForm.style.display = "none";
  resetRegisterForm();
});

registerBtn.addEventListener("click", () => {
  registerBtn.classList.add("active");
  loginBtn.classList.remove("active");
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  resetRegisterForm();
});

// Mostrar/Ocultar senha (genérico para múltiplos campos)
document.addEventListener('click', (e) => {
  const target = e.target instanceof HTMLElement ? (e.target.closest('.toggle-password')) : null;
  if (!target || !(target instanceof HTMLElement) || !target.classList.contains('toggle-password')) return;

  const forId = target.getAttribute('data-toggle-for');
  if (!forId) return;
  const input = document.getElementById(forId);
  if (!(input instanceof HTMLInputElement)) return;
  const img = target.querySelector('img');

  const showing = input.type === 'text';
  input.type = showing ? 'password' : 'text';

  // Atualiza acessibilidade
  target.setAttribute('aria-pressed', (!showing).toString());
  target.setAttribute('aria-label', showing ? 'Mostrar senha' : 'Ocultar senha');

  if (img) {
    img.setAttribute('src', showing ? '../IMAGENS/img_olhoaberto.png' : '../IMAGENS/img_olhofechado.png');
  }
});

// -------- Validação de Senha Registro --------
function passwordsMatch() {
  if (!registerPassword || !registerPasswordConfirm) return true;
  return registerPassword.value === registerPasswordConfirm.value;
}

function showPasswordErrors() {
  if (!registerPassword || !registerPasswordConfirm) return;
  // Limpa anteriores
  if (registerPasswordError) registerPasswordError.textContent = '';
  if (registerPasswordConfirmError) registerPasswordConfirmError.textContent = '';
  registerPassword.removeAttribute('aria-invalid');
  registerPasswordConfirm.removeAttribute('aria-invalid');

  // Regras
  if (registerTouched.password && registerPassword.value.trim().length < 6) {
    if (registerPasswordError) registerPasswordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    registerPassword.setAttribute('aria-invalid', 'true');
  }

  if (registerTouched.confirm && registerPasswordConfirm.value !== '' ) {
    const baseOk = registerPassword.value.trim().length >= 6;
    const bothFilled = registerPassword.value.trim() !== '' && registerPasswordConfirm.value.trim() !== '';
    const progressedEnough = registerPasswordConfirm.value.length >= registerPassword.value.length; // usuário já digitou o necessário
    const shouldEvaluate = baseOk && bothFilled && (progressedEnough || confirmBlurred);
    if (shouldEvaluate && !passwordsMatch()) {
      if (registerPasswordConfirmError) registerPasswordConfirmError.textContent = 'As senhas não coincidem.';
      registerPasswordConfirm.setAttribute('aria-invalid', 'true');
    }
  }
}

function formPasswordsValid() {
  if (!registerPassword || !registerPasswordConfirm) return true;
  return registerPassword.value.trim().length >= 6 && passwordsMatch();
}

function resetRegisterForm() {
  if (registerPassword) registerPassword.value = '';
  if (registerPasswordConfirm) registerPasswordConfirm.value = '';
  registerTouched = { password: false, confirm: false };
  confirmBlurred = false;
  if (registerPasswordError) registerPasswordError.textContent = '';
  if (registerPasswordConfirmError) registerPasswordConfirmError.textContent = '';
  if (registerPassword) registerPassword.removeAttribute('aria-invalid');
  if (registerPasswordConfirm) registerPasswordConfirm.removeAttribute('aria-invalid');
  // Reset toggles (voltar para estado escondido)
  document.querySelectorAll('[data-toggle-for="register-password"],[data-toggle-for="register-password-confirm"]').forEach(btn => {
    const inputId = btn.getAttribute('data-toggle-for');
    const input = document.getElementById(inputId);
    if (input instanceof HTMLInputElement && input.type === 'text') {
      input.type = 'password';
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Mostrar senha');
      const img = btn.querySelector('img');
      if (img) img.setAttribute('src','../IMAGENS/img_olhoaberto.png');
    }
  });
}

// Eventos de digitação para validação em tempo real
if (registerPassword) {
  registerPassword.addEventListener('input', () => { registerTouched.password = true; showPasswordErrors(); });
  registerPassword.addEventListener('blur', () => { registerTouched.password = true; showPasswordErrors(); });
}
if (registerPasswordConfirm) {
  registerPasswordConfirm.addEventListener('input', () => { 
    // Só validar se usuário já tocou no confirm ou senha já atende tamanho mínimo
    registerTouched.confirm = true; 
    showPasswordErrors();
  });
  registerPasswordConfirm.addEventListener('blur', () => { registerTouched.confirm = true; confirmBlurred = true; showPasswordErrors(); });
}

// Intercepta submit do formulário de registro para validar
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
  registerTouched = { password: true, confirm: true };
  confirmBlurred = true;
    showPasswordErrors();
    if (!formPasswordsValid()) {
      e.preventDefault();
    }
  });
}
