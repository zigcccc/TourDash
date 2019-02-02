export const SAVE_ACCOMMODATION = "SAVE_ACCOMMODATION";
export const SAVE_ACCOMMODATION_SUCCESS = "SAVE_ACCOMMODATION_SUCCESS";
export const SAVE_ACCOMMODATION_FAIL = "SAVE_ACCOMMODATION_FAIL";

export const GET_ACCOMMODATIONS = "GET_ACCOMMODATIONS";
export const GET_ACCOMMODATIONS_SUCCESS = "GET_ACCOMMODATIONS_SUCCESS";
export const GET_ACCOMMODATIONS_FAIL = "GET_ACCOMMODATIONS_FAIL";

export const SEARCH_ACCOMMODATIONS = "SEARCH_ACCOMMODATIONS";
export const SEARCH_ACCOMMODATIONS_SUCCESS = "SEARCH_ACCOMMODATIONS_SUCCESS";
export const SEARCH_ACCOMMODATIONS_FAIL = "SEARCH_ACCOMMODATIONS_FAIL";

export const DELETE_ACCOMMODATION = "DELETE_ACCOMMODATION";
export const DELETE_ACCOMMODATION_SUCCESS = "DELETE_ACCOMMODATION_SUCCESS";
export const DELETE_ACCOMMODATION_FAIL = "DELETE_ACCOMMODATION_FAIL";

export const GET_ACCOMMODATION = "GET_ACCOMMODATION";
export const GET_ACCOMMODATION_SUCCESS = "GET_ACCOMMODATION_SUCCESS";
export const GET_ACCOMMODATION_FAIL = "GET_ACCOMMODATION_FAIL";

export const UPDATE_ACCOMMODATION = "UPDATE_ACCOMMODATION";
export const UPDATE_ACCOMMODATION_SUCCESS = "UPDATE_ACCOMMODATION_SUCCESS";
export const UPDATE_ACCOMMODATION_FAIL = "UPDATE_ACCOMMODATION_FAIL";

export const CLEAR_SUCCESS_AND_ERRORS = "CLEAR_SUCCESS_AND_ERRORS";

export const saveAccommodation = (data, userId) => ({
	type: SAVE_ACCOMMODATION,
	payload: {
		request: {
			url: "/accommodations",
			method: "POST",
			data: { ...data, author_id: userId }
		}
	}
});

export const getAccommodations = () => ({
	type: GET_ACCOMMODATIONS,
	payload: {
		request: {
			url: "/accommodations",
			method: "GET"
		}
	}
});

export const searchAccommodations = query => ({
	type: SEARCH_ACCOMMODATIONS,
	payload: {
		request: {
			url: "/accommodations/search",
			method: "POST",
			data: { q: query }
		}
	}
});

export const deleteAccommodation = id => ({
	type: DELETE_ACCOMMODATION,
	payload: {
		id: id,
		request: {
			url: `/accommodations/${id}`,
			method: "DELETE"
		}
	}
});

export const getAccommodation = id => ({
	type: GET_ACCOMMODATION,
	payload: {
		request: {
			url: `/accommodations/${id}`,
			method: "GET"
		}
	}
});

export const updateAccommodation = (data, userId, id) => ({
	type: UPDATE_ACCOMMODATION,
	payload: {
		request: {
			url: `/accommodations/${id}`,
			method: "PUT",
			data: { ...data, author_id: userId }
		}
	}
});

export const clearMessages = () => ({
	type: CLEAR_SUCCESS_AND_ERRORS
});
