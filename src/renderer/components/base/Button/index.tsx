/* eslint-disable react/prop-types */
import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  label: string;
  variant: string;
  attrs?: React.HTMLAttributes<HTMLButtonElement>;
  onClick?: any;
  disabled?: any;
}

enum buttonClassNames {
  success = styles.btnSuccess,
  danger = styles.btnDanger,
  check = styles.btnCheck,
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  attrs,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`${styles.btn} ${disabled ? styles.btnDisabled : ''} ${
        buttonClassNames[variant]
      }`}
      type="button"
      onClick={onClick}
      // disabled={disabled}
      // {...attrs}
    >
      {label}
    </button>
  );
};

export default Button;
