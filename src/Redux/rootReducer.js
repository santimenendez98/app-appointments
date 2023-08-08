import { combineReducers } from "redux";

import appointmentReducer from "./Appointment/reducer";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
});

export default rootReducer;
