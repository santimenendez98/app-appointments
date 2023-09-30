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
      <table>
        <tr>
          <th>Name</th>
        </tr>
        <tr>
          <td>{name}</td>
        </tr>
      </table>
    </div>
  );
}

export default cards;
