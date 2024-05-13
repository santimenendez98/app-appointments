import { combineReducers } from "redux";

import appointmentReducer from "./Appointment/reducer";
import petReducer from "./Pet/reducer";
import authReducer from "./Login/reducer";
import userReducer from "./User/reducer";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
  pet: petReducer,
  auth: authReducer,
  user: userReducer
});

export default rootReducer;
