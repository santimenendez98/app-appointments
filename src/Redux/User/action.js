import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    PUT_USER_PENDING,
    PUT_USER_SUCCESS,
    PUT_USER_ERROR
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

  export const putUserPending = () => {
    return {
      type: PUT_USER_PENDING,
    };
  };
  
  export const putUserSuccess = (newUser) => {
    return {
      type: PUT_USER_SUCCESS,
      payload: {newUser},
    };
  };
  
  export const putUserError = (error) => {
    return {
      type: PUT_USER_ERROR,
      payload: {error},
    };
  };