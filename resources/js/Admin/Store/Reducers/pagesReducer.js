import _findIndex from "lodash/findIndex";
import {
	GET_PAGES,
	GET_PAGES_SUCCESS,
	GET_PAGES_FAIL,
	DELETE_PAGE,
	DELETE_PAGE_SUCCESS,
	DELETE_PAGE_FAIL,
	SEARCH_PAGE,
	SEARCH_PAGE_SUCCESS,
	SEARCH_PAGE_FAIL,
	GET_MENU,
	GET_MENU_SUCCESS,
	GET_MENU_FAIL,
	REORDER_MENU,
	UPDATE_MENU,
	UPDATE_MENU_SUCCESS,
	UPDATE_MENU_FAIL,
	CLEAR_ERROR,
	CLEAR_SUCCESS
} from "../Actions/PagesActions";

const initialState = {
	loading: true,
	hasError: false,
	errorMessage: "",
	hasSuccess: false,
	successMessage: "",
	deleteAction: {
		loading: false,
		page: null
	},
	pages: {
		data: [],
		isLastPage: true,
		isFirstPage: true,
		totalPages: 1,
		currentPage: 1
	},
	menu: {
		loading: true,
		hasChanged: false,
		menuItems: null
	}
};

const pagesReducer = (state = initialState, action) => {
	switch (action.type) {
		// Get pages
		case GET_PAGES: {
			return {
				...state,
				loading: true
			};
		}
		case GET_PAGES_SUCCESS: {
			let { data } = action.payload;
			let { meta } = data;
			return {
				...state,
				loading: false,
				pages: {
					data: data.data,
					isLastPage: meta.current_page === meta.last_page,
					isFirstPage: meta.current_page === 1,
					totalPages: Math.ceil(meta.total / meta.per_page),
					currentPage: meta.current_page
				}
			};
		}
		case GET_PAGES_FAIL: {
			return {
				...state,
				loading: false,
				hasError: true,
				errorMessage: "Pri pridobivanju strani je prišlo do težave..."
			};
		}

		// Delete page
		case DELETE_PAGE: {
			return {
				...state,
				hasError: false,
				errorMessage: null,
				hasSuccess: false,
				successMessage: null,
				deleteAction: {
					loading: true,
					page: action.payload.pageId
				}
			};
		}
		case DELETE_PAGE_SUCCESS: {
			let { data } = action.payload;
			let { meta } = data;
			return {
				...state,
				pages: {
					data: data.data,
					isLastPage: meta.current_page === meta.last_page,
					isFirstPage: meta.current_page === 1,
					totalPages: Math.ceil(meta.total / meta.per_page),
					currentPage: meta.current_page
				},
				deleteAction: {
					loading: false,
					page: null
				},
				hasSuccess: true,
				successMessage: "Stran uspešno izbrisana!"
			};
		}
		case DELETE_PAGE_FAIL: {
			return {
				...state,
				deleteAction: {
					loading: false,
					page: null
				},
				hasError: true,
				errorMessage: action.payload.data
					? action.payload.data.error
					: "Pri brisanju strani je prišlo do napake..."
			};
		}

		// Search pages
		case SEARCH_PAGE: {
			return { ...state, loading: true, errorMessage: "" };
		}
		case SEARCH_PAGE_SUCCESS: {
			let { data } = action.payload;
			let { meta } = data;
			return {
				...state,
				loading: false,
				pages: {
					data: data.data,
					isLastPage: meta.current_page === meta.last_page,
					isFirstPage: meta.current_page === 1,
					totalPages: Math.ceil(meta.total / meta.per_page),
					currentPage: meta.current_page
				}
			};
		}
		case SEARCH_PAGE_FAIL: {
			return {
				...state,
				loading: false,
				hasError: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri poizvedbi je prišlo do težave..."
			};
		}

		// Get menu
		case GET_MENU: {
			return {
				...state,
				hasError: false,
				errorMessage: "",
				menu: {
					...state.menu,
					loading: true
				}
			};
		}
		case GET_MENU_SUCCESS: {
			return {
				...state,
				loading: false,
				menu: {
					...state.menu,
					loading: false,
					menuItems: action.payload.data.data
				}
			};
		}
		case GET_MENU_FAIL: {
			return {
				...state,
				loading: false,
				menu: {
					...state.menu,
					loading: false
				},
				hasError: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri pridobivanju menija je prišlo do težave"
			};
		}

		// Reorder items in the menu
		case REORDER_MENU: {
			return {
				...state,
				loading: false,
				hasError: false,
				errorMessage: "",
				hasSuccess: false,
				successMessage: "",
				menu: {
					...state.menu,
					hasChanged: true,
					menuItems: action.payload.menu
				}
			};
		}

		// Update menu
		case UPDATE_MENU: {
			return {
				...state,
				menu: { ...state.menu, loading: true },
				hasSuccess: false,
				successMessage: "",
				hasError: false,
				errorMessage: ""
			};
		}
		case UPDATE_MENU_SUCCESS: {
			return {
				...state,
				menu: {
					...state.menu,
					hasChanged: false,
					loading: false
				},
				hasSuccess: true,
				successMessage: action.payload.data.success
			};
		}
		case UPDATE_MENU_FAIL: {
			return {
				...state,
				menu: {
					...state.menu,
					loading: false
				},
				hasError: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri posodabljanju menija je pršilo do težave..."
			};
		}

		// Clear success and error messages
		case CLEAR_ERROR: {
			return {
				...state,
				hasError: false
			};
		}
		case CLEAR_SUCCESS: {
			return {
				...state,
				hasSuccess: false
			};
		}

		default: {
			return state;
		}
	}
};

export default pagesReducer;
