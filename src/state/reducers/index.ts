import { combineReducers } from "redux";
import whatsAppReducers from "./whatsAppReducers";

const reducers = combineReducers({
  whatsApp: whatsAppReducers,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
