import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './AuthPage.css';

interface FormData {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
  rememberMe: boolean;
}

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register, user } = useAuth();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const defaultMode = params.get('mode') === 'register' ? false : true;
  const [isLoginView, setIsLoginView] = useState(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    rememberMe: false
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Redireciona para a rota original protegida (from) ou home
      const state = location.state as { from?: string } | null
      const target = state?.from || '/'
      navigate(target, { replace: true })
    }
  }, [user, navigate, location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLoginView) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('As senhas não coincidem');
          return;
        }
        await register(formData.email, formData.password, formData.username);
      }
    } catch (err: any) {
      setError(err?.message || 'Falha na autenticação');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <main className="auth-screen">
      <div className="auth-shell">
        <div className="auth-side">
          <div className="auth-side-inner">
            <img src="/IMAGENS/img_login.png" alt="EyeVital" className="auth-illustration" />
          </div>
        </div>
        <div className="auth-form-wrapper">
          <div className="auth-card">
            <h2 className="auth-title">Bem Vindo ao EyeVital!</h2>
            <div className="auth-toggle">
              <button
                type="button"
                onClick={() => setIsLoginView(true)}
                className={`toggle-btn ${isLoginView ? 'active' : ''}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLoginView(false)}
                className={`toggle-btn ${!isLoginView ? 'active' : ''}`}
              >
                Registrar
              </button>
            </div>
            <p className="auth-sub">Certifique-se se você já está registrado para que possa ter uma experiência melhor em nossa plataforma.</p>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
              {!isLoginView && (
                <div className="field">
                  <label>Nome de Usuário</label>
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Insira seu nome" />
                </div>
              )}
              <div className="field">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Insira seu email" />
              </div>
              <div className="field">
                <label>Senha</label>
                <div className="password-wrapper">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} placeholder="Insira sua senha" />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    <img src={`/IMAGENS/${showPassword ? 'img_olhofechado.png' : 'img_olhoaberto.png'}`} alt="Toggle" />
                  </button>
                </div>
              </div>
              {!isLoginView && (
                <div className="field">
                  <label>Confirmar Senha</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirme sua senha" />
                </div>
              )}
              {isLoginView && (
                <div className="extras">
                  <label className="remember"><input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} /> <span>Lembre-me</span></label>
                  <a href="#" className="forgot">Esqueceu sua senha?</a>
                </div>
              )}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Aguarde...' : isLoginView ? 'Login' : 'Registrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
};

export default AuthPage;
