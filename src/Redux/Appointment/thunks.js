import {
  addAppointmentSuccess,
  addAppointmentPending,
  addAppointmentError,
  getAppointmentPending,
  getAppointmentSuccess,
  getAppointmentError,
  deleteAppointmentError,
  deleteAppointmentPending,
  deleteAppointmentSuccess,
  editAppointmentSuccess,
  editAppointmentError,
  editAppointmentPending,
} from "./actions";

export const getAppointment = (token) => {
  return async (dispatch) => {
    dispatch(getAppointmentPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/appointment`,
        {
          method: "GET",
          headers: {
            "token": `${token}`,
          }
        }
      );
      const res = await response.json();
      if (res) {
        dispatch(getAppointmentSuccess(res));
      }
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (error) {
      dispatch(getAppointmentError(error));
    }
  };
};

export const createAppointment = (data, token) => {
  return async (dispatch) => {
    dispatch(addAppointmentPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": `${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const res = response.json();

      if (res) {
        dispatch(addAppointmentSuccess(data));
      }
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (error) {
      dispatch(addAppointmentError(error));
    }
  };
};

export const editAppointment = (id, data, token) => {
  return async (dispatch) => {
    dispatch(editAppointmentPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/appointment/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "token": `${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();

      if (res) {
        dispatch(editAppointmentSuccess(res));
      }
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (error) {
      dispatch(editAppointmentError(error));
    }
  };
};

export const deleteAppointment = (id, token) => {
  return async (dispatch) => {
    dispatch(deleteAppointmentPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/appointment/${id}`,
        {
          method: "DELETE",
          headers: {
            "token": `${token}`,
          }
        }
      );
      const res = await response.json();

      if (res) {
        dispatch(deleteAppointmentSuccess());
      }
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (error) {
      dispatch(deleteAppointmentError(error));
    }
  };
};
