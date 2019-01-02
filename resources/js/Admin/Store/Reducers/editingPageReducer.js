import { produce } from "immer";
import _move from "lodash-move";
import _findIndex from "lodash/findIndex";
import { editingPageDummyContent } from "../dummyContents";
import {
	SET_ACTIVE_BLOCK,
	UNSET_ACTIVE_BLOCK,
	MOVE_BLOCK_UP,
	MOVE_BLOCK_DOWN,
	DELETE_BLOCK,
	SET_PAGE_TYPE,
	SET_PAGE_UPDATE_STATUS
} from "../Actions/EditingPageActions";

const initialState = {
	editingBlock: {},
	editingBlockIndex: null,
	pageTitle: "Ime strani",
	slug: "ime-strani",
	slugOverriden: false,
	hasBeenUpdated: false,
	type: "vsebinska",
	savingPage: false,
	content: editingPageDummyContent
};

const editingPageReducer = (state = initialState, action) => {
	switch (action.type) {
		// Set page meta
		case SET_PAGE_TYPE: {
			return produce(state, draft => {
				draft.type = action.payload.type;
			});
		}

		// Set page update status
		case SET_PAGE_UPDATE_STATUS: {
			return produce(state, draft => {
				draft.hasBeenUpdated = action.payload.status;
			});
		}

		// Togle active block state
		case SET_ACTIVE_BLOCK: {
			return produce(state, draft => {
				draft.editingBlock = action.payload.block;
				draft.editingBlockIndex = action.payload.index;
				draft.editingBlockRelation = action.payload.blockRelation;
			});
		}
		case UNSET_ACTIVE_BLOCK: {
			return produce(state, draft => {
				draft.editingBlock = {};
				draft.editingBlockIndex = null;
			});
		}

		// Move block
		case MOVE_BLOCK_UP: {
			let { index, hasParent, parentId } = action.payload;
			if (hasParent) {
				let parentIndex = _findIndex(state.content, ["uid", parentId]);
				if (parentIndex >= 0 && index !== 0) {
					return produce(state, draft => {
						draft.content[parentIndex].data = _move(
							draft.content[parentIndex].data,
							index,
							index - 1
						);
					});
				} else {
					return state;
				}
			} else {
				if (index !== 0) {
					return produce(state, draft => {
						draft.content = _move(draft.content, index, index - 1);
					});
				} else {
					return state;
				}
			}
		}
		case MOVE_BLOCK_DOWN: {
			let { index, hasParent, parentId } = action.payload;
			if (hasParent) {
				let parentIndex = _findIndex(state.content, ["uid", parentId]);
				if (
					parentIndex >= 0 &&
					index < state.content[parentIndex].data.length - 1
				) {
					return produce(state, draft => {
						draft.content[parentIndex].data = _move(
							draft.content[parentIndex].data,
							index,
							index + 1
						);
					});
				} else {
					return state;
				}
			} else {
				if (index < state.content.length - 1) {
					return produce(state, draft => {
						draft.content = _move(draft.content, index, index + 1);
					});
				} else {
					return state;
				}
			}
		}

		// Delete block
		case DELETE_BLOCK: {
			let { blockId, hasParent, parentUid } = action.payload;
			if (hasParent) {
				let parentIndex = _findIndex(state.content, ["uid", parentUid]);
				return produce(state, draft => {
					draft.content[parentIndex].data = draft.content[
						parentIndex
					].data.filter(item => item.uid !== blockId);
				});
			} else {
				return produce(state, draft => {
					draft.content = draft.content.filter(item => item.uid !== blockId);
				});
			}
		}

		default: {
			return state;
		}
	}
};

function getParentIndex(state, id) {
	let parentIndex = null;
	state.content.forEach((block, i) => {
		if (
			typeof block.data === "object" &&
			block.data.filter(item => item.uid === id)
		) {
			parentIndex = i;
		}
	});
	return parentIndex;
}

export default editingPageReducer;
