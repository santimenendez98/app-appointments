import {
  GET_PET_PENDING,
  GET_PET_SUCCESS,
  GET_PET_ERROR,
  ADD_PET_PENDING,
  ADD_PET_SUCCESS,
  ADD_PET_ERROR,
  EDIT_PET_PENDING,
  EDIT_PET_SUCCESS,
  EDIT_PET_ERROR,
  DELETE_PET_PENDING,
  DELETE_PET_SUCCESS,
  DELETE_PET_ERROR,
} from "./constants";

export const getPetPending = () => {
  return {
    type: GET_PET_PENDING,
  };
};

export const getPetSuccess = (data) => {
  return {
    type: GET_PET_SUCCESS,
    payload: data,
  };
};

export const getPetError = (error) => {
  return {
    type: GET_PET_ERROR,
    payload: error,
  };
};

export const addPetPending = () => {
  return {
    type: ADD_PET_PENDING,
  };
};

export const addPetSuccess = (newPET) => {
  return {
    type: ADD_PET_SUCCESS,
    payload: newPET,
  };
};

export const addPetError = (error) => {
  return {
    type: ADD_PET_ERROR,
    payload: {
      error,
    },
  };
};

export const editPetPending = () => {
  return {
    type: EDIT_PET_PENDING,
  };
};

export const editPetSuccess = (PETUpdated) => {
  return {
    type: EDIT_PET_SUCCESS,
    payload: {
      PETUpdated,
    },
  };
};

export const editPetError = (error) => {
  return {
    type: EDIT_PET_ERROR,
    payload: {
      error,
    },
  };
};

export const deletePetPending = () => {
  return {
    type: DELETE_PET_PENDING,
  };
};

export const deletePetSuccess = (idDeleted) => {
  return {
    type: DELETE_PET_SUCCESS,
    payload: {
      idDeleted,
    },
  };
};

export const deletePetError = (error) => {
  return {
    type: DELETE_PET_ERROR,
    payload: {
      error,
    },
  };
};
