import React from "react";
import styles from "./confirmModal.module.css";

function confirmModal({ actionDelete, actionCancel }) {
  return (
    <div className={styles.container}>
      <div className={styles.confirmModalContainer}>
        <div>
          <div className={styles.title}>
            <h2>Delete Appointment</h2>
          </div>
        </div>
        <div>
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
