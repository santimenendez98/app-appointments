import React from "react";
import { useSelector } from "react-redux";
import styles from "./form.module.css";
import {
  editAppointment,
  createAppointment,
  getAppointment,
} from "../../Redux/Appointment/thunks";
import { createPet, deletePet, editPet, getPet } from "../../Redux/Pet/thunk";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Loader from "../Shared/Loader";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import appointmentSchema from "../../Validations/appointments";
import FormField from "../Shared/Input";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import FormPet from "../FormPet";
import History from "../History";
import ConfirmModal from "../Shared/ConfirmModal";

function Form({
  id,
  close,
  resetId,
  setMessageModal,
  showToastModal,
  showModal,
}) {
  const dispatch = useDispatch();
  const appointment = useSelector((state) => state.appointment.data);
  const error = useSelector((state) => state.appointment.error);
  const isPending = useSelector((state) => state.appointment.isPending);
  const pet = useSelector((state) => state.pet.data);
  const petPending = useSelector((state) => state.pet.isPending);

  const [confirmDeletePet, setConfirmDeletePet] = useState(false);
  const [history, setHistory] = useState(false);

  const appointmentToEdit = appointment.filter((data) => data._id === id);
  const petToEdit = pet.filter(
    (data) => data?._id === appointmentToEdit[0]?.pet[0]?._id
  );
  const [valueAppointment, setValueAppointment] = useState({
    isClient: appointmentToEdit[0]?.isClient || false,
    clientID: appointmentToEdit[0]?.clientID || "No Client",
    paidMonth: appointmentToEdit[0]?.paidMonth || "No Client",
  });
  const [bothPending, setBothPending] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(
    appointmentToEdit[0]?.pet[0]?._id || ""
  );
  const selectPet = appointmentToEdit[0]?.pet?.find(
    (pet) => pet?._id === selectedPetId
  );

  const [valuePet, setValuePet] = useState({});
  const [viewFormAddPet, setViewFormAddPet] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
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
      clientID:
        appointmentToEdit[0]?.clientID === "No Client"
          ? ""
          : appointment
          ? appointmentToEdit[0]?.clientID
          : "",
      date: appointment ? isoToNormalDate(appointmentToEdit[0]?.date) : "",
      paidMonth: appointment ? appointmentToEdit[0]?.paidMonth : "",
      pet: {
        kind: petToEdit ? petToEdit[0]?.kind : "",
        breed: petToEdit ? petToEdit[0]?.breed : "",
        petName: petToEdit ? petToEdit[0]?.petName : "",
        age: petToEdit ? petToEdit[0]?.age : "",
        sex: petToEdit ? petToEdit[0]?.sex : "",
        color: petToEdit ? petToEdit[0]?.color : "",
      },
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

  useEffect(() => {
    setBothPending(isPending && petPending);
  }, [isPending, petPending]);

  const handlerEdit = () => {
    if (!error) {
      dispatch(editPet(selectedPetId, valuePet))
        .then(() => {
          dispatch(
            editAppointment(appointmentToEdit[0]._id, valueAppointment)
          ).then(() => {
            dispatch(getPet());
            dispatch(getAppointment());
            setMessageModal("Appointment Edited Success");
            showToastModal(true);
            close();
            resetId();
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDeletePet = async () => {
    try {
      await dispatch(deletePet(selectedPetId));

      setConfirmDeletePet(false);
      dispatch(getPet());
      dispatch(getAppointment());
      setMessageModal("Pet Deleted Success");
      showToastModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  function handleInputChange(fieldName, value) {
    if (fieldName.startsWith("pet.")) {
      const petFieldName = fieldName.substring(4);
      if (petFieldName === "history") {
        const historyString = JSON.stringify(value);
        setValuePet((prevState) => ({
          ...prevState,
          [petFieldName]: historyString,
        }));
      } else {
        setValuePet((prevState) => ({
          ...prevState,
          [petFieldName]: value,
        }));
      }
    } else if (fieldName === "isClient") {
      const isClientValue = !valueAppointment.isClient;

      if (!isClientValue) {
        if (errors.clientID) {
          clearErrors("clientID");
        }
        if (errors.paidMonth) {
          clearErrors("paidMonth");
        }
      }

      const updatedValues = {
        ...valueAppointment,
        isClient: isClientValue,
        clientID: isClientValue ? value : "No Client",
        paidMonth: isClientValue ? value : "No Client",
      };

      setValueAppointment(updatedValues);
    } else {
      setValueAppointment({
        ...valueAppointment,
        [fieldName]: value,
      });
    }
  }

  const handleCreate = async () => {
    try {
      const petResponse = await dispatch(createPet(valuePet));
      const newPetId = petResponse.data._id;

      const appointmentData = {
        ...valueAppointment,
        pet: [{ _id: newPetId }],
      };

      await dispatch(createAppointment(appointmentData));

      dispatch(getPet());
      dispatch(getAppointment());
      setMessageModal("Appointment Created Success");
      showToastModal(true);
      close();
    } catch (error) {
      console.error(error);
    }
  };

  function selectedPet(value) {
    const selectedPetData = appointmentToEdit[0].pet.find(
      (pet) => pet._id === value
    );

    setSelectedPetId(selectedPetData._id);

    document.getElementsByName("pet.kind")[0].value = selectedPetData.kind;
    document.getElementsByName("pet.breed")[0].value = selectedPetData.breed;
    document.getElementsByName("pet.petName")[0].value =
      selectedPetData.petName;
    document.getElementsByName("pet.color")[0].value = selectedPetData.color;
    document.getElementsByName("pet.sex")[0].value = selectedPetData.sex;

    document.getElementsByName("pet.age")[0].value = selectedPetData.age;
  }

  function handleAddPet() {
    setViewFormAddPet(true);
  }

  if (bothPending) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.dataContainer}>
          <div className={styles.subTitles}>
            <h3>USER INFORMATION</h3>
          </div>
          <form>
            {id ? (
              <div className="flex justify-center mt-4">
                <div className="lg:columns-2 sm:columns-1 border pl-3 pt-3">
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
                    type="text"
                    error={errors.phone?.message}
                    name="phone"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("phone", e)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center mt-4">
                <div className="lg:columns-2 sm:columns-1 border pl-3 pt-3">
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
                    type="text"
                    error={errors.phone?.message}
                    name="phone"
                    register={register}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("phone", e)}
                  />
                </div>
              </div>
            )}
            <div className={styles.subTitles}>
              <h3>PAID INFORMATION</h3>
            </div>
            {id ? (
              <div className="flex justify-center mt-4">
                <div className="lg:columns-2 sm:columns-1 border pl-3 pt-3">
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
                    type="text"
                    error={errors.clientID?.message}
                    name="clientID"
                    register={register}
                    onBlur={(e) => handleInputChange("clientID", e)}
                    placeholder={valueAppointment.clientID || "Enter Client ID"}
                    useBlur={true}
                    disabled={!valueAppointment.isClient}
                    style={!valueAppointment.isClient && styles.inputDisabled}
                  />
                  <FormField
                    label="Date"
                    type="date"
                    error={errors.date?.message}
                    name="date"
                    register={register}
                    onBlur={(e) =>
                      handleInputChange("date", normalDateToIso(e))
                    }
                    useBlur={true}
                  />
                  <FormField
                    label="Paid Month"
                    type="select"
                    error={errors.paidMonth?.message}
                    name="paidMonth"
                    register={register}
                    disabled={!valueAppointment.isClient}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("paidMonth", e)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center mt-4">
                <div className="lg:columns-2 sm:columns-1 border pl-3 pt-3">
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
                    type="text"
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
                  <FormField
                    label="Paid Month"
                    type="select"
                    error={errors.paidMonth?.message}
                    name="paidMonth"
                    register={register}
                    disabled={!valueAppointment.isClient}
                    useBlur={true}
                    onBlur={(e) => handleInputChange("paidMonth", e)}
                  />
                </div>
              </div>
            )}
            <div className={styles.subTitles}>
              <h3>PET INFORMATION</h3>
            </div>
            {id ? (
              <div className="flex flex-col mt-4 items-center ">
                <div className="mb-5">
                  <div className="md:flex mb-2 items-center w-full justify-center">
                    <div>
                      <label className="mb-2 mr-5 block text-sm font-medium leading-6 text-gray-900">
                        Choose Pet
                      </label>
                    </div>
                    <div className="flex items-center">
                      <select
                        onChange={(e) => selectedPet(e.target.value)}
                        className="block w-full h-10 rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {appointmentToEdit[0].pet.map((pet) => (
                          <option value={pet._id}>{pet.petName}</option>
                        ))}
                      </select>
                      <div className="flex p-3">
                        <FontAwesomeIcon
                          icon={faPlus}
                          size="lg"
                          className={styles.addPet}
                          onClick={() => handleAddPet()}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="lg"
                          className={styles.deletePet}
                          onClick={() => setConfirmDeletePet(true)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:columns-2 sm:columns-1 border pl-3 pt-3 mb-5">
                  <div>
                    <FormField
                      label="Kind"
                      type="text"
                      error={errors.pet?.kind?.message}
                      name="pet.kind"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.kind", e)}
                      disabled={appointmentToEdit[0].pet.length === 0}
                    />
                    <FormField
                      label="Breed"
                      type="text"
                      error={errors.pet?.breed?.message}
                      name="pet.breed"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.breed", e)}
                      disabled={appointmentToEdit[0].pet.length === 0}
                    />
                    <FormField
                      label="Pet Name"
                      type="text"
                      error={errors.pet?.petName?.message}
                      name="pet.petName"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.petName", e)}
                      disabled={appointmentToEdit[0].pet.length === 0}
                    />
                  </div>
                  <div>
                    <FormField
                      label="Age"
                      type="text"
                      error={errors.pet?.age?.message}
                      name="pet.age"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.age", e)}
                      disabled={appointmentToEdit[0].pet.length === 0}
                    />
                    <FormField
                      label="Sex"
                      type="select"
                      error={errors.pet?.sex?.message}
                      name="pet.sex"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.sex", e)}
                      disabled={appointmentToEdit[0].pet.length === 0}
                    />
                    <FormField
                      label="Color"
                      type="text"
                      error={errors.pet?.color?.message}
                      name="pet.color"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.color", e)}
                      disabled={appointmentToEdit[0].pet.length === 0}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mt-4">
                <div className="lg:columns-2 sm:columns-1 border pl-3 pt-3 mb-5">
                  <div>
                    <FormField
                      label="Kind"
                      placeholder="Enter Kind"
                      type="text"
                      error={errors.pet?.kind?.message}
                      name="pet.kind"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.kind", e)}
                    />
                    <FormField
                      label="Breed"
                      placeholder="Enter Breed"
                      type="text"
                      error={errors.pet?.breed?.message}
                      name="pet.breed"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.breed", e)}
                    />
                    <FormField
                      label="Pet Name"
                      placeholder="Enter Pet Name"
                      type="text"
                      error={errors.pet?.petName?.message}
                      name="pet.petName"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.petName", e)}
                    />
                  </div>
                  <div>
                    <FormField
                      label="Age"
                      placeholder="Enter Age"
                      type="text"
                      error={errors.pet?.age?.message}
                      name="pet.age"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.age", e)}
                    />
                    <FormField
                      label="Sex"
                      type="select"
                      error={errors.pet?.sex?.message}
                      name="pet.sex"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.sex", e)}
                    />
                    <FormField
                      label="Color"
                      placeholder="Enter Color"
                      type="text"
                      error={errors.pet?.color?.message}
                      name="pet.color"
                      register={register}
                      useBlur={true}
                      onBlur={(e) => handleInputChange("pet.color", e)}
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
          <div className={styles.buttonContainer}>
            <div className={styles.button}>
              <div>
                <button className={styles.cancelButton} onClick={close}>
                  Cancel
                </button>
              </div>
              <div>
                {id && appointmentToEdit[0].pet.length > 0 ? (
                  <button className={styles.historyButton} onClick={setHistory}>
                    History
                  </button>
                ) : (
                  ""
                )}
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
                {console.log(errors)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewFormAddPet && (
        <FormPet
          actionCancel={() => setViewFormAddPet(false)}
          id={appointmentToEdit[0]._id}
          showToastModal={showToastModal}
          setMessageModal={setMessageModal}
        />
      )}
      {confirmDeletePet && (
        <ConfirmModal
          title="Delete Pet"
          actionCancel={() => setConfirmDeletePet(false)}
          actionDelete={handleDeletePet}
        />
      )}
      {history && (
        <History
          actionCancel={() => setHistory(false)}
          change={handleInputChange}
          pet={selectPet}
          edit={handlerEdit}
        />
      )}
    </div>
  );
}

export default Form;
