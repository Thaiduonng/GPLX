import React from 'react';
import styles from './AppInput.module.css';

export interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  helperText,
  icon,
  required,
  className = '',
  id,
  ...rest
}) => {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.iconWrapper}>{icon}</span>}
        <input
          id={inputId}
          className={`
            ${styles.input}
            ${error ? styles.hasError : ''}
            ${icon ? styles.hasIcon : ''}
          `}
          required={required}
          {...rest}
        />
      </div>
      {error ? (
        <span className={styles.errorMessage}>{error}</span>
      ) : helperText ? (
        <span className={styles.helperText}>{helperText}</span>
      ) : null}
    </div>
  );
};
