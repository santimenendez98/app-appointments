import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout
  } from "./actions";
  
  export const loginUser = (data) => {
    return async (dispatch) => {
      dispatch(loginRequest());
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/login`,
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const res = await response.json();
        if (!res.error) {
          dispatch(loginSuccess(res));
          return res.token
        } else {
          dispatch(loginFailure(res.error));
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };
  };

  export const logOutUser = () => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            localStorage.clear();
            dispatch(logout())
        } catch (error) {
            dispatch(loginFailure(error))
        }
      };
  }
  