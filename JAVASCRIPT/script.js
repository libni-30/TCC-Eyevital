// Alternância entre formulários
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginBtn.addEventListener("click", () => {
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
  loginForm.style.display = "block";
  registerForm.style.display = "none";
});

registerBtn.addEventListener("click", () => {
  registerBtn.classList.add("active");
  loginBtn.classList.remove("active");
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

// Mostrar/Ocultar senha
function togglePassword() {
  const passwordInput = document.querySelector("#password");
  const eyeIcon = document.querySelector("#eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "../IMAGENS/img_olhofechado.png";
    eyeIcon.alt = "Ocultar senha";
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "../IMAGENS/img_olhoaberto.png";
    eyeIcon.alt = "Mostrar senha";
  }
}
