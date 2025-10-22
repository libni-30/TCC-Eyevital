import React from 'react';
import './AuthModal.css';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, title = 'Acesso restrito', children }) => {
  return (
    <div className={`auth-overlay${open ? ' auth-open' : ''}`} aria-hidden={!open}>
      <div className={`auth-modal${open ? ' auth-modal-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <button className="auth-close" aria-label="Fechar aviso" onClick={onClose}>
          ×
        </button>
        <h3 id="auth-modal-title" className="auth-title">{title}</h3>
        <p className="auth-message">
          {children}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
