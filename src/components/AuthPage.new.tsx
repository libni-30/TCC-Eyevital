import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
  rememberMe: boolean;
}

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <main className="min-h-screen bg-[#E8F4F8] flex items-center justify-center relative">
      {/* Botão Voltar */}
      <a
        href="/"
        className="absolute top-4 right-4 md:top-8 md:right-8 px-6 py-2 bg-white text-[#00B9BC] rounded-full font-medium text-sm hover:bg-gray-50 transition-colors shadow-md flex items-center gap-2"
      >
        ← Voltar
      </a>

      <div className="w-full max-w-[1280px] min-h-screen md:min-h-0 bg-white md:bg-transparent flex flex-col md:flex-row md:rounded-3xl md:shadow-none">
        {/* Lado esquerdo - Imagem */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <img
            src="/IMAGENS/img_login.png"
            alt="EyeVital Login"
            className="w-[80%] max-w-[400px] h-auto"
          />
        </div>

        {/* Lado direito - Formulário */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-[400px] bg-white rounded-2xl md:shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Bem Vindo ao EyeVital!
            </h2>

            {/* Botões de alternância */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                type="button"
                onClick={() => setIsLoginView(true)}
                className={`px-8 py-2.5 rounded-full transition-all text-sm font-medium ${
                  isLoginView
                    ? 'bg-[#00B9BC] text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLoginView(false)}
                className={`px-8 py-2.5 rounded-full transition-all text-sm font-medium ${
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

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginView && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome de Usuário
                  </label>
                  <input
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm"
                  placeholder="Insira seu email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm"
                    placeholder="Insira sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <img
                      src={`/IMAGENS/${showPassword ? 'img_olhofechado.png' : 'img_olhoaberto.png'}`}
                      alt={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>

              {!isLoginView && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm"
                    placeholder="Confirme sua senha"
                  />
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
                className="w-full h-11 mt-6 flex items-center justify-center rounded-full bg-[#00B9BC] text-white font-medium text-sm hover:bg-[#00B9BC]/90 transition-colors"
              >
                {isLoginView ? 'Login' : 'Registrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
