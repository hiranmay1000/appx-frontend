import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  message?: string | "";
  color?: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message: incomingMessage, color = 'red', duration = 5000 }) => {
  const [message, setMessage] = useState<string | "">("");
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!incomingMessage) return;

    // Set internal message
    setMessage(incomingMessage);
    setVisible(true);
    setFadeOut(false);

    const fadeTimer = setTimeout(() => setFadeOut(true), duration - 250);
    const removeTimer = setTimeout(() => {
      setFadeOut(false);
      setVisible(false);
      setMessage("");
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [incomingMessage, duration]);

  if (!visible || !message) return null;

  return (
    <div
      className={`${styles.toast} ${fadeOut ? styles.fadeOut : ''}`}
      style={{ backgroundColor: color }}
    >
      {message}
    </div>
  );
};

export default Toast;
