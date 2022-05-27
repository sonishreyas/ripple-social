import { configureStore } from "@reduxjs/toolkit";
import {
	authReducer,
	postReducer,
	usersReducer,
	themeReducer,
	navbarReducer,
	modalReducer,
} from "features";

export const store = configureStore({
	reducer: {
		posts: postReducer,
		auth: authReducer,
		users: usersReducer,
		theme: themeReducer,
		modal: modalReducer,
		navbar: navbarReducer,
	},
});
