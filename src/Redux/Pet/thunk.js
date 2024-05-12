import {
  addPetSuccess,
  addPetPending,
  addPetError,
  getPetPending,
  getPetSuccess,
  getPetError,
  deletePetError,
  deletePetPending,
  deletePetSuccess,
  editPetSuccess,
  editPetError,
  editPetPending,
} from "./action";

export const getPet = (token) => {
  return async (dispatch) => {
    dispatch(getPetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pet`, {
        method: "GET",
        headers: {
          "token": `${token}`,
        }
      });
      const res = await response.json();
      if (res) {
        dispatch(getPetSuccess(res));
      }
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (error) {
      dispatch(getPetError(error));
    }
  };
};

export const createPet = (data, token) => {
  return async (dispatch) => {
    dispatch(addPetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": `${token}`,
        },
        body: JSON.stringify(data),
      });

      const res = response.json();

      if (res) {
        dispatch(addPetSuccess(res));
        return res;
      }
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (error) {
      dispatch(addPetError(error));
    }
  };
};

export const editPet = (id, data, token) => {
  return async (dispatch) => {
    dispatch(editPetPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/pet/${id}`,
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
        dispatch(editPetSuccess(res));
      }
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (error) {
      dispatch(editPetError(error));
    }
  };
};

export const deletePet = (id, token) => {
  return async (dispatch) => {
    dispatch(deletePetPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/pet/${id}`,
        {
          method: "DELETE",
          headers: {
            "token": `${token}`,
          }
        }
      );
      const res = await response.json();

      if (res) {
        dispatch(deletePetSuccess());
      }
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (error) {
      dispatch(deletePetError(error));
    }
  };
};
