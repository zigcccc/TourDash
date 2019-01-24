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
