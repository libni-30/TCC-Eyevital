import React from 'react';
import './ContatoPage.css';
import { PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const ContatoPage: React.FC = () => {
  return (
    <div className="contato-page">
      {/* Header replicado para esta página */}
      <header className="header">
        <nav className="nav-container">
          <div className="logo">
            <div className="logo-diamond"></div>
            <a className="logo-text" href="#/">EYEVITAL</a>
          </div>
          <nav className="nav-menu" role="navigation" aria-label="Menu principal">
            <a href="#/">Sobre nós</a>
            <a href="#/">Educação</a>
            <a href="#/">Consultas</a>
            <a href="#/contato" aria-current="page" className="active">Contato</a>
          </nav>
          <div className="auth-buttons">
            <a href="HTML/index.html" className="login-btn">Login</a>
            <a href="HTML/index.html#register" className="register-btn">Registrar</a>
          </div>
        </nav>
      </header>
      <div className="contato-hero-spacer" />
  <div className="contato-container">

        <div className="contato-grid">
          {/* Coluna esquerda */}
          <div className="contato-card">
            <div className="contato-bloco">
              <div className="contato-icone" aria-hidden="true"><PhoneIcon /></div>
              <div>
        <h3 style={{textTransform:'uppercase'}}>Ligue para nós</h3>
                <p className="contato-texto">(11) 98765-4321<br/> (11) 91234-5678</p>
              </div>
            </div>

            <div className="contato-bloco">
              <div className="contato-icone" aria-hidden="true"><MapPinIcon /></div>
              <div>
        <h3 style={{textTransform:'uppercase'}}>Localização</h3>
                <p className="contato-texto">
                  Rua Saúde dos Olhos, 123<br/>
                  Centro, São Paulo – SP<br/>
                  CEP 01000-000
                </p>
              </div>
            </div>

            <div className="contato-bloco">
              <div className="contato-icone" aria-hidden="true"><ClockIcon /></div>
              <div>
        <h3 style={{textTransform:'uppercase'}}>Horário comercial</h3>
                <p className="contato-texto">Seg – Sex: 9h–18h<br/> Sáb: 9h–12h</p>
              </div>
            </div>
          </div>

          {/* Coluna direita */}
          <div className="contato-card contato-outros">
            <h3 className="contato-outros-title">Outros canais</h3>
            <p className="contato-intro">Quer saber mais?<br/>Fale conosco:</p>

            <div className="contato-infoline" aria-label="E-mail">
              <span className="contato-icone" aria-hidden="true">
                <img src="/IMAGENS/email-logo.png" alt="E-mail" />
              </span>
              <span className="contato-social-label">E-mail: contato@eyevital.com</span>
            </div>
            <div className="contato-infoline" aria-label="Instagram Eyevital">
              <span className="contato-icone" aria-hidden="true">
                <img src="/IMAGENS/ista-logo.png" alt="Instagram" />
              </span>
              <span className="contato-social-label">Instagram: @eyevital</span>
            </div>
            <div className="contato-infoline" aria-label="Facebook Eyevital">
              <span className="contato-icone" aria-hidden="true">
                <img src="/IMAGENS/facebook-logo.webp" alt="Facebook" />
              </span>
              <span className="contato-social-label">Fb.com/eyevital</span>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default ContatoPage;
