import React from "react";
import styles from "./cards.module.css";

function cards({
  name,
  lastName,
  clientID,
  address,
  phone,
  paidMonth,
  actionView,
  actionDelete,
  date,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.titleName}>
          <h3>Client ID: {clientID}</h3>
        </div>
        <div className={styles.title}>
          <div>
            <h2>
              {name} {lastName}
            </h2>
          </div>
        </div>
        <div className={styles.personalDataContainer}>
          <div className={`${styles.addressContent} ${styles.personalData}`}>
            <p className={styles.dataName}>Address:</p>
            <p>{address}</p>
          </div>
          <div className={styles.personalData}>
            <p className={styles.dataName}>Phone:</p>
            <p>{phone}</p>
          </div>
          {paidMonth === "No Client" ? (
            <div className={styles.personalData}>
              <p className={styles.dataName}>Last Date:</p>
              <p>{date}</p>
            </div>
          ) : (
            <div className={styles.personalData}>
              <p className={styles.dataName}>Last Paid Month:</p>
              <p>{paidMonth}</p>
            </div>
          )}
        </div>
        <div className={styles.button}>
          <button
            onClick={actionView ? actionView : undefined}
            className={styles.buttonView}
          >
            View
          </button>
          <button
            onClick={actionDelete ? actionDelete : undefined}
            className={styles.buttonDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default cards;
