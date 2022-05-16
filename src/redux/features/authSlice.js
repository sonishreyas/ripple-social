import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginHandler, registerHandler } from "backend";

const initialState = JSON.parse(localStorage.getItem("user")) || {
	token: "",
	email: "",
	uid: "",
	authStatus: "idle",
	authError: null,
};

export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await loginHandler(email, password);
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const register = createAsyncThunk(
	"auth/register",
	async (registerData, { rejectWithValue }) => {
		try {
			const response = await registerHandler(registerData);
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.token = "";
			state.email = "";
			state.uid = "";
		},
	},
	extraReducers: {
		[login.pending]: (state) => {
			state.authStatus = "loading";
		},

		[login.fulfilled]: (state, { payload }) => {
			state.token = payload.token;
			state.email = payload.email;
			state.uid = payload.uid;
			state.authStatus = "success";
			localStorage.setItem("user", JSON.stringify(payload));
		},

		[login.rejected]: (state, { payload }) => {
			state.authStatus = "rejected";
			state.authError = payload.errors;
		},

		[register.pending]: (state) => {
			state.authStatus = "loading";
		},

		[register.fulfilled]: (state, { payload }) => {
			state.token = payload.token;
			state.email = payload.email;
			state.uid = payload.uid;
			state.authStatus = "success";
			localStorage.setItem("user", JSON.stringify(payload));
		},

		[register.rejected]: (state, { payload }) => {
			state.authStatus = "rejected";
			state.authError = payload.errors;
		},
	},
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
