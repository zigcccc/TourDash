import {
	GET_PAGES_PREVIEW,
	GET_PAGES_PREVIEW_SUCCESS,
	GET_PAGES_PREVIEW_FAIL,
	GET_USERS_PREVIEW,
	GET_USERS_PREVIEW_SUCCESS,
	GET_USERS_PREVIEW_FAIL
} from "../Actions/DashboardActions";

const initialState = {
	successMessage: "",
	hasSuccess: false,
	errorMessage: "",
	hasError: false,
	pagesLoading: false,
	accommodationsLoading: false,
	usersLoading: false,
	pages: {
		count: 0,
		data: []
	},
	users: {
		count: 0,
		data: []
	},
	accommodations: {
		count: 0,
		data: []
	}
};

const dashboardReducer = (state = initialState, action) => {
	switch (action.type) {
		// Get pages preview
		case GET_PAGES_PREVIEW: {
			return {
				...state,
				pagesLoading: true,
				hasSuccess: false,
				hasError: false
			};
		}
		case GET_PAGES_PREVIEW_SUCCESS: {
			return {
				...state,
				pagesLoading: false,
				pages: {
					count: action.payload.data.all_pages_count,
					data: action.payload.data.pages
				}
			};
		}
		case GET_PAGES_PREVIEW_FAIL: {
			return {
				...state,
				pagesLoading: false,
				hasError: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri pridobivanju podatkov o straneh je prišlo do napake..."
			};
		}

		// Get users preview
		case GET_USERS_PREVIEW: {
			return {
				...state,
				usersLoading: true,
				hasError: false,
				hasSuccess: false
			};
		}
		case GET_USERS_PREVIEW_SUCCESS: {
			return {
				...state,
				usersLoading: false,
				users: {
					count: action.payload.data.all_users_count,
					data: action.payload.data.users
				}
			};
		}
		case GET_USERS_PREVIEW_FAIL: {
			return {
				...state,
				usersLoading: false,
				hasError: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri pridobivanju podatkov o uporabnikih je prišlo do napake..."
			};
		}

		default: {
			return state;
		}
	}
};

export default dashboardReducer;
