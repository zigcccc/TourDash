import produce from "immer";
import _findIndex from "lodash/findIndex";
import _flatten from "lodash/flatten";
import {
	CLEAR_MESSAGES,
	GET_SETTINGS,
	GET_SETTINGS_SUCCESS,
	GET_SETTINGS_FAIL,
	SAVE_SETTINGS,
	SAVE_SETTINGS_SUCCESS,
	SAVE_SETTINGS_FAIL
} from "../Actions/SettingsActions";

const initialState = {
	hasErrors: false,
	errorMessage: "",
	hasSuccess: false,
	successMessage: "",
	loading: true,
	saving: false,
	data: {
		marketing: {},
		visual: {},
		contact: {}
	}
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		// Get settings
		case GET_SETTINGS: {
			return {
				...state,
				hasErrors: false,
				hasSuccess: false,
				loading: true
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
				loading: false,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.data.error
					: "Pri pridobivanju nastavitev je prišlo do težave..."
			};
		}

		// Save settings
		case SAVE_SETTINGS: {
			return {
				...state,
				hasErrors: false,
				hasSuccess: false,
				saving: true
			};
		}
		case SAVE_SETTINGS_SUCCESS: {
			let { type } = action.meta.previousAction.payload;
			let { data } = action.payload.data;
			return {
				...state,
				saving: false,
				hasSuccess: true,
				successMessage: "Nastavitve uspešno posodobljene",
				data: {
					...state.data,
					[type]: data.reduce((result, setting) => {
						let key = Object.keys(setting)[0];
						result[key] = setting[key];
						return result;
					}, {})
				}
			};
		}
		case SAVE_SETTINGS_FAIL: {
			return {
				...state,
				saving: false,
				hasErrors: true,
				errorMessage: action.payload
					? action.payload.error
					: "Pri sharanjevanju nastavitev je prišlo do težave..."
			};
		}

		// Clear success and error message
		case CLEAR_MESSAGES: {
			return {
				...state,
				hasErrors: false,
				hasSuccess: false
			};
		}

		default: {
			return state;
		}
	}
};

export default settingsReducer;
