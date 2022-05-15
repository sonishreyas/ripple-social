import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "redux/features";

export const store = configureStore({
	reducer: {
		posts: postReducer,
	},
});
