import React from 'react';
import style from './Modal.module.css';

interface ModalProps {
  title: string;
  src: string;
  children: React.ReactNode;  
  boxHeight: string;
}
  
const Modal: React.FC<ModalProps> = ({ title, src, children, boxHeight }) => {
  return (
    <div className={style.modalWrapper}>
      <div className={style.modalContainer}>
        <div className={style.leftSection}>
          <img src={src} alt="login-banner" />
        </div>
        <div className={style.rightSection}>
          <div className={style.modalContent} style={{height:`${boxHeight}`}}>
            <h2>{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
  