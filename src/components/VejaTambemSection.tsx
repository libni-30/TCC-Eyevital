import React from 'react';

const VejaTambemSection: React.FC = () => {
  return (
    <section id="veja-tambem" className="vt-section" aria-labelledby="vt-titulo">
      <div className="vt-container">
        <h2 id="vt-titulo" className="vt-title">VEJA TAMBÉM</h2>

        <div className="vt-grid">
          {/* Card grande à esquerda */}
          <article className="vt-card vt-card-large">
            <figure className="vt-figure">
              <img src="IMAGENS/imagem-olho.png" alt="Olho e anatomia" loading="lazy" />
              <span className="vt-badge">NEWS</span>
            </figure>
            <div className="vt-content">
              <h3 className="vt-card-title">Entenda a anatomia dos seus olhos</h3>
              <p className="vt-card-desc">Conhecer as partes que compõem o olho é essencial para compreender como enxergamos. Íris, pupila, córnea e retina trabalham em conjunto para transformar a luz em imagem — um processo fascinante que merece ser explorado!</p>
              <a className="vt-link" href="#">Ler mais</a>
            </div>
          </article>

          {/* Coluna direita com 3 cards menores */}
          <div className="vt-right">
            <article className="vt-card vt-card-small no-image">
              <div className="vt-content">
                <h3 className="vt-card-title">Cuidados diários com a saúde ocular</h3>
                <p className="vt-card-desc">O uso correto de colírios é fundamental para manter os olhos hidratados e saudáveis. Saiba quando e como utilizá-los de forma segura, e evite hábitos que podem prejudicar sua visão no dia a dia.</p>
              </div>
            </article>

            <article className="vt-card vt-card-small no-image">
              <div className="vt-content">
                <h3 className="vt-card-title">Enxergando melhor com a correção ideal</h3>
                <p className="vt-card-desc">Miopia e hipermetropia são comuns e têm correção simples com as lentes certas. Entenda como o tipo de lente ajuda o olho a focar corretamente, devolvendo nitidez e conforto visual.</p>
              </div>
            </article>

            <article className="vt-card vt-card-small no-image">
              <div className="vt-content">
                <h3 className="vt-card-title">Astigmatismo: por que as imagens ficam borradas?</h3>
                <p className="vt-card-desc">O astigmatismo ocorre quando a curvatura da córnea é irregular, causando distorção na formação da imagem. Veja como lentes específicas corrigem essa condição com eficiência.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VejaTambemSection;
