// import styles from "./searchBar.module.css";
import React from "react";
import styles from "./searchBar.module.css";

function searchBar({ name, action }) {
  return (
    <div className={styles.container}>
      <label>{name}</label>
      <input
        type="text"
        placeholder="Search Name, lastName or client ID"
        onChange={action}
      ></input>
    </div>
  );
}

export default searchBar;
