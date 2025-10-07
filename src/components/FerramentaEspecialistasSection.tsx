import React from 'react';

const FerramentaEspecialistasSection: React.FC = () => {
  return (
    <section id="ferramenta-especialistas" className="ferramenta-section" aria-labelledby="ferramenta-titulo">
      <div className="ferramenta-container">
        <div className="ferramenta-texto">
          <h2 id="ferramenta-titulo" className="ferramenta-titulo">
            FERRAMENTA DOS <span className="highlight-green">ESPECIALISTAS</span>
          </h2>
          <p className="ferramenta-descricao">
            Explore as ferramentas incríveis que nossos especialistas usam para tornar o aprendizado sobre saúde ocular super divertido e fácil de entender! Aqui você encontrará vídeos interessantes para responder os quizzes interativos e dicas práticas que ajudam a cuidar da sua visão no dia a dia. Nossos professores estão sempre disponíveis para te ajudar a aproveitar ao máximo esses recursos, garantindo que aprender sobre a saúde dos seus olhos seja uma experiência agradável e enriquecedora.
          </p>
        </div>

        <div className="ferramenta-visual" aria-hidden="true">
          <div className="gradebook-card">
            <div className="gradebook-header v2">
              <div className="header-icon">★</div>
              <div className="header-title">GradeBook</div>
              <div className="header-icon">📘</div>
              <div className="gb-circles">
                <span className="circ c1"></span>
                <span className="circ c2"></span>
                <span className="circ c3"></span>
              </div>
            </div>

            <div className="progress-list">
              <div className="gb-row">
                <div className="progress-line"><span className="progress-fill fill-high" style={{width:'68%'}}></span></div>
                <div className="gb-avatar badge">
                  <img src="IMAGENS/img_login.png" alt="" loading="lazy" />
                  <span className="mini-badge">+</span>
                </div>
                <div className="gb-score-pill pill-blue">100</div>
              </div>
              <div className="gb-row">
                <div className="progress-line"><span className="progress-fill fill-mid" style={{width:'46%'}}></span></div>
                <div className="gb-avatar">
                  <img src="IMAGENS/img_olhoaberto.png" alt="" loading="lazy" />
                </div>
                <div className="gb-score-pill pill-light">9</div>
              </div>
              <div className="gb-row">
                <div className="progress-line"><span className="progress-fill fill-low" style={{width:'28%'}}></span></div>
                <div className="gb-avatar">
                  <img src="IMAGENS/img_olhofechado.png" alt="" loading="lazy" />
                </div>
                <div className="gb-score-pill pill-red">75</div>
              </div>
            </div>

            <div className="export-wrapper">
              <div className="marker-tri"></div>
              <button type="button" className="export-btn">Export</button>
            </div>
          </div>
          <div className="ferramenta-decor circle-a"></div>
          <div className="ferramenta-decor circle-b"></div>
          <div className="ferramenta-decor circle-c"></div>
        </div>
      </div>
    </section>
  );
};

export default FerramentaEspecialistasSection;
