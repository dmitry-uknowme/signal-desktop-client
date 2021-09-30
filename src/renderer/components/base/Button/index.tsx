/* eslint-disable react/prop-types */
import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  label: string;
  variant: string;
  attrs?: React.HTMLAttributes<HTMLButtonElement>;
}

// enum buttonClassNames {
//   light = styles.btnLight,
//   dark = styles.btnDark,
// }

enum buttonClassNames {
  success = styles.btnSuccess,
  danger = styles.btnDanger,
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
