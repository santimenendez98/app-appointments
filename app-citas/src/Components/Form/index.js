import React from "react";
import { useSelector } from "react-redux";
import styles from "./form.module.css";
import {
  editAppointment,
  createAppointment,
  getAppointment,
} from "../../Redux/Appointment/thunks";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Loader from "../Shared/Loader";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import appointmentSchema from "../../Validations/appointments";
import FormField from "../Shared/Input";

function Form({ id, close, resetId, setMessageModal, showToastModal }) {
  const dispatch = useDispatch();
  const appointment = useSelector((state) => state.appointment.data);
  const error = useSelector((state) => state.appointment.error);
  const isPending = useSelector((state) => state.appointment.isPending);

  const appointmentToEdit = appointment.filter((data) => data._id === id);
  const [valueAppointment, setValueAppointment] = useState({
    isClient: appointmentToEdit[0]?.isClient || false,
    clientID: appointmentToEdit[0]?.clientID || "No Client",
    paidMonth: appointmentToEdit[0]?.paidMonth || "null",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(appointmentSchema),
    defaultValues: {
      name: appointment ? appointmentToEdit[0]?.name : "",
      lastName: appointment ? appointmentToEdit[0]?.lastName : "",
      address: appointment ? appointmentToEdit[0]?.address : "",
      phone: appointment
        ? appointmentToEdit[0]?.phone
          ? appointmentToEdit[0].phone.toString()
          : ""
        : "",
      clientID: appointment ? appointmentToEdit[0]?.clientID : "",
      date: appointment ? isoToNormalDate(appointmentToEdit[0]?.date) : "",
      paidMonth: appointment ? appointmentToEdit[0]?.paidMonth : "",
      kind: appointment ? appointmentToEdit[0]?.kind : "",
      breed: appointment ? appointmentToEdit[0]?.breed : "",
      petName: appointment ? appointmentToEdit[0]?.petName : "",
      age: appointment ? appointmentToEdit[0]?.age : "",
      sex: appointment ? appointmentToEdit[0]?.sex : "",
      color: appointment ? appointmentToEdit[0]?.color : "",
      history: appointment ? appointmentToEdit[0]?.history : "",
      isClient: appointment ? appointmentToEdit[0]?.isClient : "",
    },
  });

  function isoToNormalDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function normalDateToIso(iso) {
    const date = new Date(iso);
    const isoDate = date.toISOString();
    return isoDate;
  }
  const handlerEdit = () => {
    if (!error) {
      dispatch(editAppointment(appointmentToEdit[0]._id, valueAppointment))
        .then(() => {
          dispatch(getAppointment());
          setMessageModal("Appointment Edited Success");
          showToastModal(true);
          close();
          resetId();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function handleInputChange(fieldName, value) {
    if (fieldName === "isClient") {
      const isClientValue = !valueAppointment.isClient;

      const updatedValues = {
        ...valueAppointment,
        isClient: isClientValue,
      };

      if (isClientValue && appointmentToEdit[0]) {
        updatedValues.clientID = appointmentToEdit[0].clientID;
        updatedValues.paidMonth = appointmentToEdit[0].paidMonth;
      } else {
        updatedValues.clientID = "No Client";
        updatedValues.paidMonth = "null";
      }

      setValueAppointment(updatedValues);
    } else {
      setValueAppointment({
        ...valueAppointment,
        [fieldName]: value,
      });
    }
  }

  const handleCreate = () => {
    dispatch(createAppointment(valueAppointment))
      .then(() => {
        dispatch(getAppointment());
        setMessageModal("Appointment Created Success");
        showToastModal(true);
        close();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isPending) {
    return (
      <>
        <Loader />
      </>
    );
  }

  console.log(valueAppointment);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <div>
            {id ? <h2>EDIT APPOINTMENT</h2> : <h2>CREATE APPOINTMENT</h2>}
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.subTitles}>
            <h3>USER INFORMATION</h3>
          </div>
          <form>
            {id ? (
              <div className={styles.inputContainerUser}>
                <FormField
                  label="Name"
                  type="text"
                  error={errors.name?.message}
                  name="name"
                  register={register}
                  useBlur={true}
                  onBlur={(e) => handleInputChange("name", e)}
                />
                <FormField
                  label="Last Name"
                  type="text"
                  error={errors.lastName?.message}
                  name="lastName"
                  register={register}
                  useBlur={true}
                  onBlur={(e) => handleInputChange("lastName", e)}
                />
                <FormField
                  label="Address"
                  type="text"
                  error={errors.address?.message}
                  name="address"
                  register={register}
                  useBlur={true}
                  onBlur={(e) => handleInputChange("address", e)}
                />
                <FormField
                  label="Phone"
                  type="number"
                  error={errors.phone?.message}
                  name="phone"
                  register={register}
                  useBlur={true}
                  onBlur={(e) => handleInputChange("phone", e)}
                />
              </div>
            ) : (
              <div className={styles.inputContainerUser}>
                <FormField
                  label="Name"
                  placeholder="Enter Name"
                  type="text"
                  error={errors.name?.message}
                  name="name"
                  register={register}
                  useBlur={true}
                  onBlur={(e) => handleInputChange("name", e)}
                />
                <FormField
                  label="Last Name"
                  placeholder="Enter Last Name"
                  type="text"
                  error={errors.lastName?.message}
                  name="lastName"
                  register={register}
                  useBlur={true}
                  onBlur={(e) => handleInputChange("lastName", e)}
                />
                <FormField
                  label="Address"
                  placeholder="Enter Address"
                  type="text"
                  error={errors.address?.message}
                  name="address"
                  register={register}
                  useBlur={true}
                  onBlur={(e) => handleInputChange("address", e)}
                />
                <FormField
                  label="Phone"
                  placeholder="Enter Phone"
                  type="number"
                  error={errors.phone?.message}
                  name="phone"
                  register={register}
                  useBlur={true}
                  onBlur={(e) => handleInputChange("phone", e)}
                />
              </div>
            )}
            <div className={styles.subTitles}>
              <h3>PAID INFORMATION</h3>
            </div>
            {id ? (
              <div className={styles.inputContainerPaid}>
                <FormField
                  label="Is Client?"
                  type="checkbox"
                  error={errors.isClient?.message}
                  name="isClient"
                  register={register}
                  onChange={(e) => handleInputChange("isClient", e)}
                  useBlur={false}
                />
                <FormField
                  label="Client ID"
                  type="number"
                  error={errors.clientID?.message}
                  name="clientID"
                  register={register}
                  onBlur={(e) => handleInputChange("clientID", e)}
                  useBlur={true}
                  disabled={!valueAppointment.isClient}
                  style={!valueAppointment.isClient && styles.inputDisabled}
                />
                <FormField
                  label="Date"
                  placeholder="Enter Date"
                  type="date"
                  error={errors.date?.message}
                  name="date"
                  register={register}
                  onBlur={(e) => handleInputChange("date", normalDateToIso(e))}
                  useBlur={true}
                />
                <div className={styles.input}>
                  <label>Last Paid Month: </label>
                  <select
                    type="text"
                    {...register("paidMonth")}
                    onBlur={(e) =>
                      setValueAppointment({
                        ...valueAppointment,
                        paidMonth: e.target.value,
                      })
                    }
                    disabled={!valueAppointment.isClient}
                    className={
                      !valueAppointment.isClient && styles.inputDisabled
                    }
                  >
                    <option disabled value="null">
                      Choose an option
                    </option>
                    <option>Jenuary</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>Jun</option>
                    <option>July</option>
                    <option>Agost</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                  {errors && errors.paidMonth ? (
                    <span className={styles.error}>
                      {errors.paidMonth?.message}
                    </span>
                  ) : (
                    "\u00A0"
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.inputContainerPaid}>
                <FormField
                  label="Is Client?"
                  type="checkbox"
                  name="isClient"
                  register={register}
                  onChange={(e) => handleInputChange("isClient", e)}
                />
                <FormField
                  label="Client ID"
                  placeholder="Enter Client ID"
                  type="number"
                  error={errors.clientID?.message}
                  name="clientID"
                  register={register}
                  useBlur={true}
                  onBlur={(e) => handleInputChange("clientID", e)}
                  disabled={!valueAppointment.isClient}
                  style={!valueAppointment.isClient && styles.inputDisabled}
                />
                <FormField
                  label="Date"
                  placeholder="Enter Date"
                  type="date"
                  error={errors.date?.message}
                  name="date"
                  register={register}
                  onBlur={(e) => handleInputChange("date", e)}
                  useBlur={true}
                />
                <div className={styles.input}>
                  <label>Paid Month: </label>
                  <select
                    type="text"
                    placeholder="Enter Paid Month"
                    {...register("paidMonth")}
                    onChange={(e) =>
                      setValueAppointment({
                        ...valueAppointment,
                        paidMonth: e.target.value,
                      })
                    }
                    disabled={!valueAppointment.isClient}
                    className={
                      !valueAppointment.isClient && styles.inputDisabled
                    }
                  >
                    <option>Choose an option</option>
                    <option value="Jenuary">Jenuary</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="Jun">Jun</option>
                    <option value="July">July</option>
                    <option value="Agost">Agost</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  {errors && errors.paidMonth ? (
                    <span className={styles.error}>
                      {errors.paidMonth?.message}
                    </span>
                  ) : (
                    "\u00A0"
                  )}
                </div>
              </div>
            )}
            <div className={styles.subTitles}>
              <h3>PET INFORMATION</h3>
            </div>
            {id ? (
              <div className={styles.inputContainerPet}>
                <div>
                  <FormField
                    label="Kind"
                    type="text"
                    error={errors.kind?.message}
                    name="kind"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("kind", e)}
                  />
                  <FormField
                    label="Breed"
                    type="text"
                    error={errors.breed?.message}
                    name="breed"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("breed", e)}
                  />
                  <FormField
                    label="Pet Name"
                    type="text"
                    error={errors.petName?.message}
                    name="petName"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("petName", e)}
                  />
                </div>
                <div>
                  <FormField
                    label="Age"
                    type="text"
                    error={errors.age?.message}
                    name="age"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("age", e)}
                  />
                  <div className={styles.input}>
                    <label>Sex: </label>
                    <select
                      type="text"
                      {...register("sex")}
                      onBlur={(e) =>
                        setValueAppointment({
                          ...valueAppointment,
                          sex: e.target.value,
                        })
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    {errors && errors.sex ? (
                      <span className={styles.error}>
                        {errors.sex?.message}
                      </span>
                    ) : (
                      "\u00A0"
                    )}
                  </div>
                  {console.log(valueAppointment)}
                  <FormField
                    label="Color"
                    type="text"
                    error={errors.color?.message}
                    name="color"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("color", e)}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.inputContainerPet}>
                <div>
                  <FormField
                    label="Kind"
                    placeholder="Enter Kind"
                    type="text"
                    error={errors.kind?.message}
                    name="kind"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("kind", e)}
                  />
                  <FormField
                    label="Breed"
                    placeholder="Enter Breed"
                    type="text"
                    error={errors.breed?.message}
                    name="breed"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("breed", e)}
                  />
                  <FormField
                    label="Pet Name"
                    placeholder="Enter Pet Name"
                    type="text"
                    error={errors.petName?.message}
                    name="petName"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("petName", e)}
                  />
                </div>
                <div>
                  <FormField
                    label="Age"
                    placeholder="Enter Age"
                    type="text"
                    error={errors.age?.message}
                    name="age"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("age", e)}
                  />
                  <div className={styles.input}>
                    <label>Sex: </label>
                    <select
                      type="text"
                      {...register("sex")}
                      onBlur={(e) =>
                        setValueAppointment({
                          ...valueAppointment,
                          sex: e.target.value,
                        })
                      }
                      defaultValue={valueAppointment.paidMonth || ""}
                    >
                      <option disabled value="">
                        Choose an option
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    {errors && errors.sex ? (
                      <span className={styles.error}>
                        {errors.sex?.message}
                      </span>
                    ) : (
                      "\u00A0"
                    )}
                  </div>
                  <FormField
                    label="Color"
                    placeholder="Enter Color"
                    type="text"
                    error={errors.color?.message}
                    name="color"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("color", e)}
                  />
                </div>
              </div>
            )}
            <div className={styles.subTitles}>
              <h3>PET HISTORY</h3>
            </div>
            {id ? (
              <div className={styles.inputContainerHistory}>
                <FormField
                  type="textarea"
                  error={errors.history?.message}
                  name="history"
                  register={register}
                  onBlur={(e) => handleInputChange("history", e)}
                  useBlur={true}
                />
              </div>
            ) : (
              <div className={styles.inputContainerHistory}>
                <FormField
                  placeholder="Enter History"
                  type="textarea"
                  error={errors.history?.message}
                  name="history"
                  register={register}
                  onBlur={(e) => handleInputChange("history", e)}
                  useBlur={true}
                />
              </div>
            )}
          </form>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <div>
              <button className={styles.cancelButton} onClick={close}>
                Cancel
              </button>
            </div>
            <div>
              <button
                className={styles.editButton}
                onClick={
                  id ? handleSubmit(handlerEdit) : handleSubmit(handleCreate)
                }
              >
                {id ? "Edit" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
