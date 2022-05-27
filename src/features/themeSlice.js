import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
	theme: localStorage.getItem("theme")
		? localStorage.getItem("theme")
		: window.matchMedia("(prefers-color-scheme): light").matches
		? "light"
		: "dark",
	themeIcon: localStorage.getItem("theme")
		? localStorage.getItem("theme") === "dark"
			? "sun"
			: "moon"
		: window.matchMedia("(prefers-color-scheme): light").matches
		? "moon"
		: "sun",
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			if (state.theme === "dark") {
				state.theme = "light";
				state.themeIcon = "moon";
			} else {
				state.theme = "dark";
				state.themeIcon = "sun";
			}
			document.querySelector(":root").setAttribute("color-scheme", state.theme);
			localStorage.setItem("theme", state.theme);
		},
	},
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const useTheme = () => useSelector((state) => state.theme);
