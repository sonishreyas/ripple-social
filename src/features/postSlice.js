import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getExplorePost,
	getFeedPost,
	addPostToBookmark,
	removePostFromBookmark,
	getBookmarkDataHandler,
} from "backend";
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

export const addPost = createAsyncThunk(
	"users/addPost",
	async ({ newPost, showToast, msg }, { rejectWithValue }) => {
		try {
			const res = await addNewPost(newPost, showToast, msg);
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const addToBookmark = createAsyncThunk(
	"users/addToBookmark",
	async ({ userId, updatedValue }, { rejectWithValue }) => {
		try {
			const res = await addPostToBookmark(userId, updatedValue);
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteFromBookmark = createAsyncThunk(
	"users/deleteFromBookmark",
	async ({ userId, updatedValue }, { rejectWithValue }) => {
		try {
			const res = await removePostFromBookmark(userId, updatedValue);
			return res;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getBookmarkData = createAsyncThunk(
	"users/getBookmarkData",
	async ({ userId }, { rejectWithValue }) => {
		try {
			const res = await getBookmarkDataHandler(userId);
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
	itemsInBookmark: [],
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
		[getFeedPosts.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[getFeedPosts.fulfilled]: (state, { payload }) => {
			state.feedPosts = payload;
		},
		[addPost.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[addPost.fulfilled]: (state, { payload }) => {
			state.feedPosts = [...state.feedPosts, { ...payload }];
			state.allPosts = [...state.allPosts, { ...payload }];
			state.explorePosts = [...state.explorePosts, { ...payload }];
		},
		[addToBookmark.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[addToBookmark.fulfilled]: (state, { payload }) => {
			state.itemsInBookmark = payload;
		},
		[deleteFromBookmark.rejected]: (state, { payload }) => {
			console.log(payloaaddNewPostd);
		},
		[deleteFromBookmark.fulfilled]: (state, { payload }) => {
			state.itemsInBookmark = payload;
		},
		[getBookmarkData.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[getBookmarkData.fulfilled]: (state, { payload }) => {
			state.itemsInBookmark = payload;
		},
	},
});

export const { sortByValue, setShowPostModal, setShowScheduleDateInput } =
	postSlice.actions;
export const postReducer = postSlice.reducer;
export const usePosts = () => useSelector((state) => state.posts);
