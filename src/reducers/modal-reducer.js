const modalReducer = (state, { type, payload }) => {
	switch (type) {
		case "SET_MODAL":
			return {
				...state,
				message: payload.message,
				handleConfirm: payload.handleConfirm,
				handleDismiss: payload.handleDismiss,
				confirmChoice: payload.confirmChoice,
				dismissChoice: payload.dismissChoice,
			};
		case "RESET_MODAL":
			return {
				message: "",
				handleConfirm: () => {},
				handeDismiss: () => {},
				confirmChoice: "Yes",
				dismissChoice: "No",
			};
		default:
			return state;
	}
};

export { modalReducer };
