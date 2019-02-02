import {
	SAVE_ACCOMMODATION,
	SAVE_ACCOMMODATION_SUCCESS,
	SAVE_ACCOMMODATION_FAIL,
	CLEAR_SUCCESS_AND_ERRORS,
	GET_ACCOMMODATIONS,
	GET_ACCOMMODATIONS_SUCCESS,
	GET_ACCOMMODATIONS_FAIL,
	SEARCH_ACCOMMODATIONS,
	SEARCH_ACCOMMODATIONS_SUCCESS,
	SEARCH_ACCOMMODATIONS_FAIL,
	DELETE_ACCOMMODATION,
	DELETE_ACCOMMODATION_FAIL,
	DELETE_ACCOMMODATION_SUCCESS,
	UPDATE_ACCOMMODATION,
	UPDATE_ACCOMMODATION_SUCCESS,
	UPDATE_ACCOMMODATION_FAIL
} from "../Actions/AccommodationsActions";

const initialState = {
	hasErrors: false,
	errorMessage: "",
	hasSuccess: false,
	successMessage: "",
	data: [],
	saving: false,
	loading: true,
	deleteAction: {
		loading: false,
		accommodation: null
	}
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

		// Get accommodations
		case GET_ACCOMMODATIONS: {
			return {
				...state,
				loading: true,
				hasErrors: false,
				hasSuccess: false
			};
		}
		case GET_ACCOMMODATIONS_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload.data.data
			};
		}
		case GET_ACCOMMODATIONS_FAIL: {
			return {
				...state,
				loading: false,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.errorMessage
					: "Pri pridobivanju namestitev je prišlo do težave..."
			};
		}

		// Search accommodations
		case SEARCH_ACCOMMODATIONS: {
			return {
				...state,
				loading: true,
				hasErrors: false,
				hasSuccess: false
			};
		}
		case SEARCH_ACCOMMODATIONS_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload.data.data
			};
		}
		case SEARCH_ACCOMMODATIONS_FAIL: {
			return {
				...state,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri iskanju namestitev je prišlo do težave...",
				loading: false
			};
		}

		// Delete accommodation
		case DELETE_ACCOMMODATION: {
			return {
				...state,
				hasErrors: false,
				hasSuccess: false,
				deleteAction: {
					loading: true,
					accommodation: action.payload.id
				}
			};
		}
		case DELETE_ACCOMMODATION_SUCCESS: {
			return {
				...state,
				hasSuccess: true,
				successMessage: "Namestitev uspešno izbrisana",
				data: action.payload.data.data,
				deleteAction: {
					loading: false,
					accommodation: null
				}
			};
		}
		case DELETE_ACCOMMODATION_FAIL: {
			return {
				...state,
				deleteAction: {
					loading: false,
					accommodation: null
				},
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri brisanju namestitve je prišlo do napake..."
			};
		}

		// Update accommodation
		case UPDATE_ACCOMMODATION: {
			return {
				...state,
				hasErrors: false,
				hasSuccess: false,
				saving: true
			};
		}
		case UPDATE_ACCOMMODATION_SUCCESS: {
			return {
				...state,
				hasSuccess: true,
				successMessage: action.payload.data.success,
				saving: false
			};
		}
		case UPDATE_ACCOMMODATION_FAIL: {
			return {
				...state,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri posodabljanju namestitve je prišlo do težave...",
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
