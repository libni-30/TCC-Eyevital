import React from 'react';

const ProfissionaisDisposicaoSection: React.FC = () => {
  return (
    <section id="profissionais-disposicao" className="prof-section" aria-labelledby="prof-title">
      <div className="prof-container">
        {/* Lado Esquerdo: Mock da janela de chamada */}
        <div className="prof-window" aria-hidden="true">
          <div className="prof-window-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="prof-cards-row">
            <div className="prof-card instructor">
              <img src="IMAGENS/atendente.png" alt="Instrutor" loading="lazy" />
              <div className="prof-label">
                <span className="badge-role">Instrutor</span>
                <span className="name-single">Evany Howard</span>
              </div>
            </div>
            <div className="prof-card user">
              <img src="IMAGENS/cliente.png" alt="Você" loading="lazy" />
              <div className="prof-label">
                <span className="you-role">Você</span>
                <span className="name-double">Patricia Mendoza</span>
              </div>
            </div>
          </div>
          <div className="prof-actions">
            <button type="button" className="prof-btn typing" aria-label="Instrutor está digitando">Digitando...</button>
            <button type="button" className="prof-btn answer" aria-label="Responder mensagem">Responder</button>
          </div>
          <div className="prof-decor-ring" aria-hidden="true"></div>
          <div className="prof-decor-tri" aria-hidden="true"></div>
        </div>

        {/* Lado Direito: Texto e lista */}
        <div className="prof-text">
          <h2 id="prof-title" className="prof-title">PROFISSIONAIS SEMPRE A <span className="highlight-green">DISPOSIÇÃO</span></h2>
          <p className="prof-subtitle">Respondendo questões como:</p>
          <ul className="prof-list" role="list">
            <li className="prof-item">
              <div className="prof-icon sq1" aria-hidden="true"></div>
              <p>Uso correto de óculos e lentes de contato. Dicas sobre como escolher, usar e cuidar adequadamente.</p>
            </li>
            <li className="prof-item">
              <div className="prof-icon sq2" aria-hidden="true"></div>
              <p>As principais perguntas sobre cirurgias oculares, como LASIK, catarata e outras intervenções.</p>
            </li>
            <li className="prof-item">
              <div className="prof-icon sq3" aria-hidden="true"></div>
              <p>Esclarecimentos sobre tratamentos disponíveis para diversas condições oculares e quando procurar ajuda médica.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProfissionaisDisposicaoSection;
