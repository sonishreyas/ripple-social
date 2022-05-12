import { createContext, useContext, useReducer, useState } from "react";
import { postReducer } from "reducers";

const defaultPostInitialState = {
	newPost: {
		postText: "",
		uploadedFiles: [],
		fileUrls: [],
	},
	feedPosts: [],
	explorePosts: [],
};
const PostContext = createContext();

const PostProvider = ({ children }) => {
	const [postState, postDispatch] = useReducer(
		postReducer,
		defaultPostInitialState
	);
	const [showPostModal, setShowPostModal] = useState(false);
	// console.log(postState);
	return (
		<PostContext.Provider
			value={{ postState, postDispatch, showPostModal, setShowPostModal }}
		>
			{children}
		</PostContext.Provider>
	);
};

const usePost = () => useContext(PostContext);

export { usePost, PostProvider };
