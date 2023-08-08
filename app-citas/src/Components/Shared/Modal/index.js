import React, { useState, useEffect } from "react";
import styles from "./modal.module.css";

function Modal({ message, close }) {
  const [showClosing, setShowClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowClosing(true);
      const closeTimer = setTimeout(() => {
        close();
      }, 300);

      return () => {
        clearTimeout(closeTimer);
      };
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [close]);

  return (
    <div>
      <div className={`${styles.container} ${showClosing && styles.closing}`}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Modal;
