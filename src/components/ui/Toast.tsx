import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${typeStyles[type]}`}>
      <span className="text-lg">{icons[type]}</span>
      <span>{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-lg hover:opacity-70 transition-opacity"
        aria-label="Fechar"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
