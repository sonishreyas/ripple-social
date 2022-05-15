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
const initialState = {
	status: "idle",
	error: null,
	newPost: {
		postText: "",
		fileUrls: [],
		createdAt: "",
	},
	feedPosts: [],
	allPosts: [],
	explorePosts: [],
};

export const getPosts = createAsyncThunk(
	"posts/getPosts",
	async (_, { rejectWithValue }) => {
		try {
			const postsData = [];
			const q = query(collection(db, "posts"));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				let data = doc.data();
				postsData.push({ id: doc.id, ...data });
			});
			return postsData;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getFeedPosts = createAsyncThunk(
	"posts/getFeedPosts",
	async ({ userFollowing }, { rejectWithValue }) => {
		try {
			const response = await getFeedPost(userFollowing);
			console.log("res", response);
			return response;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		sortByValue: (state, action) => {
			state.sortBy = action.payload;
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

export const { sortByValue } = postSlice.actions;
export const postReducer = postSlice.reducer;
