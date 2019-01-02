export const SET_ACTIVE_BLOCK = "SET_ACTIVE_BLOCK";
export const UNSET_ACTIVE_BLOCK = "UNSET_ACTIVE_BLOCK";
export const MOVE_BLOCK_UP = "MOVE_BLOCK_UP";
export const MOVE_BLOCK_DOWN = "MOVE_BLOCK_DOWN";
export const DELETE_BLOCK = "DELETE_BLOCK";
export const SET_PAGE_TYPE = "SET_PAGE_TYPE";
export const SET_PAGE_UPDATE_STATUS = "SET_PAGE_UPDATE_STATUS";
export const SET_TYPOGRAPHY_BLOCK_TAG = "SET_TYPOGRAPHY_BLOCK_TAG";
export const SET_BLOCK_CONTENT = "SET_BLOCK_CONTENT";
export const TOGGLE_FLUID_BLOCK = "TOGGLE_FLUID_BLOCK";
export const SET_BLOCK_STYLE = "SET_BLOCK_STYLE";

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

export function moveBlockUp(index, hasParent, parentId = null) {
	return {
		type: MOVE_BLOCK_UP,
		payload: { index, hasParent, parentId }
	};
}

export function moveBlockDown(index, hasParent, parentId = null) {
	return {
		type: MOVE_BLOCK_DOWN,
		payload: { index, hasParent, parentId }
	};
}

export function deleteBlock(blockId, hasParent = false, parentUid = null) {
	return {
		type: DELETE_BLOCK,
		payload: { blockId, hasParent, parentUid }
	};
}

export function setPageType(type) {
	return {
		type: SET_PAGE_TYPE,
		payload: { type }
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
