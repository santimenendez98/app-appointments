import React, { useState } from "react";
import styles from "./userForm.module.css";
import FormField from "../Shared/Input";
import { useForm } from "react-hook-form";

function UserForm({ id, showToastModal, setMessageModal, close }) {
  const [userData, setUserData] = useState({});
  const {
    handleSubmit
  } = useForm({
    mode: "onChange",
  });

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleCreate = () => {
    console.log(userData)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.subTitle}>
          <h3>ADD USER</h3>
        </div>
        <div className="overflow-y-scroll overflow-x-hidden flex flex-col items-center w-full p-10">
          <div className="flex login-img:flex-col pl-5 pr-5">
            <div>
              <FormField
                label="Name"
                placeholder="Enter Name"
                type="text"
                name="name"
                useBlur={false}
                onChange={(e) => {
                  handleInputChange("name", e);
                }}
              />
              <FormField
                label="Last Name"
                placeholder="Enter Last Name"
                type="text"
                name="lastName"
                useBlur={false}
                onChange={(e) => {
                  handleInputChange("lastName", e);
                }}
              />
              <FormField
                label="DNI"
                placeholder="Enter DNI"
                type="text"
                name="dni"
                useBlur={false}
                onChange={(e) => {
                  handleInputChange("dni", e);
                }}
              />
            </div>
            <div>
              <FormField
                label="Email"
                placeholder="Enter Email"
                type="text"
                name="email"
                useBlur={false}
                onChange={(e) => {
                  handleInputChange("email", e);
                }}
              />
              <FormField
                label="Password"
                type="password"
                name="password"
                useBlur={false}
                onChange={(e) => {
                  handleInputChange("password", e);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <div>
              <button
                className={styles.cancelButton}
                onClick={close}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className={styles.editButton}
                onClick={handleSubmit(handleCreate)}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
