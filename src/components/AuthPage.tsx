import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  rememberMe: boolean;
}

interface Touched {
  password: boolean;
  confirm: boolean;
}

const INITIAL_FORM: FormData = {
  email: '',
  password: '',
  username: '',
  confirmPassword: '',
  rememberMe: false
};

interface AuthPageProps {
  initialMode?: 'login' | 'register';
  onBack?: () => void; // reservado para uso futuro
}

const AuthPage = ({ initialMode = 'login' }: AuthPageProps) => {
  console.log('[AuthPage] mount initialMode=', initialMode);
  const [isLoginView, setIsLoginView] = useState(initialMode === 'login');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState<Touched>({ password: false, confirm: false });
  const [confirmBlurred, setConfirmBlurred] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Derived validation states
  const passwordValid = formData.password.trim().length >= 6;
  const bothFilled = formData.password.trim() !== '' && formData.confirmPassword.trim() !== '';
  const progressedEnough = formData.confirmPassword.length >= formData.password.length; // usuário já digitou o necessário
  const showMismatch = !isLoginView && passwordValid && touched.confirm && bothFilled && (progressedEnough || confirmBlurred) && formData.password !== formData.confirmPassword;

  const passwordError = !isLoginView && touched.password && !passwordValid ? 'A senha deve ter pelo menos 6 caracteres.' : '';
  const confirmError = showMismatch ? 'As senhas não coincidem.' : '';

  const canSubmit = () => {
    if (isLoginView) return formData.email && formData.password;
    return formData.email && formData.username && passwordValid && !showMismatch && formData.confirmPassword;
  };

  const handleToggleView = (login: boolean) => {
    setIsLoginView(login);
    // Reset senhas sempre; limpa username ao voltar para login para evitar dado residual
    setFormData(prev => ({
      ...prev,
      password: '',
      confirmPassword: '',
      username: login ? '' : prev.username
    }));
    setTouched({ password: false, confirm: false });
    setConfirmBlurred(false);
    setShowPassword(false);
    setShowConfirm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked as any) : value
    }));
  };

  const markTouched = (field: keyof Touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit()) {
      // força mostrar erros
      setTouched({ password: true, confirm: true });
      setConfirmBlurred(true);
      return;
    }
    setSubmitting(true);
    // Simulação de requisição async
    setTimeout(() => {
      console.log('Form submitted:', { mode: isLoginView ? 'login' : 'register', formData });
      setSubmitting(false);
    }, 800);
  };

  console.log('[AuthPage] render isLoginView=', isLoginView);
  return (
    <main className="min-h-screen bg-[#E8F4F8] flex items-center justify-center border-4 border-dashed border-cyan-500">
      <div className="w-full max-w-[1280px] min-h-screen md:min-h-0 bg-white md:bg-transparent flex flex-col md:flex-row md:rounded-3xl md:shadow-none">
        {/* Lado esquerdo - Imagem */}
  <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-8">
          {/* Caminho relativo sem barra inicial para funcionar no dev e build */}
          <img
            src="IMAGENS/img_login.png"
            alt="EyeVital Login"
            className="w-[80%] max-w-[400px] h-auto"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'IMAGENS/img_login.png'; }}
          />
        </div>

        {/* Lado direito - Formulário */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-[400px] bg-white rounded-2xl md:shadow-xl p-8">
            <h1 className="text-xs font-mono mb-2 text-cyan-600">DEBUG AUTH</h1>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Bem Vindo ao EyeVital!
            </h2>

            {/* Botões de alternância */}
            <div className="flex justify-center gap-4 mb-6" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={isLoginView}
                onClick={() => handleToggleView(true)}
                className={`px-8 py-2.5 rounded-full transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B9BC] ${
                  isLoginView
                    ? 'bg-[#00B9BC] text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!isLoginView}
                onClick={() => handleToggleView(false)}
                className={`px-8 py-2.5 rounded-full transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B9BC] ${
                  !isLoginView
                    ? 'bg-[#00B9BC] text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                Registrar
              </button>
            </div>

            <p className="text-center text-gray-600 text-sm mb-8">
              Certifique-se se você já está registrado para que possa ter uma
              experiência melhor em nossa plataforma.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-live="polite">
              {!isLoginView && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                    Nome de Usuário
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm"
                    placeholder="Insira seu nome"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm"
                  placeholder="Insira seu email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={(e) => { handleInputChange(e); markTouched('password'); }}
                    onBlur={() => markTouched('password')}
                    aria-invalid={!!passwordError || undefined}
                    aria-describedby={passwordError ? 'password-error' : undefined}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-[#00B9BC] focus:border-[#00B9BC] ${passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                    placeholder="Insira sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                  >
                      <img
                        src={`IMAGENS/${showPassword ? 'img_olhofechado.png' : 'img_olhoaberto.png'}`}
                      alt=""
                      className="w-5 h-5 pointer-events-none select-none"
                      draggable={false}
                    />
                  </button>
                </div>
                {!isLoginView && passwordError && (
                  <p id="password-error" className="mt-1 text-xs text-red-600">{passwordError}</p>
                )}
              </div>

              {!isLoginView && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => { handleInputChange(e); markTouched('confirm'); }}
                      onBlur={() => { markTouched('confirm'); setConfirmBlurred(true); }}
                      aria-invalid={!!confirmError || undefined}
                      aria-describedby={confirmError ? 'confirm-error' : undefined}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-[#00B9BC] focus:border-[#00B9BC] ${confirmError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                      placeholder="Confirme sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(c => !c)}
                      aria-pressed={showConfirm}
                      aria-label={showConfirm ? 'Ocultar senha' : 'Mostrar senha'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                    >
                      <img
                        src={`IMAGENS/${showConfirm ? 'img_olhofechado.png' : 'img_olhoaberto.png'}`}
                        alt=""
                        className="w-5 h-5 pointer-events-none select-none"
                        draggable={false}
                      />
                    </button>
                  </div>
                  {confirmError && (
                    <p id="confirm-error" className="mt-1 text-xs text-red-600">{confirmError}</p>
                  )}
                </div>
              )}

              {isLoginView && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-[#00B9BC] focus:ring-[#00B9BC]"
                    />
                    <span className="ml-2 text-sm text-gray-600">Lembre-me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[#00B9BC] hover:text-[#00B9BC]/80"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !canSubmit()}
                className={`w-full h-11 mt-6 flex items-center justify-center rounded-full text-white font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B9BC] ${
                  submitting || !canSubmit() ? 'bg-[#00B9BC]/60 cursor-not-allowed' : 'bg-[#00B9BC] hover:bg-[#00B9BC]/90'
                }`}
              >
                {submitting ? (isLoginView ? 'Entrando...' : 'Registrando...') : (isLoginView ? 'Login' : 'Registrar')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
