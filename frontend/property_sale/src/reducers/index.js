import { combineReducers } from "redux";
import { loginReducer } from "./authReducer";
import { errorReducer } from "./errorReducer";

export default combineReducers({loginReducer,errorReducer});