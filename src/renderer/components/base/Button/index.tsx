/* eslint-disable react/prop-types */
import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  label: string;
  variant: string;
  attrs?: React.HTMLAttributes<HTMLButtonElement>;
}

enum buttonClassNames {
  success = styles.btnSuccess,
  danger = styles.btnDanger,
  check = styles.btnCheck,
}

const Button: React.FC<ButtonProps> = ({ label, variant }) => {
  return (
    <button
      className={`${styles.btn} ${buttonClassNames[variant]}`}
      type="button"
    >
      {label}
    </button>
  );
};

export default Button;
