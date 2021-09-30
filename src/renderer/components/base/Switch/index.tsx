/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import styles from './index.module.css';

interface SwitchBoxProps {
  name: string;
  label: string;
}

const SwitchBox: React.FC<SwitchBoxProps> = ({ name, label }) => {
  return (
    <div className="switch d-flex align-items-center">
      <div className={styles.switch__body}>
        <input
          id={name}
          type="checkbox"
          className={`${styles.checkbox} d-none`}
        />
        <label className={styles.switchbox} htmlFor={name} />
      </div>
      <div className={styles.switch__label}>{label}</div>
    </div>
  );
};

export default SwitchBox;
