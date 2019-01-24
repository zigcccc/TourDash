import { combineReducers } from "redux";
import userReducer from "./Reducers/userReducer";
import editingPageReducer from "./Reducers/editingPageReducer";
import pagesReducer from "./Reducers/pagesReducer";

const rootReducer = combineReducers({
	user: userReducer,
	editingPage: editingPageReducer,
	pages: pagesReducer
});

export default rootReducer;
