import {
  GET_APPOINTMENT_ERROR,
  GET_APPOINTMENT_PENDING,
  GET_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_ERROR,
  ADD_APPOINTMENT_PENDING,
  ADD_APPOINTMENT_SUCCESS,
  EDIT_APPOINTMENT_ERROR,
  EDIT_APPOINTMENT_PENDING,
  EDIT_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_ERROR,
  DELETE_APPOINTMENT_PENDING,
  DELETE_APPOINTMENT_SUCCESS,
} from "./constants";

const INITIAL_STATE = {
  pending: false,
  data: [],
  error: false,
  success: false,
};

const appointmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_APPOINTMENT_ERROR: {
      return { ...state, pending: false, error: true };
    }
    case GET_APPOINTMENT_SUCCESS: {
      return { ...state, pending: false, data: action.payload.data };
    }
    case GET_APPOINTMENT_PENDING: {
      return { ...state, pending: true };
    }
    case ADD_APPOINTMENT_ERROR: {
      return { ...state, pending: false, error: true };
    }
    case ADD_APPOINTMENT_SUCCESS: {
      return {
        ...state,
        pending: false,
        data: [...state.data, action.payload.newAppointment],
      };
    }
    case ADD_APPOINTMENT_PENDING: {
      return { ...state, pending: true };
    }
    case EDIT_APPOINTMENT_ERROR: {
      return { ...state, pending: false, error: true };
    }
    case EDIT_APPOINTMENT_SUCCESS: {
      const updated = state.data.find(
        (appointment) =>
          appointment._id === action.payload.appointmentUpdated._id
      );

      const index = state.data.indexOf(updated);

      state.data[index] = action.payload.appointmentUpdated;

      return {
        ...state,
        data: state.data,
        pending: false,
        success: true,
      };
    }
    case EDIT_APPOINTMENT_PENDING: {
      return { ...state, pending: true };
    }
    case DELETE_APPOINTMENT_ERROR: {
      return { ...state, pending: false, error: true };
    }
    case DELETE_APPOINTMENT_SUCCESS: {
      const newList = state.data.filter(
        (appointment) => appointment._id !== action.payload.idDeleted
      );
      return {
        ...state,
        data: newList,
        pending: false,
      };
    }
    case DELETE_APPOINTMENT_PENDING: {
      return { ...state, pending: true };
    }
    default:
      return state;
  }
};

export default appointmentReducer;
