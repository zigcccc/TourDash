export const SET_ACTIVE_BLOCK = "SET_ACTIVE_BLOCK";
export const UNSET_ACTIVE_BLOCK = "UNSET_ACTIVE_BLOCK";
export const MOVE_BLOCK_UP = "MOVE_BLOCK_UP";
export const MOVE_BLOCK_DOWN = "MOVE_BLOCK_DOWN";
export const DELETE_BLOCK = "DELETE_BLOCK";
export const SET_PAGE_TYPE = "SET_PAGE_TYPE";
export const SET_PAGE_STATUS = "SET_PAGE_STATUS";
export const SET_PAGE_SETTING = "SET_PAGE_SETTING";
export const SET_PAGE_UPDATE_STATUS = "SET_PAGE_UPDATE_STATUS";
export const SET_TYPOGRAPHY_BLOCK_TAG = "SET_TYPOGRAPHY_BLOCK_TAG";
export const SET_BLOCK_CONTENT = "SET_BLOCK_CONTENT";
export const TOGGLE_FLUID_BLOCK = "TOGGLE_FLUID_BLOCK";
export const SET_BLOCK_STYLE = "SET_BLOCK_STYLE";
export const ADD_NEW_BLOCK = "ADD_NEW_BLOCK";
export const SET_BLOCK_PROPERTY = "SET_BLOCK_PROPERTY";
export const CLEAR_EDITING_BLOCK = "CLEAR_EDITING_BLOCK";
export const CREATE_PAGE = "CREATE_PAGE";
export const CREATE_PAGE_SUCCESS = "CREATE_PAGE_SUCCESS";
export const CREATE_PAGE_FAIL = "CREATE_PAGE_FAIL";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_PAGE_SUCCESS = "UPDATE_PAGE_SUCCESS";
export const UPDATE_PAGE_FAIL = "UPDATE_PAGE_FAIL";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const SET_ORIGINAL_STATE = "SET_ORIGINAL_STATE";
export const POPULATE_EDITING_PAGE = "POPULATE_EDITING_PAGE";

export function setActiveBlock(block, index, blockRelation = "parent") {
	return {
		type: SET_ACTIVE_BLOCK,
		payload: {
			block,
			index,
			blockRelation
		}
	};
}

export function unsetActiveBlock() {
	return {
		type: UNSET_ACTIVE_BLOCK
	};
}

export function moveBlockUp(index, blockId, hasParent, parentId = null) {
	return {
		type: MOVE_BLOCK_UP,
		payload: { index, blockId, hasParent, parentId }
	};
}

export function moveBlockDown(index, blockId, hasParent, parentId = null) {
	return {
		type: MOVE_BLOCK_DOWN,
		payload: { index, blockId, hasParent, parentId }
	};
}

export function deleteBlock(blockId, hasParent = false, parentUid = null) {
	return {
		type: DELETE_BLOCK,
		payload: { blockId, hasParent, parentUid }
	};
}

export function setPageSetting(property, value) {
	return {
		type: SET_PAGE_SETTING,
		payload: { property, value }
	};
}

export function setPageType(type) {
	return {
		type: SET_PAGE_TYPE,
		payload: { type }
	};
}

export function setPageStatus(status) {
	return {
		type: SET_PAGE_STATUS,
		payload: { status }
	};
}

export function setPageUpdateStatus(status) {
	return {
		type: SET_PAGE_UPDATE_STATUS,
		payload: { status }
	};
}

export function setTypographyBlockTag(tag) {
	return {
		type: SET_TYPOGRAPHY_BLOCK_TAG,
		payload: { tag }
	};
}

export function toggleFluidBlock(state) {
	return {
		type: TOGGLE_FLUID_BLOCK,
		payload: { state }
	};
}

export function setBlockContent(content) {
	return {
		type: SET_BLOCK_CONTENT,
		payload: { content }
	};
}

export function setBlockStyle(property, value) {
	return {
		type: SET_BLOCK_STYLE,
		payload: { property, value }
	};
}

export function addNewBlock(blockType) {
	return {
		type: ADD_NEW_BLOCK,
		payload: { blockType }
	};
}

export function setBlockProperty(property, value) {
	return {
		type: SET_BLOCK_PROPERTY,
		payload: { property, value }
	};
}

export function clearEditingBlock() {
	return {
		type: CLEAR_EDITING_BLOCK
	};
}

export function createNewPage(title, slug, type, status, content, user_id) {
	return {
		type: CREATE_PAGE,
		payload: {
			request: {
				url: "/pages",
				method: "POST",
				data: { title, slug, type, status, content, user_id }
			}
		}
	};
}

export function updatePage(pageId, data) {
	return {
		type: UPDATE_PAGE,
		payload: {
			request: {
				url: `/pages/${pageId}`,
				method: "PUT",
				data: data
			}
		}
	};
}

export function clearErrors() {
	return {
		type: CLEAR_ERRORS
	};
}

export function setOriginalState() {
	return { type: SET_ORIGINAL_STATE };
}

export function populateEditingPage(title, slug, type, status, content) {
	return {
		type: POPULATE_EDITING_PAGE,
		payload: { title, slug, type, status, content }
	};
}
