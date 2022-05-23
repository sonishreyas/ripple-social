import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getCurrentUser, updateUserData } from "backend";
import { useSelector } from "react-redux";

export const getUsers = createAsyncThunk(
	"users/getUsers",
	async (_, { rejectWithValue }) => {
		try {
			const res = await getAllUsers();
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUser = createAsyncThunk(
	"users/getUser",
	async ({ uid }, { rejectWithValue }) => {
		try {
			const res = await getCurrentUser(uid);
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateUser = createAsyncThunk(
	"users/updateUser",
	async ({ userId, updatedValue }, { rejectWithValue }) => {
		try {
			console.log(userId, updatedValue);
			const res = await updateUserData(userId, updatedValue);
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	userProfile: {},
	users: [],
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		reset: (state) => {
			state.userProfile = {};
			state.users = [];
		},
	},
	extraReducers: {
		[getUser.fulfilled]: (state, { payload }) => {
			state.userProfile = payload;
		},
		[getUser.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[getUsers.fulfilled]: (state, { payload }) => {
			state.users = payload;
		},
		[getUsers.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[updateUser.fulfilled]: (state, { payload }) => {
			console.log("here", payload);
			state.users = state.users.map((user) =>
				user.uid === payload.uid ? { ...user, ...payload } : user
			);
			if (payload.uid === state.userProfile.uid)
				state.userProfile = { ...state.userProfile, ...payload };
		},
		[updateUser.rejected]: (state, { payload }) => {
			console.log(payload);
		},
	},
});

export const usersReducer = usersSlice.reducer;
export const { reset } = usersSlice.actions;
export const useUser = () => useSelector((state) => state.users);
