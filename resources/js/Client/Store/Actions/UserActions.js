export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";

export const getUser = token => ({
	type: GET_USER,
	payload: {
		request: {
			url: `/auth-user`,
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	}
});

export const UPDATE_SAVED_ITEMS = "UPDATE_SAVED_ITEMS";
export const UPDATE_SAVED_ITEMS_SUCCESS = "UPDATE_SAVED_ITEMS_SUCCESS";
export const UPDATE_SAVED_ITEMS_FAIL = "UPDATE_SAVED_ITEMS_FAIL";

export const updateSavedItems = (saved_items, user_id, accommodation) => ({
	type: UPDATE_SAVED_ITEMS,
	payload: {
		request: {
			url: `/user/${user_id}/saved-items`,
			method: "POST",
			data: { saved_items, accommodation }
		}
	}
});
