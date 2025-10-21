import React from 'react';

interface AjudaProfissionalSectionProps {
  onImageError?: (img: HTMLImageElement) => void;
}

const AjudaProfissionalSection: React.FC<AjudaProfissionalSectionProps> = ({ onImageError }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (onImageError) onImageError(e.currentTarget);
  };

  return (
    <section id="ajuda-profissional" className="ajuda-profissional-section" aria-labelledby="ajuda-profissional-titulo">
      <div className="ajuda-profissional-container">
        {/* Coluna esquerda: imagem comparativa */}
        <div className="ajuda-profissional-imagem-wrapper" aria-hidden="true">
          <img
            src="IMAGENS/visao-astigma.jpg"
            alt="Comparação: visão sem e com astigmatismo"
            loading="lazy"
            onError={handleError}
          />
          <div className="ajuda-profissional-decor-circle" />
          <div className="ajuda-profissional-decor-ring" />
        </div>

        {/* Coluna direita: texto */}
        <div className="ajuda-profissional-texto">
          <h2 id="ajuda-profissional-titulo" className="ajuda-profissional-titulo">
            AJUDA <span className="ajuda-profissional-gradient">PROFISSIONAL</span>
          </h2>
          <p className="ajuda-profissional-descricao">
            Receba orientação especializada focada em suas necessidades visuais. Nossos profissionais avaliam sua saúde ocular,
            respondem dúvidas e oferecem orientações práticas. Você também recebe recomendações sobre cuidados e exames,
            garantindo um atendimento eficiente e acolhedor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AjudaProfissionalSection;
