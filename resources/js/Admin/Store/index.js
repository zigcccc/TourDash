import { combineReducers } from "redux";
import userReducer from "./Reducers/userReducer";
import editingPageReducer from "./Reducers/editingPageReducer";
import pagesReducer from "./Reducers/pagesReducer";
import dashboardReducer from "./Reducers/dashboardReducer";

const rootReducer = combineReducers({
	user: userReducer,
	editingPage: editingPageReducer,
	pages: pagesReducer,
	dashboard: dashboardReducer
});

export default rootReducer;
