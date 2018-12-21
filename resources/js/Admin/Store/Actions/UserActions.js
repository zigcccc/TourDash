export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";

export const UPDATE_PROFILE_IMAGE = "UPDATE_PROFILE_IMAGE";
export const UPDATE_PROFILE_IMAGE_SUCCESS = "UPDATE_PROFILE_IMAGE_SUCCESS";
export const UPDATE_PROFILE_IMAGE_FAIL = "UPDATE_PROFILE_IMAGE_FAIL";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const CLEAR_ERROR = "CLEAR_ERROR";

export function getUser() {
	return {
		type: GET_USER,
		payload: {
			request: {
				url: "/auth-user"
			}
		}
	};
}

export function updateProfileImage(userId, formData) {
	return {
		type: UPDATE_PROFILE_IMAGE,
		payload: {
			request: {
				url: `/user/${userId}/update-profile-image`,
				method: "POST",
				data: formData
			}
		}
	};
}

export function updateUser(userId, data) {
	return {
		type: UPDATE_USER,
		payload: {
			request: {
				url: `/user/${userId}`,
				method: "PUT",
				data: data
			}
		}
	};
}

export function deleteUser(userId) {
	return {
		type: DELETE_USER,
		payload: {
			request: {
				url: `/user/${userId}`,
				method: "DELETE"
			}
		}
	};
}

export function clearError() {
	return {
		type: CLEAR_ERROR
	};
}
