import { configureStore } from "@reduxjs/toolkit";
import { authReducer, postReducer } from "redux/features";

export const store = configureStore({
	reducer: {
		posts: postReducer,
		auth: authReducer,
	},
});
