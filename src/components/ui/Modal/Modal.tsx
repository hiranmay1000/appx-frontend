import React, { useEffect, useState } from 'react';
import style from './Modal.module.css';

interface ModalProps {
  title: string;
  src: string;
  children: React.ReactNode;  
  alt?: string | 'image-preview';
  outline?: boolean;
}
  
const Modal: React.FC<ModalProps> = ({ title, src, children, alt, outline }) => {
  const [border, setBorder] = useState<string>('')

  useEffect(() => {
    if(outline) {
      setBorder('3px solid #004966');
    }
  }, [outline])
  return (
    <div className={style.modalWrapper}>
      <div className={style.modalContainer} style={{border:`${border}`}}>
        <div className={style.leftSection}>
          <img src={src} alt={alt} />
        </div>
        <div className={style.rightSection}>
          <div className={style.modalContent}>
            <h2>{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
  