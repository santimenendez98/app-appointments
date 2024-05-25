import React, { useState } from "react";
import styles from "./userForm.module.css";
import FormField from "../Shared/Input";
import { useForm } from "react-hook-form";
import user from "../../Validations/user";
import { joiResolver } from "@hookform/resolvers/joi";
import { putUser } from "../../Redux/User/thunk";
import { useDispatch } from "react-redux";
import Modal from "../Shared/Modal";

function UserForm({ id, showToastModal, setMessageModal, close }) {
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: {errors}
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(user)
  });

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleCreate = () => {
    dispatch(putUser(userData))
    setShowModal(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.subTitle}>
          <h3>ADD USER</h3>
        </div>
        <div className="flex flex-col items-center w-full p-10">
          <div className="flex login-img:flex-col pl-5 pr-5">
            <div>
              <FormField
                label="Name"
                placeholder="Enter Name"
                type="text"
                name="name"
                useBlur={true}
                register={register}
                error={errors.name?.message}
                onBlur={(e) => {
                  handleInputChange("name", e);
                }}
              />
              <FormField
                label="Last Name"
                placeholder="Enter Last Name"
                type="text"
                name="lastName"
                useBlur={true}
                register={register}
                error={errors.lastName?.message}
                onBlur={(e) => {
                  handleInputChange("lastName", e);
                }}
              />
              <FormField
                label="DNI"
                placeholder="Enter DNI"
                type="text"
                name="dni"
                useBlur={true}
                register={register}
                error={errors.dni?.message}
                onBlur={(e) => {
                  handleInputChange("dni", Number(e));
                }}
              />
            </div>
            <div>
              <FormField
                label="Email"
                placeholder="Enter Email"
                type="text"
                name="email"
                useBlur={true}
                register={register}
                error={errors.email?.message}
                onBlur={(e) => {
                  handleInputChange("email", e);
                }}
              />
              <FormField
                label="Password"
                placeholder="Enter Password"
                type="password"
                name="password"
                useBlur={true}
                register={register}
                error={errors.password?.message}
                onBlur={(e) => {
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
      {showModal && <Modal message={"User created success"} close={close}/>}
    </div>
  );
}

export default UserForm;
