import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  background?: string;
  type?: 'button' | 'submit' | 'reset';
  outline?: {
    isBorder: boolean;
    color: string;
  };
  color?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  background,
  type = 'submit',
  outline = { isBorder: false, color: '#0c5769' },
  color
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background, 
        color: outline?.isBorder ? outline.color : 'white',
        border: outline?.isBorder ? `2px solid ${outline.color}` : 'none'
      }}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default Button;
