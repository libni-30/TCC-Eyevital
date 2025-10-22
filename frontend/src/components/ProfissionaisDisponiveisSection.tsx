import React from 'react';

const ProfissionaisDisponiveisSection: React.FC = () => {
  return (
    <section id="profissionais-disposicao" className="prof2-section" aria-labelledby="prof2-titulo">
      <div className="prof2-container">
        {/* Coluna esquerda: janela com cards */}
        <div className="prof2-window" aria-hidden="true">
          <div className="prof2-window-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="prof2-cards">
            <div className="prof2-card">
              <div className="prof2-avatar-wrapper">
                <img src="IMAGENS/atendente.png" alt="Instrutor" loading="lazy" className="prof2-avatar" />
                <div className="prof2-badge">
                  <span className="prof2-badge-role">Instrutor</span>
                  <span className="prof2-badge-name">Evany Howard</span>
                </div>
              </div>
              <button className="prof2-action typing" type="button">Digitando...</button>
            </div>
            <div className="prof2-card">
              <div className="prof2-avatar-wrapper">
                <img src="IMAGENS/cliente.png" alt="Você" loading="lazy" className="prof2-avatar" />
                <div className="prof2-badge dark">
                  <span className="prof2-badge-role">Você</span>
                  <span className="prof2-badge-name">Patricia Mendoza</span>
                </div>
              </div>
              <button className="prof2-action reply" type="button">Responder</button>
            </div>
          </div>
          <div className="prof2-ring" />
          <div className="prof2-tri" />
        </div>

        {/* Coluna direita: texto e bullets */}
        <div className="prof2-texto">
          <h2 id="prof2-titulo" className="prof2-titulo">
            <span className="strong">PROFISSIONAIS SEMPRE A</span> <span className="highlight-green">DISPOSIÇÃO</span>
          </h2>
          <p className="prof2-sub">Respondendo questões como:</p>
          <ul className="prof2-lista" aria-label="Exemplos de dúvidas respondidas">
            <li className="prof2-item">
              <span className="icon" aria-hidden="true">▦</span>
              <p>Uso correto de óculos e lentes de contato. Dicas sobre como escolher, usar e cuidar adequadamente.</p>
            </li>
            <li className="prof2-item">
              <span className="icon" aria-hidden="true">▦</span>
              <p>As principais perguntas sobre cirurgias oculares, como LASIK, catarata e outras intervenções.</p>
            </li>
            <li className="prof2-item">
              <span className="icon" aria-hidden="true">▦</span>
              <p>Esclarecimentos sobre tratamentos disponíveis para diversas condições oculares e quando procurar ajuda médica.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProfissionaisDisponiveisSection;
