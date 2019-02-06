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
