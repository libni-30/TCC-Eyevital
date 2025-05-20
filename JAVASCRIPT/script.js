// Seleção dos botões de Login e Registrar
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// Alternar entre botões
loginBtn.addEventListener('click', function () {
    // Adiciona a classe 'active' ao botão de Login e remove do botão Registrar
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
    
    // Exibe o formulário de login
    document.getElementById('login-form').style.display = 'block';
    // Esconde o formulário de registro (se existir)
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.style.display = 'none';
    }
});

registerBtn.addEventListener('click', function () {
    // Adiciona a classe 'active' ao botão de Registrar e remove do botão Login
    registerBtn.classList.add('active');
    loginBtn.classList.remove('active');
    
    // Esconde o formulário de login
    document.getElementById('login-form').style.display = 'none';
    // Exibe o formulário de registro (se existir)
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.style.display = 'block';
    }
});
