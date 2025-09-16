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
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Container principal */}
      <div className="w-full max-w-[1100px] h-[600px] bg-white rounded-[32px] shadow-2xl flex overflow-hidden">
        {/* Lado esquerdo - Imagem */}
        <div className="hidden md:flex w-1/2 bg-[#E8F4F8] items-center justify-center p-12">
          <div className="w-full max-w-[360px] flex items-center justify-center">
            <img
              src="/IMAGENS/img_login.png"
              alt="EyeVital Login"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-[380px] space-y-6">
            <h1 className="text-[2rem] font-bold text-center text-gray-900 mb-2">
              Bem Vindo ao EyeVital!
            </h1>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsLoginView(true)}
                className={`flex-1 py-2.5 px-8 rounded-full text-sm font-medium shadow-sm ${
                  isLoginView
                    ? 'bg-[#00B9BC] text-white'
                    : 'bg-[#B4F4F4] text-[#00B9BC]'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLoginView(false)}
                className={`flex-1 py-2.5 px-8 rounded-full text-sm font-medium ${
                  !isLoginView
                    ? 'bg-[#00B9BC] text-white'
                    : 'bg-[#B4F4F4] text-[#00B9BC]'
                }`}
              >
                Registrar
              </button>
            </div>

            <p className="text-center text-[#666666] text-sm px-4">
              Certifique-se se você já está registrado para que possa ter uma experiência melhor em nossa plataforma.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginView && (
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Nome de Usuário
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Insira seu nome"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm placeholder-gray-400"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Insira seu Email"
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Insira sua senha"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm placeholder-gray-400 pr-10"
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
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirme sua senha"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm placeholder-gray-400"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-[#E5E5E5] text-[#00B9BC] focus:ring-[#00B9BC]"
                  />
                  <span className="ml-2 text-sm text-[#666666]">Lembre-me</span>
                </label>
                <a href="#" className="text-sm text-[#00B9BC] hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-[#00B9BC] text-white rounded-lg font-medium text-sm hover:bg-[#00B9BC]/90 transition-colors"
              >
                {isLoginView ? 'Login' : 'Registrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
