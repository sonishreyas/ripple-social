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
		case "UPDATE_UPLOAD_FILE":
			return {
				...state,
				newPost: {
					...state.newPost,
					uploadedFiles: [
						...state.newPost.uploadedFiles,
						{ ...payload.newPost.uploadedFiles },
					],
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
		default:
			return state;
	}
};
export { postReducer };
