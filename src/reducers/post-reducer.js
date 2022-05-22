const postReducer = (state, { type, payload }) => {
	switch (type) {
		case "UPDATE_POST_TEXT":
			return {
				...state,
				newPost: {
					...state?.newPost,
					postText: payload?.newPost?.postText,
				},
			};
		default:
			return state;
	}
};
export { postReducer };
