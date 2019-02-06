export const GET_ACCOMMODATIONS = "GET_ACCOMMODATIONS";
export const GET_ACCOMMODATIONS_SUCCESS = "GET_ACCOMMODATIONS_SUCCESS";
export const GET_ACCOMMODATIONS_FAIL = "GET_ACCOMMODATIONS_FAIL";
export const getAccommodations = (orderBy = "price") => ({
	type: GET_ACCOMMODATIONS,
	payload: {
		request: {
			url: `/accommodations?order_by=${orderBy}`,
			method: "GET"
		}
	}
});
