export const loginRequest = () => ({
    type: 'LOGIN_REQUEST'
  });

export const loginSuccess = (user) => {
  const expirationTime = new Date().getTime() + 3600 * 1000;
  return {
    type: 'LOGIN_SUCCESS',
    payload: {user, expirationTime}
  }
};

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error
});
  
export const logout = () => ({
    type: 'LOGOUT'
  });