import { combineReducers } from "redux";
import userReducer from "./Reducers/userReducer";
import editingPageReducer from "./Reducers/editingPageReducer";

const rootReducer = combineReducers({
	user: userReducer,
	editingPage: editingPageReducer
});

export default rootReducer;
