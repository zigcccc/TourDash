import {
	GET_SETTINGS,
	GET_SETTINGS_SUCCESS,
	GET_SETTINGS_FAIL
} from "../Actions/SettingsActions";

const initialState = {
	loading: true,
	hasErrors: false,
	errorMessage: "",
	hasSuccess: false,
	successMessage: "",
	data: {
		contact: {},
		visual: {},
		marketing: {}
	}
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		// Get settings
		case GET_SETTINGS: {
			return {
				...state,
				loading: true,
				hasErrors: false,
				hasSuccess: false
			};
		}
		case GET_SETTINGS_SUCCESS: {
			let { type } = action.meta.previousAction.payload;
			let { data } = action.payload.data;
			return {
				...state,
				data: {
					...state.data,
					[type]: data.reduce((result, setting) => {
						let key = Object.keys(setting)[0];
						result[key] = setting[key];
						return result;
					}, {})
				},
				loading: false
			};
		}
		case GET_SETTINGS_FAIL: {
			return {
				...state,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri pridobivanju nastavitev je prišlo do težave...",
				loading: false
			};
		}

		default: {
			return state;
		}
	}
};

export default settingsReducer;
