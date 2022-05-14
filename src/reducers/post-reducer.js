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
		case "UPDATE_CREATED_DATE":
			return {
				...state,
				newPost: {
					...state.newPost,
					createdAt: payload.newPost.createdAt,
				},
			};
		case "UPDATE_UPLOADED_URL":
			return {
				...state,
				newPost: {
					...state.newPost,
					fileUrls: [
						...state.newPost.fileUrls,
						{ ...payload.newPost.fileUrls },
					],
				},
			};

		case "GET_FEED_POST":
			return {
				...state,
				feedPosts: [...state.feedPosts, ...payload.feedPosts],
			};
		case "GET_EXPLORE_POST":
			return {
				...state,
				explorePosts: [...state.explorePosts, ...payload.explorePosts],
			};
		case "RESET_FORM":
			return {
				...state,
				newPost: { ...payload.newPost },
			};

		default:
			return state;
	}
};
export { postReducer };
