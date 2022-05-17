import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getExplorePost, getFeedPost } from "backend";
import { useToast } from "custom-hooks";
import { db } from "backend/firebase/firebase";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { storage } from "backend/firebase/firebase";
import { useSelector } from "react-redux";

export const getPosts = createAsyncThunk(
	"posts/getPosts",
	async (_, { rejectWithValue }) => {
		try {
			const res = getExplorePost();
			return res;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getFeedPosts = createAsyncThunk(
	"posts/getFeedPosts",
	async ({ userFollowing }, { rejectWithValue }) => {
		try {
			const res = await getFeedPost(userFollowing);
			console.log("res", res);
			return res;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const editPost = createAsyncThunk(
	"users/editPost",
	async ({ postId, updatedValue }, { rejectWithValue }) => {
		try {
			const res = await editPost(postId, updatedValue);
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deletePost = createAsyncThunk(
	"users/deletePost",
	async ({ postId }, { rejectWithValue }) => {
		try {
			const res = await deletePost(postId);
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const addNewPost = createAsyncThunk(
	"users/deletePost",
	async ({ newPost, showToast, msg }, { rejectWithValue }) => {
		try {
			const res = await addNewPost(newPost, showToast, msg);
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	status: "idle",
	error: null,
	feedPosts: [],
	allPosts: [],
	explorePosts: [],
	showPostModal: false,
	showScheduleDateInput: false,
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		sortByValue: (state, action) => {
			state.sortBy = action.payload;
		},
		setShowPostModal: (state, { payload }) => {
			state.showPostModal = payload.showPostModal;
		},
		setShowScheduleDateInput: (state, { payload }) => {
			state.showPostModal = payload.showScheduleDateInput;
		},
	},
	extraReducers: {
		[getPosts.fulfilled]: (state, { payload }) => {
			state.allPosts = payload;
		},
		[getPosts.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[getFeedPosts.fulfilled]: (state, { payload }) => {
			state.feedPosts = payload;
		},
		[getFeedPosts.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[getFeedPosts.fulfilled]: (state, { payload }) => {
			state.feedPosts = payload;
		},
	},
});

export const { sortByValue, setShowPostModal, setShowScheduleDateInput } =
	postSlice.actions;
export const postReducer = postSlice.reducer;
export const usePosts = () => useSelector((state) => state.posts);
