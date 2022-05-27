const userReducer = (state, { type, payload }) => {
	switch (type) {
		case "SET_USER_PROFILE":
			return { ...state, userProfile: payload.userProfile };
		case "GET_ALL_USERS":
			return { ...state, users: payload.users };
		default:
			return state;
	}
};
export { userReducer };
