import {
  GET_APPOINTMENT_PENDING,
  GET_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_ERROR,
  ADD_APPOINTMENT_PENDING,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_ERROR,
  EDIT_APPOINTMENT_PENDING,
  EDIT_APPOINTMENT_SUCCESS,
  EDIT_APPOINTMENT_ERROR,
  DELETE_APPOINTMENT_PENDING,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_ERROR,
} from "./constants";

export const getAppointmentPending = () => {
  return {
    type: GET_APPOINTMENT_PENDING,
  };
};

export const getAppointmentSuccess = (data) => {
  return {
    type: GET_APPOINTMENT_SUCCESS,
    payload: data,
  };
};

export const getAppointmentError = (error) => {
  return {
    type: GET_APPOINTMENT_ERROR,
    payload: error,
  };
};

export const addAppointmentPending = () => {
  return {
    type: ADD_APPOINTMENT_PENDING,
  };
};

export const addAppointmentSuccess = (newAppointment) => {
  return {
    type: ADD_APPOINTMENT_SUCCESS,
    payload: {
      newAppointment,
    },
  };
};

export const addAppointmentError = (error) => {
  return {
    type: ADD_APPOINTMENT_ERROR,
    payload: {
      error,
    },
  };
};

export const editAppointmentPending = () => {
  return {
    type: EDIT_APPOINTMENT_PENDING,
  };
};

export const editAppointmentSuccess = (appointmentUpdated) => {
  return {
    type: EDIT_APPOINTMENT_SUCCESS,
    payload: {
      appointmentUpdated,
    },
  };
};

export const editAppointmentError = (error) => {
  return {
    type: EDIT_APPOINTMENT_ERROR,
    payload: {
      error,
    },
  };
};

export const deleteAppointmentPending = () => {
  return {
    type: DELETE_APPOINTMENT_PENDING,
  };
};

export const deleteAppointmentSuccess = (idDeleted) => {
  return {
    type: DELETE_APPOINTMENT_SUCCESS,
    payload: {
      idDeleted,
    },
  };
};

export const deleteAppointmentError = (error) => {
  return {
    type: DELETE_APPOINTMENT_ERROR,
    payload: {
      error,
    },
  };
};
