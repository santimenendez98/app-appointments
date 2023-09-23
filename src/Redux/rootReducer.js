import { combineReducers } from "redux";

import appointmentReducer from "./Appointment/reducer";
import petReducer from "./Pet/reducer";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
  pet: petReducer,
});

export default rootReducer;
