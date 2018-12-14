import { combineReducers } from "redux";
import userReducer from "./Reducers/userReducer";

const rootReducer = combineReducers({ user: userReducer });

export default rootReducer;
