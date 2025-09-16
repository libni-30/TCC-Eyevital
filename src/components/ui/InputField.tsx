import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rightIcon
}) => {
  const hasError = !!error;

  return (
    <div className="space-y-2">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-lg border text-sm placeholder-gray-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/20
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${hasError 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-border focus:border-primary'
            }
            ${rightIcon ? 'pr-10' : ''}
          `}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      
      {hasError && (
        <p 
          id={`${name}-error`}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
