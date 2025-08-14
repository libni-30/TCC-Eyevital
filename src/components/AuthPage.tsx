import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import imgLogin from '/IMAGENS/img_login.png';
import imgEyeOpen from '/IMAGENS/img_olhoaberto.png';
import imgEyeClosed from '/IMAGENS/img_olhofechado.png';

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
    // Implementar lógica de submissão
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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Lado esquerdo - Imagem */}
      <div className="w-full md:w-1/2 bg-primary flex items-center justify-center p-6">
        <img
          src={imgLogin}
          alt="EyeVital Login"
          className="max-w-full h-auto object-contain"
        />
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Bem Vindo ao EyeVital!
          </h2>

          {/* Botões de alternância */}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setIsLoginView(true)}
              className={\`px-6 py-2 rounded-full transition-all \${
                isLoginView
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-600'
              }\`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLoginView(false)}
              className={\`px-6 py-2 rounded-full transition-all \${
                !isLoginView
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-600'
              }\`}
            >
              Registrar
            </button>
          </div>

          <p className="text-center text-gray-600">
            Certifique-se se você já está registrado para que possa ter uma
            experiência melhor em nossa plataforma.
          </p>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginView && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary"
                  placeholder="Insira seu nome"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary"
                placeholder="Insira seu email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary"
                  placeholder="Insira sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <img
                    src={showPassword ? imgEyeClosed : imgEyeOpen}
                    alt={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>

            {!isLoginView && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary"
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
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600">Lembre-me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isLoginView ? 'Login' : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
