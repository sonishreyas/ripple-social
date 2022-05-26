import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getExplorePost,
	getFeedPost,
	addPostToBookmark,
	removePostFromBookmark,
	getBookmarkDataHandler,
	addNewPost,
	editPostHandler,
} from "backend";
import { deletePostHandler } from "backend/utils";
import { useSelector } from "react-redux";
import { removeFromArray, removeObjFromArray, updateArray } from "utils";

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
			return res;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const editPost = createAsyncThunk(
	"users/editPost",
	async ({ postId, updatedValue, showToast, msg }, { rejectWithValue }) => {
		try {
			const res = await editPostHandler(postId, updatedValue, showToast, msg);
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
			const res = await deletePostHandler(postId);
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
	editPostData: {
		postText: "",
		fileUrls: [],
	},
	showEditPostModal: false,
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
			state.showScheduleDateInput = payload;
		},
		setShowEditPostModal: (state, { payload }) => {
			state.showEditPostModal = payload;
		},
		setEditPost: (state, { payload }) => {
			state.editPostData = { ...payload };
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
			console.log(payload);
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
		[deletePost.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[deletePost.fulfilled]: (state, { payload }) => {
			state.allPosts = removeObjFromArray(state.allPosts, payload);
			state.feedPosts = removeObjFromArray(state.feedPosts, payload);
			state.explorePosts = removeObjFromArray(state.explorePosts, payload);
			state.itemsInBookmark = removeFromArray(state.itemsInBookmark, payload);
		},
		[editPost.rejected]: (state, { payload }) => {
			console.log(payload);
		},
		[editPost.fulfilled]: (state, { payload }) => {
			console.log(payload);
			state.allPosts = updateArray(state.allPosts, payload);
			state.feedPosts = updateArray(state.feedPosts, payload);
			state.explorePosts = updateArray(state.explorePosts, payload);
			state.itemsInBookmark = updateArray(state.itemsInBookmark, payload);
			console.log(state.allPosts);
		},
	},
});

export const {
	sortByValue,
	setShowPostModal,
	setShowScheduleDateInput,
	setShowEditPostModal,
	setEditPost,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
export const usePosts = () => useSelector((state) => state.posts);
