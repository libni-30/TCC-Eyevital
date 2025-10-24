import React, { useState } from 'react';
import QuickTestModal from './QuickTestModal';

interface EstrabismoSectionProps {
  onImageError?: (img: HTMLImageElement) => void;
}

const EstrabismoSection: React.FC<EstrabismoSectionProps> = ({ onImageError }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (onImageError) onImageError(e.currentTarget);
  };

  const [open, setOpen] = useState(false)

  return (
    <section id="estrabismo" className="estrabismo-section" aria-labelledby="estrabismo-titulo">
      <div className="estrabismo-container">
        <div className="estrabismo-texto">
          <div className="estrabismo-label" aria-hidden="true">
            <span className="estrabismo-label-line" />
            <span className="estrabismo-label-text">TESTE RÁPIDO</span>
          </div>
          <h2 id="estrabismo-titulo" className="estrabismo-titulo">Você consegue responder?</h2>
          <p className="estrabismo-descricao">Os termos apresentados se referem a qual condição ocular?</p>
          <div className="estrabismo-cta">
            <button type="button" className="estrabismo-btn" onClick={() => setOpen(true)}>
              <span className="estrabismo-btn-text">Envie sua resposta</span>
              <span className="estrabismo-btn-icon" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <figure className="estrabismo-figura" aria-label="Ilustração de tipos de estrabismo">
          <img
            src="IMAGENS/tipos de estrabismo-img.jpg"
            alt="Ilustração comparativa de tipos de estrabismo"
            loading="lazy"
            onError={handleError}
          />
          <div className="estrabismo-decor-circle" aria-hidden="true" />
          <div className="estrabismo-decor-dot" aria-hidden="true" />
        </figure>
      </div>
  <QuickTestModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default EstrabismoSection;
