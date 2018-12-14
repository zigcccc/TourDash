import {
	GET_USER,
	GET_USER_FAIL,
	GET_USER_SUCCESS,
	UPDATE_PROFILE_IMAGE,
	UPDATE_PROFILE_IMAGE_FAIL,
	UPDATE_PROFILE_IMAGE_SUCCESS,
	CLEAR_ERROR
} from "../Actions/UserActions";

const initialState = {
	user: {},
	ready: false,
	loading: true,
	error: ""
};

const userReducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		// Get user details
		case GET_USER: {
			return { ...state, loading: true };
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				ready: true,
				user: action.payload.data.user
			};
		}
		case GET_USER_FAIL: {
			return { ...state, loading: false, error: action.payload.data.message };
		}

		//Update users profile image
		case UPDATE_PROFILE_IMAGE: {
			return { ...state, loading: true };
		}
		case UPDATE_PROFILE_IMAGE_SUCCESS: {
			return { ...state, loading: false, user: action.payload.data.user };
		}
		case UPDATE_PROFILE_IMAGE_FAIL: {
			return {
				...state,
				loading: false,
				error: "Napaka pri nalaganju profilne slike"
			};
		}

		// Clear errors
		case CLEAR_ERROR: {
			return {
				...state,
				error: ""
			};
		}

		default: {
			return state;
		}
	}
};

export default userReducer;
