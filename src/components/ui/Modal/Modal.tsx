import React from 'react';
import style from './Modal.module.css';

interface ModalProps {
  title: string;
  src: string;
  children: React.ReactNode;  
  boxHeight: string;
  alt?: string | 'image-preview';
}
  
const Modal: React.FC<ModalProps> = ({ title, src, children, boxHeight, alt }) => {
  return (
    <div className={style.modalWrapper}>
      <div className={style.modalContainer}>
        <div className={style.leftSection}>
          <img src={src} alt={alt} />
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
  