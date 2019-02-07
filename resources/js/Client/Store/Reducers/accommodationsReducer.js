import {
	GET_ACCOMMODATIONS,
	GET_ACCOMMODATIONS_SUCCESS,
	GET_ACCOMMODATIONS_FAIL
} from "../Actions/AccommodationsActions";

const initialState = {
	hasErrors: false,
	errorMessage: "",
	hasSuccess: false,
	successMessage: "",
	data: [],
	loading: true
};

const accommodationsReducer = (state = initialState, action) => {
	switch (action.type) {
		// Get all accommodations
		case GET_ACCOMMODATIONS: {
			return {
				...state,
				hasErrors: false,
				hasSuccess: false,
				loading: true
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
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri pridobivanju namestitev je prišlo do težave...",
				loading: false
			};
		}

		default: {
			return state;
		}
	}
};

export default accommodationsReducer;
