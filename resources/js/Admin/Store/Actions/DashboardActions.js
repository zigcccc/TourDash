export const GET_PAGES_PREVIEW = "GET_PAGES_PREVIEW";
export const GET_PAGES_PREVIEW_SUCCESS = "GET_PAGES_PREVIEW_SUCCESS";
export const GET_PAGES_PREVIEW_FAIL = "GET_PAGES_PREVIEW_FAIL";

export const GET_USERS_PREVIEW = "GET_USERS_PREVIEW";
export const GET_USERS_PREVIEW_SUCCESS = "GET_USERS_PREVIEW_SUCCESS";
export const GET_USERS_PREVIEW_FAIL = "GET_USERS_PREVIEW_FAIL";

export const getPagesPreview = () => ({
	type: GET_PAGES_PREVIEW,
	payload: {
		request: {
			url: "/dashboard/pages",
			method: "GET"
		}
	}
});

export const getUsersPreview = (amount = 3) => ({
	type: GET_USERS_PREVIEW,
	payload: {
		request: {
			url: `/dashboard/users?amount=${amount}`,
			method: "GET"
		}
	}
});
