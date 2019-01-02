import produce from "immer";
import _findIndex from "lodash/findIndex";
import _last from "lodash/last";
import _remove from "lodash/remove";
import {
	GET_ALL_USERS,
	GET_ALL_USERS_FAIL,
	GET_ALL_USERS_SUCCESS,
	GET_USER,
	GET_USER_FAIL,
	GET_USER_SUCCESS,
	UPDATE_PROFILE_IMAGE,
	UPDATE_PROFILE_IMAGE_FAIL,
	UPDATE_PROFILE_IMAGE_SUCCESS,
	UPDATE_USER,
	UPDATE_USER_FAIL,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ROLE,
	UPDATE_USER_ROLE_SUCCESS,
	UPDATE_USER_ROLE_FAIL,
	CLEAR_ERROR,
	DELETE_USER,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
	SEARCH_USERS,
	SEARCH_USERS_SUCCESS,
	SEARCH_USERS_FAIL
} from "../Actions/UserActions";

const initialState = {
	user: {},
	allUsers: {
		data: [],
		isLastPage: true,
		isFirstPage: true,
		totalPages: 1,
		currentPage: 1
	},
	ready: false,
	loading: true,
	loadingAllUsers: false,
	errorAllUsers: false,
	error: ""
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		// Get all users
		case GET_ALL_USERS: {
			return { ...state, loadingAllUsers: true };
		}
		case GET_ALL_USERS_SUCCESS: {
			return {
				...state,
				allUsers: {
					data: action.payload.data.data,
					isLastPage:
						action.payload.data.meta.current_page ===
						action.payload.data.meta.last_page,
					isFirstPage: action.payload.data.meta.current_page === 1,
					totalPages: Math.ceil(
						action.payload.data.meta.total / action.payload.data.meta.per_page
					),
					currentPage: action.payload.data.meta.current_page
				},
				loadingAllUsers: false
			};
		}
		case GET_ALL_USERS_FAIL: {
			let errorMessage = action.error
				? action.error.response.data.error
				: "Napaka pri pridobivanju podatkov o uporabnikih.";
			return {
				...state,
				loadingAllUsers: false,
				errorAllUsers: action,
				errorAllUsers: errorMessage
			};
		}

		// Get user details
		case GET_USER: {
			return { ...state, loading: true };
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				ready: true,
				user: action.payload.data.data
			};
		}
		case GET_USER_FAIL: {
			return { ...state, loading: false, error: action.payload.data.message };
		}

		// Update user
		case UPDATE_USER: {
			return { ...state, loading: true };
		}
		case UPDATE_USER_SUCCESS: {
			return { ...state, loading: false, user: action.payload.data.data };
		}
		case UPDATE_USER_FAIL: {
			let errorMessage = action.error
				? action.error.response.data.error
				: "Pri posodabljanju je prišlo do napake";
			return {
				...state,
				loading: false,
				error: errorMessage
			};
		}

		// Update user role
		case UPDATE_USER_ROLE: {
			return state;
		}
		case UPDATE_USER_ROLE_SUCCESS: {
			let updatedUserId = action.payload.data.data.id;
			let userToUpdate = _findIndex(state.allUsers.data, { id: updatedUserId });
			return produce(state, draft => {
				draft.allUsers.data[userToUpdate] = action.payload.data.data;
			});
		}
		case UPDATE_USER_ROLE_FAIL: {
			return state;
		}

		//Update users profile image
		case UPDATE_PROFILE_IMAGE: {
			return { ...state, loading: true };
		}
		case UPDATE_PROFILE_IMAGE_SUCCESS: {
			return { ...state, loading: false, user: action.payload.data.data };
		}
		case UPDATE_PROFILE_IMAGE_FAIL: {
			return {
				...state,
				loading: false,
				error: "Napaka pri nalaganju profilne slike"
			};
		}

		// Delete user account
		case DELETE_USER: {
			return state;
		}
		case DELETE_USER_SUCCESS: {
			if (action.payload.data.refresh) {
				window.location.reload();
			} else {
				let userId = parseInt(
					_last(action.meta.previousAction.payload.request.url.split("/"))
				);
				return produce(state, draft => {
					draft.allUsers.data = _remove(
						state.allUsers.data,
						user => user.id !== userId
					);
				});
			}
			return state;
		}
		case DELETE_USER_FAIL: {
			return {
				...state,
				loading: false,
				error: "Napaka pri brisanju uporabniškega računa."
			};
		}

		// Search Users
		case SEARCH_USERS: {
			return {
				...state,
				loadingAllUsers: true
			};
		}
		case SEARCH_USERS_SUCCESS: {
			return {
				...state,
				allUsers: {
					data: action.payload.data.data,
					isLastPage:
						action.payload.data.meta.current_page ===
						action.payload.data.meta.last_page,
					isFirstPage: action.payload.data.meta.current_page === 1,
					totalPages: Math.ceil(
						action.payload.data.meta.total / action.payload.data.meta.per_page
					),
					currentPage: action.payload.data.meta.current_page
				},
				loadingAllUsers: false
			};
		}
		case SEARCH_USERS_FAIL: {
			let errorMessage = action.error
				? action.error.response.data.error
				: "Napaka pri pridobivanju podatkov o uporabnikih.";
			return {
				...state,
				loadingAllUsers: false,
				errorAllUsers: action,
				errorAllUsers: errorMessage
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
