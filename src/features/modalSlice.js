import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
	message: null,
	handleConfirm: null,
	handleDismiss: null,
	confirmChoice: "Yes",
	dismissChoice: "No",
	showModal: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setModal: (state, { payload }) => {
			state.message = payload.message;
			state.handleConfirm = payload.handleConfirm;
			state.handleDismiss = payload.handleDismiss;
			state.confirmChoice = payload.confirmChoice;
			state.dismissChoice = payload.dismissChoice;
		},
		setShowModal: (state, { payload }) => {
			state.showModal = payload.showModal;
		},
		resetModal: (state) => {
			state.message = null;
			state.handleConfirm = null;
			state.handleDismiss = null;
			state.confirmChoice = "Yes";
			state.dismissChoice = "No";
		},
	},
});

export const { setModal, setShowModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
export const useModal = () => useSelector((state) => state.modal);
