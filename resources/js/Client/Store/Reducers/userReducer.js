import {
	GET_USER,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
	UPDATE_SAVED_ITEMS,
	UPDATE_SAVED_ITEMS_SUCCESS,
	UPDATE_SAVED_ITEMS_FAIL
} from "../Actions/UserActions";

const initialState = {
	loading: false,
	user: null,
	hasErrors: false,
	hasSuccess: false,
	errorMessage: "",
	successMessage: "",
	saving: false
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		// Get user
		case GET_USER: {
			return {
				...state,
				loading: true,
				hasErrors: false,
				hasSuccess: false
			};
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				user: action.payload.data.data
			};
		}
		case GET_USER_FAIL: {
			return {
				...state,
				loading: false,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri pridobivanju uporabnika je prišlo do težave..."
			};
		}

		// Update saved items
		case UPDATE_SAVED_ITEMS: {
			return {
				...state,
				hasErrors: false,
				hasSuccess: false,
				saving: true
			};
		}
		case UPDATE_SAVED_ITEMS_SUCCESS: {
			return {
				...state,
				hasSuccess: true,
				successMessage: "Priljubljene namestitve uspešno posodobljene!",
				user: action.payload.data.data,
				saving: false
			};
		}
		case UPDATE_SAVED_ITEMS_FAIL: {
			return {
				...state,
				saving: false,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri posodabljanju uporabnika je prišlo do težave..."
			};
		}

		default: {
			return state;
		}
	}
};

export default userReducer;
