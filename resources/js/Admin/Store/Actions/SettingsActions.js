// Clear success and error messages
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";

export const clearMessages = () => ({
	type: CLEAR_MESSAGES
});

// Get settings
export const GET_SETTINGS = "GET_SETTINGS";
export const GET_SETTINGS_SUCCESS = "GET_SETTINGS_SUCCESS";
export const GET_SETTINGS_FAIL = "GET_SETTINGS_FAIL";

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

// Save settings
export const SAVE_SETTINGS = "SAVE_SETTINGS";
export const SAVE_SETTINGS_SUCCESS = "SAVE_SETTINGS_SUCCESS";
export const SAVE_SETTINGS_FAIL = "SAVE_SETTINGS_FAIL";

export const saveSettings = (settings, type) => ({
	type: SAVE_SETTINGS,
	payload: {
		type: type,
		request: {
			url: "/settings",
			method: "POST",
			data: { ...settings, type: type }
		}
	}
});
