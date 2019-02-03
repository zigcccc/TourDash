import { TOGGLE_MENU, CLOSE_MENU } from "../Actions/GlobalActions";

const initialState = {
	menuOpen: false
};

const globalReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_MENU: {
			return {
				...state,
				menuOpen: !state.menuOpen
			};
		}
		case CLOSE_MENU: {
			return {
				...state,
				menuOpen: false
			};
		}
		default: {
			return state;
		}
	}
};

export default globalReducer;
