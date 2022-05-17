import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "reducers";
import {
	authReducer,
	postReducer,
	usersReducer,
	themeReducer,
	navbarReducer,
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
