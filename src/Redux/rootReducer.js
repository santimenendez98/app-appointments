import { combineReducers } from "redux";

import appointmentReducer from "./Appointment/reducer";
import petReducer from "./Pet/reducer";
import authReducer from "./Login/reducer";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
  pet: petReducer,
  auth: authReducer,
});

export default rootReducer;
