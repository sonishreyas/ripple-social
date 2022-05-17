import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
	showNavbar: false,
};

const navbarSlice = createSlice({
	name: "navbar",
	initialState,
	reducers: {
		toggleNavbar: (state, { payload }) => {
			state.showNavbar = payload.showNavbar;
		},
	},
});

export const { toggleNavbar } = navbarSlice.actions;
export const navbarReducer = navbarSlice.reducer;
export const useNavbar = () => useSelector((state) => state.navbar);
