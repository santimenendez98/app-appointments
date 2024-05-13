import {
    GET_USER_ERROR,
    GET_USER_PENDING,
    GET_USER_SUCCESS,
  } from "./constants";
  
  const INITIAL_STATE = {
    pending: false,
    data: [],
    error: false,
    success: false,
  };
  const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_USER_ERROR: {
        return { ...state, pending: false, error: true };
      }
      case GET_USER_SUCCESS: {
        return { ...state, pending: false, data: action.payload.data };
      }
      case GET_USER_PENDING: {
        return { ...state, pending: true };
      }
      default:
      return state;
    }
  };
  
  export default userReducer;
  