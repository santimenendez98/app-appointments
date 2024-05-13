import {
    getUserPending,
    getUserSuccess,
    getUserError,
  } from "./action";
  
  export const getUser = () => {
    return async (dispatch) => {
      dispatch(getUserPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
          method: "GET",
        });
        const res = await response.json();
        if (res) {
          dispatch(getUserSuccess(res));
        }
        if (res.error) {
          throw new Error(res.error.message);
        }
      } catch (error) {
        dispatch(getUserError(error));
      }
    };
  };