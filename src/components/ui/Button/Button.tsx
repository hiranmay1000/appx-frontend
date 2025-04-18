import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  background?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  background,
  type = 'submit', // default
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ background }}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default Button;
