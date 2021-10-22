/* eslint-disable react/prop-types */
import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  label: string;
  variant: string;
  type?: string;
  attrs?: React.HTMLAttributes<HTMLButtonElement>;
  onClick?: any;
  disabled?: any;
  className: string;
}

enum buttonClassNames {
  success = styles.btnSuccess,
  danger = styles.btnDanger,
  check = styles.btnCheck,
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  type,
  attrs,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      className={`${styles.btn} ${disabled ? styles.btnDisabled : ''} ${
        buttonClassNames[variant]
      } ${className}`}
      type={type}
      onClick={onClick}
      // disabled={disabled}
      // {...attrs}
    >
      {label}
    </button>
  );
};

export default Button;
