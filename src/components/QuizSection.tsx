import React from 'react';

interface QuizSectionProps {
  onImageError?: (img: HTMLImageElement) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onImageError }) => {
  const handleImageError = (img: HTMLImageElement): void => {
    if (onImageError) {
      onImageError(img);
    } else {
      img.onerror = null;
      img.src = 'assets/images/placeholder.png';
    }
  };

  return (
    <section className="quiz-section" aria-labelledby="quiz-titulo">
      <div className="quiz-container">
        {/* Coluna esquerda - Card do quiz */}
        <div className="quiz-card-wrapper">
          <div className="quiz-card" aria-label="Exemplo de questão de quiz">
            <div className="quiz-card-badge">Questão 1</div>
            <h3 className="quiz-card-pergunta">O que pode ser feito para tratar o astigmatismo?</h3>
            <div className="quiz-card-imagem">
              <img 
                src="IMAGENS/quiz-section.png" 
                alt="Comparação visão sem e com astigmatismo" 
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'IMAGENS/desenho-visao.jpeg';
                  handleImageError(e.currentTarget);
                }}
              />
            </div>
            <div className="quiz-card-status" role="status">
              <div className="quiz-status-icone" aria-hidden="true">✈️</div>
              <span>Sua resposta foi enviada com sucesso!</span>
            </div>
            {/* Ícones de acerto/erro decorativos */}
            <div className="quiz-icones-validacao" aria-hidden="true">
              <div className="icone-erro">✕</div>
              <div className="icone-acerto">✓</div>
            </div>
          </div>
          {/* Bolinhas decorativas ao redor do card */}
          <div className="quiz-decor quiz-decor-a" aria-hidden="true"></div>
          <div className="quiz-decor quiz-decor-b" aria-hidden="true"></div>
          <div className="quiz-decor quiz-decor-c" aria-hidden="true"></div>
          <div className="quiz-decor quiz-decor-d" aria-hidden="true"></div>
          <div className="quiz-decor quiz-decor-e" aria-hidden="true"></div>
        </div>

        {/* Coluna direita - Texto */}
        <div className="quiz-texto">
          <h2 id="quiz-titulo" className="quiz-titulo">
            <span className="highlight-green">TESTE SEU</span> CONHECIMENTO
          </h2>
          <p className="quiz-descricao">
            Na seção Quizzes, você vai se divertir enquanto aprende sobre saúde ocular! Explore desafios respondendo quizzes interativos que tornam o aprendizado leve e prazeroso. É uma maneira divertida de entender melhor como cuidar da sua visão, com muita interação e entretenimento!
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
