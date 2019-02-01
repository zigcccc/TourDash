import { combineReducers } from "redux";
import userReducer from "./Reducers/userReducer";
import editingPageReducer from "./Reducers/editingPageReducer";
import pagesReducer from "./Reducers/pagesReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import accommodationsReducer from "./Reducers/accommodationsReducer";

const rootReducer = combineReducers({
	user: userReducer,
	editingPage: editingPageReducer,
	pages: pagesReducer,
	dashboard: dashboardReducer,
	accommodations: accommodationsReducer
});

export default rootReducer;
