export const SAVE_ACCOMMODATION = "SAVE_ACCOMMODATION";
export const SAVE_ACCOMMODATION_SUCCESS = "SAVE_ACCOMMODATION_SUCCESS";
export const SAVE_ACCOMMODATION_FAIL = "SAVE_ACCOMMODATION_FAIL";

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

export const clearMessages = () => ({
	type: CLEAR_SUCCESS_AND_ERRORS
});
