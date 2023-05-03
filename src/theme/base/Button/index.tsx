/* eslint-disable react/prop-types */
import React from "react";
import styles from "./index.module.css";

export interface ButtonProps {
  label: string;
  variant: string;
  type?: React.HTMLAttributes<HTMLButtonElement>;
  attrs?: React.HTMLAttributes<HTMLButtonElement>;
  onClick?: any;
  disabled?: boolean;
  className?: string;
}

enum ButtonClassNames {
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
      className={`${styles.btn} ${disabled ? styles.btnDisabled : ""} ${
        ButtonClassNames[variant]
      } ${className}`}
      type={type}
      onClick={() => onClick()}
      // disabled={disabled}
      // {...attrs}
    >
      {label}
    </button>
  );
};

export default Button;
