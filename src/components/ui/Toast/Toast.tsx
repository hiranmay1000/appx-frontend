import React from "react";
import styles from './Toast.module.css'; // Or your own styles
import { useToast } from "../../../context/ToastContext";

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
