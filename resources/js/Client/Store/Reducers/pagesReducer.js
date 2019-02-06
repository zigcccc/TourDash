import {
	GET_MENU,
	GET_MENU_SUCCESS,
	GET_MENU_FAIL,
	GET_HOMEPAGE,
	GET_HOMEPAGE_SUCCESS,
	GET_HOMEPAGE_FAIL,
	GET_PAGE,
	GET_PAGE_SUCCESS,
	GET_PAGE_FAIL
} from "../Actions/PagesActions";

const initialState = {
	menu: null,
	menuLoading: true,
	loading: true,
	pages: [],
	homepage: {},
	hasErrors: false,
	errorMessage: "",
	hasSuccess: false,
	successMessage: ""
};

const pagesReducer = (state = initialState, action) => {
	switch (action.type) {
		// Get menu
		case GET_MENU: {
			return {
				...state,
				menuLoading: true,
				hasErrors: false,
				hasSuccess: false
			};
		}
		case GET_MENU_SUCCESS: {
			return {
				...state,
				menuLoading: false,
				menu: action.payload.data.data
			};
		}
		case GET_MENU_FAIL: {
			return {
				...state,
				menuLoading: false,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri pridobivanju menija je prišlo do težave..."
			};
		}

		// Get homepage
		case GET_HOMEPAGE: {
			return {
				...state,
				loading: true,
				hasErrors: false,
				hasSuccess: false
			};
		}
		case GET_HOMEPAGE_SUCCESS: {
			return {
				...state,
				homepage: action.payload.data.data,
				loading: false
			};
		}
		case GET_HOMEPAGE_FAIL: {
			return {
				...state,
				loading: false,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Domača stran ne obstaja, kontaktirajte administratorja..."
			};
		}

		// Get page
		case GET_PAGE: {
			return {
				...state,
				loading: true,
				hasErrors: false,
				hasSuccess: false
			};
		}
		case GET_PAGE_SUCCESS: {
			//let { pageId } = action.meta.previousAction.payload;
			let { data } = action.payload.data;
			return {
				...state,
				loading: false,
				pages: [...state.pages, data]
			};
		}
		case GET_PAGE_FAIL: {
			return {
				...state,
				loading: false,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Zahtevana stran ne obstaja..."
			};
		}

		default: {
			return state;
		}
	}
};

export default pagesReducer;
