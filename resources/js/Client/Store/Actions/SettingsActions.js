export const GET_SETTINGS = "GET_VISUAL_SETTINGS";
export const GET_SETTINGS_SUCCESS = "GET_VISUAL_SETTINGS_SUCCESS";
export const GET_SETTINGS_FAIL = "GET_VISUAL_SETTINGS_FAIL";

export const getSettings = type => ({
	type: GET_SETTINGS,
	payload: {
		type: type,
		request: {
			url: `/settings/${type}`,
			method: "GET"
		}
	}
});
