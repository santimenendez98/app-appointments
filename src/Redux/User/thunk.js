import {
    getUserPending,
    getUserSuccess,
    getUserError,
    putUserPending,
    putUserSuccess,
    putUserError
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

  export const putUser = (data) => {
    return async (dispatch) => {
      dispatch(putUserPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const res = await response.json();
        if (res) {
          dispatch(putUserSuccess(res));
        }
        if (res.error) {
          throw new Error(res.error.message);
        }
      } catch (error) {
        dispatch(putUserError(error));
      }
    };
  };