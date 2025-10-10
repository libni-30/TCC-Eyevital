import React from 'react';
import './ContatoPage.css';
import { PhoneIcon, MapPinIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

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
            <h3 style={{textTransform:'uppercase'}}>Outros canais</h3>
            <p>Quer saber mais? Fale conosco:</p>

            <a className="contato-link" href="mailto:contato@eyevital.com">
              <span className="contato-icone" aria-hidden="true">
                <img src="/IMAGENS/email-logo.png" alt="E-mail" />
              </span>
              <span className="contato-social-label">E-mail: contato@eyevital.com</span>
            </a>
            <a className="contato-link" href="#" aria-label="Instagram Eyevital">
              <span className="contato-icone" aria-hidden="true">
                <img src="/IMAGENS/ista-logo.png" alt="Instagram" />
              </span>
              <span className="contato-social-label">Instagram: @eyevital</span>
            </a>
            <a className="contato-link" href="#" aria-label="Facebook Eyevital">
              <span className="contato-icone" aria-hidden="true"><EnvelopeIcon /></span>
              <span className="contato-social-label">Fb.com/eyevital</span>
            </a>
          </div>
        </div>
      </div>
      <footer className="site-footer" style={{marginTop: 40}}>
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
