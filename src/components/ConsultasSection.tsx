import React from 'react';

interface ConsultasSectionProps {
  onImageError?: (img: HTMLImageElement) => void;
}

const ConsultasSection: React.FC<ConsultasSectionProps> = ({ onImageError }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (onImageError) onImageError(e.currentTarget);
  };

  return (
    <section id="consultas" className="consultas-section" aria-labelledby="consultas-titulo">
      <div className="consultas-container">
        {/* Coluna esquerda: imagem comparativa */}
        <div className="consultas-imagem-wrapper" aria-hidden="true">
          <img
            src="IMAGENS/visao-astigma.jpg"
            alt="Comparação: visão sem e com astigmatismo"
            loading="lazy"
            onError={handleError}
          />
          <div className="consultas-decor-circle" />
          <div className="consultas-decor-ring" />
        </div>

        {/* Coluna direita: texto */}
        <div className="consultas-texto">
          <h2 id="consultas-titulo" className="consultas-titulo">
            CONSULTAS <span className="consultas-gradient">ONLINE</span>
          </h2>
          <p className="consultas-descricao">
            Nossas consultas são personalizadas, focadas em suas necessidades visuais. O especialista avalia sua saúde ocular,
            responde dúvidas e oferece orientações práticas. Você também recebe recomendações sobre cuidados e exames,
            garantindo um atendimento eficiente e acolhedor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsultasSection;
