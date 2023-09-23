import {
  GET_PET_ERROR,
  GET_PET_PENDING,
  GET_PET_SUCCESS,
  ADD_PET_ERROR,
  ADD_PET_PENDING,
  ADD_PET_SUCCESS,
  EDIT_PET_ERROR,
  EDIT_PET_PENDING,
  EDIT_PET_SUCCESS,
  DELETE_PET_ERROR,
  DELETE_PET_PENDING,
  DELETE_PET_SUCCESS,
} from "./constants";

const INITIAL_STATE = {
  pending: false,
  data: [],
  error: false,
  success: false,
};
const petReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PET_ERROR: {
      return { ...state, pending: false, error: true };
    }
    case GET_PET_SUCCESS: {
      return { ...state, pending: false, data: action.payload.data };
    }
    case GET_PET_PENDING: {
      return { ...state, pending: true };
    }
    case ADD_PET_ERROR: {
      return { ...state, pending: false, error: true };
    }
    case ADD_PET_SUCCESS: {
      return {
        ...state,
        pending: false,
        data: [...state.data, action.payload.newPet],
      };
    }
    case ADD_PET_PENDING: {
      return { ...state, pending: true };
    }
    case EDIT_PET_ERROR: {
      return { ...state, pending: false, error: true };
    }
    case EDIT_PET_SUCCESS: {
      const updated = state.data.find(
        (pet) => pet._id === action.payload.petUpdated._id
      );

      const index = state.data.indexOf(updated);

      state.data[index] = action.payload.petUpdated;

      return {
        ...state,
        data: state.data,
        pending: false,
        success: true,
      };
    }
    case EDIT_PET_PENDING: {
      return { ...state, pending: true };
    }
    case DELETE_PET_ERROR: {
      return { ...state, pending: false, error: true };
    }
    case DELETE_PET_SUCCESS: {
      const newList = state.data.filter(
        (pet) => pet._id !== action.payload.idDeleted
      );
      return {
        ...state,
        data: newList,
        pending: false,
      };
    }
    case DELETE_PET_PENDING: {
      return { ...state, pending: true };
    }
    default:
      return state;
  }
};

export default petReducer;
