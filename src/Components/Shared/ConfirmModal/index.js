import React from "react";
import styles from "./confirmModal.module.css";

function confirmModal({ actionDelete, actionCancel, title }) {
  return (
    <div className={styles.container}>
      <div className={styles.confirmModalContainer}>
        <div className={styles.imageDelete}>
          <img src="Icons8_flat_delete_generic.svg" alt=""></img>
        </div>
        <div className={styles.bodyConfirmModal}>
          <div className={styles.title}>
            <h2>{title}</h2>
          </div>
          <div className={styles.description}>
            <p>Are you sure?</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <div>
            <button className={styles.cancelButton} onClick={actionCancel}>
              Cancel
            </button>
          </div>
          <div>
            <button className={styles.confirmButton} onClick={actionDelete}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default confirmModal;
