import { removeFromArray } from "../utils";
/**
 * Reducer function to handle bookmark state
 * @param {Object} state State values of bookmark
 * @param {*} bookmarkAction The changed state
 * @returns Updated state into state
 */
const bookmarkReducer = (state, { type, payload }) => {
	switch (type) {
		case "ADD_ITEM":
			return {
				...state,
				itemsInBookmark: [...payload.itemsInBookmark],
			};
		case "REMOVE_ITEM":
			return {
				...state,
				itemsInBookmark: [...payload.itemsInBookmark],
				// itemsInBookmark: removeFromArray(
				// 	state.itemsInBookmark,
				// 	payload.itemsInBookmark
				// ),
			};
		case "RESET":
			return {
				...state,
				itemsInBookmark: [],
			};
		default:
			return state;
	}
};

export { bookmarkReducer };
