import React from 'react';

const ProfissionaisSection: React.FC = () => {
  return (
    <section id="profissionais-disponiveis" className="prof-section" aria-labelledby="prof-title">
      <div className="prof-container">
        <div className="prof-window">
          <div className="prof-window-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="prof-cards">
            <div className="prof-card">
              <div className="prof-avatar-wrapper">
                <img src="IMAGENS/atendente.png" alt="Instrutor" className="prof-avatar" loading="lazy" />
                <div className="prof-badge">
                  <span className="indicator" aria-hidden="true">▌▌</span>
                  <span className="role">Instrutor</span>
                  <span className="name">Evany Howard</span>
                </div>
              </div>
              <button type="button" className="prof-action typing">Digitando...</button>
            </div>

            <div className="prof-card">
              <div className="prof-avatar-wrapper">
                <img src="IMAGENS/cliente.png" alt="Você" className="prof-avatar" loading="lazy" />
                <div className="prof-badge dark">
                  <span className="indicator" aria-hidden="true">▌▌</span>
                  <span className="role">Você</span>
                  <span className="name">Patricia Mendoza</span>
                </div>
              </div>
              <button type="button" className="prof-action reply">Responder</button>
            </div>
          </div>
          <div className="prof-decor-ring" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
};

export default ProfissionaisSection;
