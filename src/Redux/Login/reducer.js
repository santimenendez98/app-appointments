const initialState = {
    user: null,
    loading: false,
    error: null,
    logged: false
  };

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
                logged: true
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload,
                logged: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                error: null,
                logged: false
            };
        default:
            return state;
    }
};
  
  export default authReducer;