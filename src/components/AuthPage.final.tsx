import { useState } from 'react';

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[90%] max-w-[1100px] h-[600px] bg-white rounded-[2rem] flex overflow-hidden shadow-2xl">
        {/* Lado esquerdo - Imagem */}
        <div className="hidden md:flex w-1/2 bg-[#E8F4F8] items-center justify-center p-12">
          <div className="w-full max-w-[360px]">
            <img
              src="/IMAGENS/img_login.png"
              alt="EyeVital Login"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-[380px] space-y-6">
            <h1 className="text-[2rem] font-bold text-center text-gray-800">
              Bem Vindo ao EyeVital!
            </h1>

            <div className="flex gap-2">
              <button
                className="flex-1 py-2.5 px-6 bg-[#00B9BC] text-white rounded-full text-sm font-medium"
                type="button"
              >
                Login
              </button>
              <button
                className="flex-1 py-2.5 px-6 bg-[#B4F4F4] text-[#00B9BC] rounded-full text-sm font-medium"
                type="button"
              >
                Registrar
              </button>
            </div>

            <p className="text-center text-[#666666] text-sm leading-relaxed">
              Certifique-se se você já está registrado para que possa ter uma experiência melhor em nossa plataforma.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
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

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Insira sua senha"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:ring-[#00B9BC] focus:border-[#00B9BC] text-sm placeholder-gray-400"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-[#00B9BC] focus:ring-[#00B9BC]"
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
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
