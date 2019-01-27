export const GET_PAGES = "GET_PAGES";
export const GET_PAGES_SUCCESS = "GET_PAGES_SUCCESS";
export const GET_PAGES_FAIL = "GET_PAGES_FAIL";

export const GET_PAGE = "GET_PAGE";
export const GET_PAGE_SUCCESS = "GET_PAGE_SUCCESS";
export const GET_PAGE_FAIL = "GET_PAGE_FAIL";

export const DELETE_PAGE = "DELETE_PAGE";
export const DELETE_PAGE_SUCCESS = "DELETE_PAGE_SUCCESS";
export const DELETE_PAGE_FAIL = "DELETE_PAGE_FAIL";

export const SEARCH_PAGE = "SEARCH_PAGE";
export const SEARCH_PAGE_SUCCESS = "SEARCH_PAGE_SUCCESS";
export const SEARCH_PAGE_FAIL = "SEARCH_PAGE_FAIL";

export const GET_MENU = "GET_MENU";
export const GET_MENU_SUCCESS = "GET_MENU_SUCCESS";
export const GET_MENU_FAIL = "GET_MENU_FAIL";

export const REORDER_MENU = "REORDER_MENU";

export const UPDATE_MENU = "UPDATE_MENU";
export const UPDATE_MENU_SUCCESS = "UPDATE_MENU_SUCCESS";
export const UPDATE_MENU_FAIL = "UPDATE_MENU_FAIL";

export const CLEAR_SUCCESS = "CLEAR_SUCCESS";
export const CLEAR_ERROR = "CLEAR_ERROR";

export function getPages(page = 1) {
	return {
		type: GET_PAGES,
		payload: {
			request: {
				url: `/pages?page=${page}`,
				method: "GET"
			}
		}
	};
}

export function getPage(pageId) {
	return {
		type: GET_PAGE,
		payload: {
			request: {
				url: `/pages/${pageId}`,
				method: "GET"
			}
		}
	};
}

export function deletePage(pageId) {
	return {
		type: DELETE_PAGE,
		payload: {
			pageId: pageId,
			request: {
				url: `/pages/${pageId}`,
				method: "DELETE"
			}
		}
	};
}

export function searchPage(query) {
	return {
		type: SEARCH_PAGE,
		payload: {
			request: {
				url: `/pages/search`,
				method: "POST",
				data: {
					q: query
				}
			}
		}
	};
}

export function getMenu() {
	return {
		type: GET_MENU,
		payload: {
			request: {
				url: "/pages/menu",
				method: "GET"
			}
		}
	};
}

export function reorderMenu(menu) {
	return {
		type: REORDER_MENU,
		payload: { menu }
	};
}

export function updateMenu(menu) {
	return {
		type: UPDATE_MENU,
		payload: {
			request: {
				url: "/pages/menu",
				method: "PUT",
				data: { menu }
			}
		}
	};
}

export function clearSuccess() {
	return {
		type: CLEAR_SUCCESS
	};
}

export function clearError() {
	return {
		type: CLEAR_ERROR
	};
}
