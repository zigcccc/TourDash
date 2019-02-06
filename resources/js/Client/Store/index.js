import { combineReducers } from "redux";
import pagesReducer from "./Reducers/pagesReducer";
import settingsReducer from "./Reducers/settingsReducer";
import userReducer from "./Reducers/userReducer";
import accommodationsReducer from "./Reducers/accommodationsReducer";

const rootReducer = combineReducers({
	pages: pagesReducer,
	settings: settingsReducer,
	user: userReducer,
	accommodations: accommodationsReducer
});

export default rootReducer;
