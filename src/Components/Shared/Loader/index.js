import React from "react";
import styles from "./loader.module.css";

function loader() {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
}

export default loader;
