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

  const handleInputChange = (name, value) => {
    setPetData({ ...petData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const petResponse = await dispatch(createPet(petData));
      const newPetId = {
        pet: [...petsAppointment.pet, { _id: petResponse.data._id }],
      };

      await dispatch(editAppointment(id, newPetId));

      dispatch(getPet());
      dispatch(getAppointment());
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
          <div>
            <h2>ADD PET</h2>
          </div>
        </div>
        <div className="overflow-y-scroll overflow-x-hidden flex flex-col items-center w-full pt-10">
          <div className="lg:columns-2 sm:columns-1 pl-5 pr-5">
            <div>
              <FormField
                label="Kind"
                placeholder="Enter Kind"
                type="text"
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
          <div className={styles.subTitles}>
            <h3>PET HISTORY</h3>
          </div>
          <div className="flex justify-center mt-4">
            <FormField
              type="textarea"
              name="history"
              error={errors.history?.message}
              register={register}
              onBlur={(e) => {
                handleInputChange("history", e);
              }}
              useBlur={true}
            />
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
