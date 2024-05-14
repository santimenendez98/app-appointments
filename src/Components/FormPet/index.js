import React, { useState } from "react";
import styles from "./formPet.module.css";
import FormField from "../Shared/Input";
import { joiResolver } from "@hookform/resolvers/joi";
import pet from "../../Validations/pet";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPet, getPet } from "../../Redux/Pet/thunk";
import {
  editAppointment,
  getAppointment,
} from "../../Redux/Appointment/thunks";

function FormPet({ actionCancel, id, showToastModal, setMessageModal }) {
  const [petData, setPetData] = useState({});
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(pet),
  });
  const appointments = useSelector((state) => state.appointment.data);
  const petsAppointment = appointments.find(
    (appointment) => appointment._id === id
  );
  const token = localStorage.getItem("token");

  const handleInputChange = (name, value) => {
    setPetData({ ...petData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const petResponse = await dispatch(createPet(petData, token));
      const newPetId = {
        pet: [...petsAppointment.pet, { _id: petResponse.data._id }],
      };

      await dispatch(editAppointment(id, newPetId, token));

      dispatch(getPet(token));
      dispatch(getAppointment(token));
      actionCancel();
      setMessageModal("Pet Created Success");
      showToastModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <h2>ADD PET</h2>
        </div>
        <div className="overflow-y-scroll overflow-x-hidden flex flex-col items-center w-full pt-10">
          <div className="lg:columns-2 sm:columns-1 pl-5 pr-5">
            <div>
              <FormField
                label="Kind"
                placeholder="Enter Kind"
                type="select"
                name="kind"
                error={errors.kind?.message}
                register={register}
                useBlur={true}
                onBlur={(e) => {
                  handleInputChange("kind", e);
                }}
              />
              <FormField
                label="Breed"
                placeholder="Enter Breed"
                type="text"
                name="breed"
                error={errors.breed?.message}
                register={register}
                useBlur={true}
                onBlur={(e) => {
                  handleInputChange("breed", e);
                }}
              />
              <FormField
                label="Pet Name"
                placeholder="Enter Pet Name"
                type="text"
                name="petName"
                error={errors.petName?.message}
                register={register}
                useBlur={true}
                onBlur={(e) => {
                  handleInputChange("petName", e);
                }}
              />
            </div>
            <div>
              <FormField
                label="Age"
                placeholder="Enter Age"
                type="text"
                name="age"
                error={errors.age?.message}
                register={register}
                useBlur={true}
                onBlur={(e) => {
                  handleInputChange("age", e);
                }}
              />
              <FormField
                label="Sex"
                type="select"
                name="sex"
                error={errors.sex?.message}
                register={register}
                useBlur={true}
                onBlur={(e) => {
                  handleInputChange("sex", e);
                }}
              />
              <FormField
                label="Color"
                placeholder="Enter Color"
                type="text"
                name="color"
                error={errors.color?.message}
                register={register}
                useBlur={true}
                onBlur={(e) => {
                  handleInputChange("color", e);
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
                onClick={actionCancel ? actionCancel : undefined}
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

export default FormPet;
