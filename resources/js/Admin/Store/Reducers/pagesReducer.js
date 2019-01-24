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
	SEARCH_PAGE_FAIL
} from "../Actions/PagesActions";

const initialState = {
	loading: true,
	errorMessage: "",
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
				errorMessage: "Pri pridobivanju strani je prišlo do težave..."
			};
		}

		// Delete page
		case DELETE_PAGE: {
			return {
				...state,
				errorMessage: null,
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
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri poizvedbi je prišlo do težave..."
			};
		}

		default: {
			return state;
		}
	}
};

export default pagesReducer;
