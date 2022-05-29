const profileReducer = (state, { type, payload }) => {
	switch (type) {
		case "UPDATE_PROFILE":
			return {
				...state,
				...payload,
			};
		case "UPDATE_PROFILE_URL":
			return {
				...state,
				profileURL: payload.profileURL,
			};
		case "UPDATE_BACKGROUND_URL":
			return {
				...state,
				backgroundURL: payload.backgroundURL,
			};
		default:
			return state;
	}
};

export { profileReducer };
