import { useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' && '✓'}
          {type === 'info' && 'ℹ'}
          {type === 'warning' && '⚠'}
          {type === 'error' && '✕'}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Fechar">
        ×
      </button>
    </div>
  );
}
