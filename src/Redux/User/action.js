import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
  } from "./constants";
  
  export const getUserPending = () => {
    return {
      type: GET_USER_PENDING,
    };
  };
  
  export const getUserSuccess = (data) => {
    return {
      type: GET_USER_SUCCESS,
      payload: data,
    };
  };
  
  export const getUserError = (error) => {
    return {
      type: GET_USER_ERROR,
      payload: error,
    };
  };