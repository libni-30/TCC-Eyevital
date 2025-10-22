import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';
import AuthModal from './AuthModal';
import QuizSection from './QuizSection';
import FerramentaEspecialistasSection from './FerramentaEspecialistasSection';
import ProfissionaisDisponiveisSection from './ProfissionaisDisponiveisSection';
import AjudaProfissionalSection from './AjudaProfissionalSection';
import EstrabismoSection from './EstrabismoSection';
import VejaTambemSection from './VejaTambemSection';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Redirecionar usuários logados para /home
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  // Aplicar estilos ao body quando o componente montar
  useEffect(() => {
    document.body.style.paddingTop = '0';
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';
    
    return () => {
      // Limpar estilos ao desmontar
      document.body.style.paddingTop = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  useEffect(() => {
    // Observador de interseção para atualizar menu ativo durante scroll
    sectionsRef.current = document.querySelectorAll('section[id]');
    
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          removeAllActive();
          document.querySelector(`.nav-menu a[href="#${id}"]`)?.classList.add('active');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach(section => observer.observe(section));

    return () => {
      sectionsRef.current?.forEach(section => observer.unobserve(section));
    };
  }, []);

  const removeAllActive = () => {
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/images/placeholder.png';
  };

  const handleImageErrorDirect = (img: HTMLImageElement): void => {
    img.onerror = null;
    img.src = '/assets/images/placeholder.png';
  };

  const handleAuthClick = (type: 'login' | 'register') => {
    navigate('/auth', { state: { initialTab: type } });
  };

  const handleMenuClick = (page: 'sobre' | 'educacao' | 'ajuda' | 'contato') => {
    if (page === 'sobre') {
      // Scroll para seção "quem-somos" na própria página
      const section = document.querySelector('#quem-somos');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (page === 'educacao' || page === 'ajuda') {
      // Mostra modal pedindo login para páginas protegidas
      setShowAuthModal(true);
    } else if (page === 'contato') {
      navigate('/contato');
    }
  };

  return (
    <>
      <header className="header">
        <nav className="nav-container">
          <div className="logo">
            <div className="logo-diamond"></div>
            <div className="logo-text">EYEVITAL</div>
          </div>
          <nav className="nav-menu" role="navigation" aria-label="Menu principal">
            <a href="#quem-somos" className="active" aria-current="page" onClick={(e) => { e.preventDefault(); handleMenuClick('sobre'); }}>Sobre nós</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('educacao'); }}>Educação</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('ajuda'); }}>Ajuda Profissional</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('contato'); }}>Contato</a>
          </nav>
          <div className="auth-buttons">
            <button onClick={() => handleAuthClick('login')} className="login-btn">Login</button>
            <button onClick={() => handleAuthClick('register')} className="register-btn">Registrar</button>
          </div>
        </nav>
      </header>

      {/* Modal de autenticação */}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)}>
        Você precisa estar logado para acessar esta área. Caso ainda não tenha uma conta, registre-se e depois faça login.
      </AuthModal>

      <main className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Cuide da sua visão com
              <div className="highlight-container">
                <span className="highlight">Inovação</span> e <span className="highlight">Simplicidade</span>
              </div>
            </h1>
            <p className="hero-description">
              Explore uma nova maneira de cuidar dos seus olhos 
              com tecnologia inovadora, testes interativos e 
              conteúdo educativo que se adapta às suas necessidades.
            </p>
          </div>
          <div className="hero-image-container">
            {/* Balão do doutor */}
            <div className="floating-card doctor">
              <div className="card-header">
                <img src="/IMAGENS/img_login.png" alt="Doutor Queiroz" className="doctor-avatar" onError={handleImageError} />
                <div className="doctor-info">
                  <div className="doctor-name">Doutor Queiroz</div>
                  <div className="doctor-status">Respondeu as suas dúvidas!</div>
                </div>
              </div>
              <button className="view-button">Ver agora</button>
            </div>
            <img 
              src="/IMAGENS/tela-inicial.png" 
              alt="Imagem de referência" 
              className="student-img" 
              style={{ position: 'absolute', right: '5%', bottom: 0, maxWidth: '400px', width: '100%', height: 'auto', zIndex: 2 }}
              onError={handleImageError}
            />
            {/* Balão de métricas */}
            <div className="floating-card metrics">
              <div className="card-icon">📊</div>
              <div className="card-content">
                <div className="metric-number">250k</div>
                <div className="metric-label">Assinantes</div>
              </div>
            </div>

            {/* Balão de parabéns */}
            <div className="floating-card congrats">
              <div className="card-icon">✉️</div>
              <div className="card-content">
                <div className="card-title">Parabéns</div>
                <div className="card-subtitle">Você assistiu todas as aulas.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="wave-bottom">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L1440,320L1440,320L0,320Z"></path>
          </svg>
        </div>
      </main>

      {/* Seção QUEM SOMOS */}
      <section id="quem-somos" className="info-section">
        <div className="decor decor-top-right"></div>
        <h2 className="info-title">QUEM SOMOS</h2>
        <p className="info-text">
          Somos um time apaixonado por promover a saúde visual de forma prática e acessível. O EYEVITAL foi criado para ajudar você a cuidar melhor dos seus olhos, oferecendo orientações confiáveis e dicas simples para o bem-estar visual.
        </p>
        <div className="decor decor-mid-left"></div>
      </section>

      {/* Seção NOSSO OBJETIVO */}
      <section className="info-section">
        <div className="decor decor-mid-left"></div>
        <h2 className="info-title">NOSSO OBJETIVO</h2>
        <p className="info-text">
          Queremos ser seu guia na jornada por uma visão mais saudável. Através do nosso site, proporcionamos ferramentas e informações que facilitam o cuidado com a saúde ocular no dia a dia. Nosso foco é incentivar a prevenção e o cuidado contínuo, para que você enxergue o mundo com mais clareza e qualidade de vida.
        </p>
        <div className="decor decor-bottom-right"></div>
      </section>

      {/* Seção de porcentagens e alternativas */}
      <section className="facts-section">
        <h2 className="facts-title">VOCÊ SABIA?</h2>
        <h3 className="facts-subtitle">Fatos Relevantes Sobre a Saúde dos Olhos</h3>
        <div className="facts-grid">
          <div className="fact-card">
            <span className="fact-percentage">80%</span>
            <p>das causas de perda de visão podem ser prevenidas</p>
          </div>
          <div className="fact-card">
            <span className="fact-percentage">90%</span>
            <p>dos casos de cegueira causados por catarata podem ser revertidos com cirurgia</p>
          </div>
          <div className="fact-card">
            <span className="fact-percentage">50%</span>
            <p>das pessoas com glaucoma não sabem que têm a doença</p>
          </div>
          <div className="fact-card">
            <span className="fact-percentage">90%</span>
            <p>dos usuários de computador relatam sintomas de fadiga ocular digital</p>
          </div>
        </div>
      </section>

      {/* Seção de serviços/cards */}
      <section className="alternativas-section">
        <h2 className="facts-title">COMO NÃO SER PARTE DESSA PORCENTAGEM</h2>
        <p className="facts-subtitle">Aqui estão algumas alternativas que o nosso site lhe oferece.</p>
      </section>

      <section className="servicos-section">
        <div className="servicos-container">
          <div className="servicos-grid">
            <div className="servico-card">
              <div className="servico-icon icon-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <rect x="8" y="8" width="16" height="20" rx="2" fill="#fff"/>
                  <rect x="12" y="12" width="8" height="2" rx="1" fill="#4A6CF7"/>
                  <rect x="12" y="16" width="8" height="2" rx="1" fill="#4A6CF7"/>
                  <rect x="12" y="20" width="8" height="2" rx="1" fill="#4A6CF7"/>
                </svg>
              </div>
              <h3 className="servico-title">Faça nosso exame rápido</h3>
              <p className="servico-desc">Aqui disponibilizamos a oportunidade de você fazer uma avaliação rápida da sua visão.</p>
            </div>
            <div className="servico-card">
              <div className="servico-icon icon-cyan">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <rect x="8" y="12" width="16" height="12" rx="2" fill="#fff"/>
                  <rect x="8" y="8" width="16" height="4" rx="1" fill="#1CC6F7"/>
                  <rect x="12" y="16" width="2" height="2" rx="1" fill="#1CC6F7"/>
                  <rect x="16" y="16" width="2" height="2" rx="1" fill="#1CC6F7"/>
                  <rect x="20" y="16" width="2" height="2" rx="1" fill="#1CC6F7"/>
                </svg>
              </div>
              <h3 className="servico-title">Marque uma consulta</h3>
              <p className="servico-desc">Você pode agendar uma consulta com uma de nossas ópticas parceiras.</p>
            </div>
            <div className="servico-card">
              <div className="servico-icon icon-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="10" fill="#fff"/>
                  <circle cx="16" cy="16" r="5" fill="#3CFCA1"/>
                  <circle cx="12" cy="20" r="2" fill="#3CFCA1"/>
                  <circle cx="20" cy="20" r="2" fill="#3CFCA1"/>
                </svg>
              </div>
              <h3 className="servico-title">Converse com um dos nossos especialistas</h3>
              <p className="servico-desc">Possibilitamos que você converse com especialistas no assunto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* seção: CUIDAR DA VISÃO COMEÇA COM O SABER */}
      <section className="visao-section">
        <div className="visao-container">
          <div className="visao-texto">
            <h2>CUIDAR DA VISÃO COMEÇA COM O SABER!</h2>
            <p>Aprender sobre saúde ocular nunca foi tão fácil! Nosso método de ensino traz informações simples e práticas, para todas as idades. Com conteúdos interativos e dinâmicos, queremos ajudar você a cuidar da visão de forma leve e divertida, promovendo hábitos saudáveis que fazem a diferença no dia a dia.</p>
          </div>
          <div className="visao-imagem">
            <img src="/IMAGENS/imagem oculos.jpg" alt="Óculos com vídeo demonstrativo" onError={handleImageError} />
            <button className="play-btn" aria-label="Reproduzir vídeo"></button>
          </div>
        </div>
      </section>

      {/* Seção APRENDIZADO GUIADO POR ESPECIALISTAS */}
      <section className="aprendizado-section" aria-labelledby="aprendizado-titulo">
        <div className="aprendizado-container">
          <div className="aprendizado-texto">
            <h2 id="aprendizado-titulo"><span className="highlight-green">APRENDIZADO</span> GUIADO POR ESPECIALISTAS</h2>
            <p className="aprendizado-descricao">
              Nossos professores, especialistas no assunto, estão prontos para tornar seu aprendizado leve e interativo.
              As aulas são pensadas para que você compreenda de forma simples os principais cuidados com a visão.
              Você vai ter acesso a vídeos, quizzes, dicas práticas e muito mais para aplicar no seu dia a dia. E o melhor:
              nossa equipe estará sempre por perto para tirar dúvidas e ajudar no que precisar, tornando todo o processo fácil e envolvente.
            </p>
          </div>
          <div className="aprendizado-icones">
            <figure className="aprendizado-figura">
              <img src="/IMAGENS/desenho-visao.jpeg" alt="Ilustrações educativas sobre saúde da visão" loading="lazy" onError={handleImageError} />
            </figure>
            <div className="decor-circle decor-circle-left" aria-hidden="true"></div>
            <div className="decor-circle decor-circle-right" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* Seção TESTE SEU CONHECIMENTO */}
      <QuizSection onImageError={handleImageErrorDirect} />

      {/* Seção FERRAMENTA DOS ESPECIALISTAS */}
      <FerramentaEspecialistasSection />

      {/* Seção PROFISSIONAIS SEMPRE A DISPOSIÇÃO */}
      <ProfissionaisDisponiveisSection />

      {/* Seção AJUDA PROFISSIONAL */}
      <AjudaProfissionalSection onImageError={handleImageErrorDirect} />

      {/* Seção TIPOS DE ESTRABISMO */}
      <EstrabismoSection onImageError={handleImageErrorDirect} />

      {/* Seção VEJA TAMBÉM */}
      <VejaTambemSection />

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo" aria-label="Eyevital">
                <span className="footer-diamond" aria-hidden="true"></span>
                <span className="footer-name">EYEVITAL</span>
              </div>
              <span className="footer-sep" aria-hidden="true"></span>
              <p className="footer-tagline">Cuide da sua visão com inovação e simplicidade</p>
            </div>
          </div>
          <div className="footer-bottom">
            <nav className="footer-links" aria-label="Links do rodapé">
              <a href="#">Careers</a>
              <span className="footer-divider" aria-hidden="true">|</span>
              <a href="#">Privacy Policy</a>
              <span className="footer-divider" aria-hidden="true">|</span>
              <a href="#">Terms &amp; Conditions</a>
            </nav>
            <p className="footer-copy">&copy; 2025 Eyevital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
