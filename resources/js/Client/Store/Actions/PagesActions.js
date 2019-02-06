export const GET_MENU = "GET_MENU";
export const GET_MENU_SUCCESS = "GET_MENU_SUCCESS";
export const GET_MENU_FAIL = "GET_MENU_FAIL";
export const getMenu = () => ({
	type: GET_MENU,
	payload: {
		request: {
			url: "/pages/menu",
			method: "GET"
		}
	}
});

export const GET_HOMEPAGE = "GET_HOMEPAGE";
export const GET_HOMEPAGE_SUCCESS = "GET_HOMEPAGE_SUCCESS";
export const GET_HOMEPAGE_FAIL = "GET_HOMEPAGE_FAIL";
export const getHomepage = () => ({
	type: GET_HOMEPAGE,
	payload: {
		request: {
			url: "/pages/homepage",
			method: "GET"
		}
	}
});

export const GET_PAGE = "GET_PAGE";
export const GET_PAGE_SUCCESS = "GET_PAGE_SUCCESS";
export const GET_PAGE_FAIL = "GET_PAGE_FAIL";
export const getPage = id => ({
	type: GET_PAGE,
	payload: {
		pageId: id,
		request: {
			url: `/pages/${id}`,
			method: "GET"
		}
	}
});
