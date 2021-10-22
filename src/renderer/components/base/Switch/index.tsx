/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { SetStateAction } from 'react';
import styles from './index.module.css';

interface SwitchBoxProps {
  name: string;
  label: string;
  disabled?: boolean;
  isChecked: boolean;
  setChecked: React.Dispatch<SetStateAction<boolean>>;
}

const SwitchBox: React.FC<SwitchBoxProps> = ({
  name,
  label,
  disabled,
  isChecked,
  setChecked,
}) => {
  return (
    <div
      className={`${styles.switch} ${
        disabled ? styles.switchDisabled : ''
      } d-flex align-items-center`}
    >
      <div className={styles.switch__body}>
        <input
          id={name}
          type="checkbox"
          className={`${styles.checkbox} d-none`}
          onChange={setChecked}
          checked={isChecked}
        />
        <label className={styles.switchbox} htmlFor={name} />
      </div>
      <div className={styles.switch__label}>{label}</div>
    </div>
  );
};

export default SwitchBox;
