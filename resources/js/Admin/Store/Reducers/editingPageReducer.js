import { produce } from "immer";
import _move from "lodash-move";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";
import _flattenDeep from "lodash/flattenDeep";
import { contentBlocksDefaultContent } from "../defaultContents";
import { editingPageDummyContent } from "../dummyContents";
import {
	SET_ACTIVE_BLOCK,
	UNSET_ACTIVE_BLOCK,
	MOVE_BLOCK_UP,
	MOVE_BLOCK_DOWN,
	DELETE_BLOCK,
	SET_PAGE_TYPE,
	SET_PAGE_UPDATE_STATUS,
	SET_TYPOGRAPHY_BLOCK_TAG,
	TOGGLE_FLUID_BLOCK,
	SET_BLOCK_STYLE,
	SET_BLOCK_CONTENT,
	ADD_NEW_BLOCK,
	SET_BLOCK_PROPERTY
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
	contentBlocksCount: 5,
	contentBlocksUsed: 5,
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

		case ADD_NEW_BLOCK: {
			let { blockType } = action.payload;
			let newUid = state.contentBlocksUsed + 1;
			let defaultContent = {
				...contentBlocksDefaultContent[blockType],
				type: blockType,
				uid: newUid
			};

			if (state.editingBlock.type === "columns") {
				let index = state.editingBlockIndex;
				return produce(state, draft => {
					draft.contentBlocksCount++;
					draft.contentBlocksUsed++;
					draft.content[index].data = [
						...draft.content[index].data,
						{
							...defaultContent,
							hasParent: true,
							parentBlockUid: state.editingBlock.uid
						}
					];
					draft.editingBlock = {
						...defaultContent,
						hasParent: true,
						parentBlockUid: state.editingBlock.uid
					};
					draft.editingBlockIndex = draft.content[index].data.length - 1;
				});
			} else {
				return produce(state, draft => {
					draft.contentBlocksCount++;
					draft.contentBlocksUsed++;
					draft.content = [...draft.content, defaultContent];
					draft.editingBlock = defaultContent;
					draft.editingBlockIndex = draft.content.length - 1;
				});
			}
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
			let { index, blockId, hasParent, parentId } = action.payload;
			if (hasParent) {
				let parentIndex = getParentIndex(state.content, parentId);
				return produce(state, draft => {
					draft.content[parentIndex].data = _move(
						draft.content[parentIndex].data,
						index,
						index - 1
					);
					if (blockId === state.editingBlock.uid) {
						draft.editingBlockIndex--;
					}
				});
			} else {
				return produce(state, draft => {
					draft.content = _move(draft.content, index, index - 1);
					if (blockId === state.editingBlock.uid) {
						draft.editingBlockIndex--;
					}
				});
			}
		}
		case MOVE_BLOCK_DOWN: {
			let { index, blockId, hasParent, parentId } = action.payload;
			if (hasParent) {
				let parentIndex = getParentIndex(state.content, parentId);
				return produce(state, draft => {
					draft.content[parentIndex].data = _move(
						draft.content[parentIndex].data,
						index,
						index + 1
					);
					if (blockId === state.editingBlock.uid) {
						draft.editingBlockIndex++;
					}
				});
			} else {
				return produce(state, draft => {
					draft.content = _move(draft.content, index, index + 1);
					if (blockId === state.editingBlock.uid) {
						draft.editingBlockIndex++;
					}
				});
			}
		}

		// Delete block
		case DELETE_BLOCK: {
			let { blockId, hasParent, parentUid } = action.payload;
			let isActiveBlock = blockId === state.editingBlock.uid;
			if (hasParent) {
				let parentIndex = getParentIndex(state.content, parentUid);
				return produce(state, draft => {
					draft.contentBlocksCount--;
					draft.content[parentIndex].data = draft.content[
						parentIndex
					].data.filter(item => item.uid !== blockId);
					if (isActiveBlock) {
						draft.editingBlock = {};
						draft.editingBlockIndex = null;
					}
				});
			} else {
				return produce(state, draft => {
					draft.contentBlocksCount--;
					draft.content = draft.content.filter(item => item.uid !== blockId);
					if (isActiveBlock) {
						draft.editingBlock = {};
						draft.editingBlockIndex = null;
					}
				});
			}
		}

		// Toggle fluid block
		case TOGGLE_FLUID_BLOCK: {
			return produce(state, draft => {
				draft.content[draft.editingBlockIndex].isFluid = action.payload.state;
				draft.editingBlock.isFluid = action.payload.state;
			});
		}

		// Set block content
		case SET_BLOCK_CONTENT: {
			let { content } = action.payload;
			let { hasParent, parentBlockUid } = state.editingBlock;
			if (hasParent) {
				let parentIndex = getParentIndex(state.content, parentBlockUid);
				return produce(state, draft => {
					draft.content[parentIndex].data[
						draft.editingBlockIndex
					].data = content;
					draft.editingBlock.data = content;
				});
			} else {
				return produce(state, draft => {
					draft.content[draft.editingBlockIndex].data = content;
					draft.editingBlock.data = content;
				});
			}
		}

		// Set block property
		case SET_BLOCK_PROPERTY: {
			let { property, value } = action.payload;
			let { hasParent, parentBlockUid } = action.payload;
			let newValue = { [property]: value };

			if (hasParent) {
				let parentIndex = getParentIndex(state.content, parentBlockUid);
				return produce(state, draft => {
					let oldData =
						draft.content[parentIndex].data[draft.editingBlockIndex].data;
					draft.content[parentIndex].data[draft.editingBlockIndex].data = {
						...oldData,
						...newValue
					};
					draft.editingBlock.data = {
						...oldData,
						...newValue
					};
				});
			} else {
				return produce(state, draft => {
					draft.content[draft.editingBlockIndex].data = {
						...draft.content[draft.editingBlockIndex].data,
						...newValue
					};
					draft.editingBlock.data = {
						...draft.editingBlock.data,
						...newValue
					};
				});
			}
		}

		// Set Block Style
		case SET_BLOCK_STYLE: {
			let { property, value } = action.payload;
			let { hasParent, parentBlockUid } = state.editingBlock;
			let newStyle = { [property]: value };

			if (hasParent) {
				let parentIndex = getParentIndex(state.content, parentBlockUid);
				return produce(state, draft => {
					let options =
						draft.content[parentIndex].data[draft.editingBlockIndex].options;

					draft.content[parentIndex].data[draft.editingBlockIndex].options = {
						...options,
						style: {
							...(options && options.style ? options.style : {}),
							...newStyle
						}
					};

					draft.editingBlock.options = {
						...draft.editingBlock.options,
						style: {
							...(options && options.style ? options.style : {}),
							...newStyle
						}
					};
				});
			} else {
				return produce(state, draft => {
					let options = draft.content[draft.editingBlockIndex].options;

					draft.content[draft.editingBlockIndex].options = {
						...draft.content[draft.editingBlockIndex].options,
						style: {
							...(options && options.style ? options.style : {}),
							...newStyle
						}
					};
					draft.editingBlock.options = {
						...draft.editingBlock.options,
						style: {
							...(options && options.style ? options.style : {}),
							...newStyle
						}
					};
				});
			}
		}

		// Set typography block tag
		case SET_TYPOGRAPHY_BLOCK_TAG: {
			let { tag } = action.payload;
			let { hasParent, parentBlockUid } = state.editingBlock;
			if (hasParent) {
				let parentIndex = getParentIndex(state.content, parentBlockUid);
				return produce(state, draft => {
					draft.content[parentIndex].data[
						draft.editingBlockIndex
					].options.tag = tag;
					draft.editingBlock.options.tag = tag;
				});
			} else {
				return produce(state, draft => {
					draft.content[draft.editingBlockIndex].options.tag = tag;
					draft.editingBlock.options.tag = tag;
				});
			}
		}

		default: {
			return state;
		}
	}
};

function getParentIndex(state, id) {
	return _findIndex(state, ["uid", id]);
}

export default editingPageReducer;
