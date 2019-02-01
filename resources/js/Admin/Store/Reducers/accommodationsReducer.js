import {
	SAVE_ACCOMMODATION,
	SAVE_ACCOMMODATION_SUCCESS,
	SAVE_ACCOMMODATION_FAIL,
	CLEAR_SUCCESS_AND_ERRORS
} from "../Actions/AccommodationsActions";

const initialState = {
	hasErrors: false,
	errorMessage: "",
	hasSuccess: false,
	successMessage: "",
	data: [],
	saving: false,
	loading: false
};

const accommodationsReducer = (state = initialState, action) => {
	switch (action.type) {
		// Save accommodation
		case SAVE_ACCOMMODATION: {
			return {
				...state,
				hasErrors: false,
				hasSuccess: false,
				saving: true
			};
		}
		case SAVE_ACCOMMODATION_SUCCESS: {
			return {
				...state,
				hasSuccess: true,
				successMessage: action.payload.data.success,
				saving: false
			};
		}
		case SAVE_ACCOMMODATION_FAIL: {
			return {
				...state,
				hasErrors: true,
				errorMessage: action.paylaod
					? action.payload.data.error
					: "Pri shranjevanju namestitve je prišlo do težave...",
				saving: false
			};
		}

		// Clear messages
		case CLEAR_SUCCESS_AND_ERRORS: {
			return {
				...state,
				hasErrors: false,
				hasSuccess: false
			};
		}

		default: {
			return state;
		}
	}
};

export default accommodationsReducer;
