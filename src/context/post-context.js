import { createContext, useContext, useReducer, useState } from "react";
import { postReducer } from "reducers";

const defaultPostInitialState = {
	newPost: {
		postText: "",
		fileUrls: [],
		createdAt: "",
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
	const [showScheduleDateInput, setShowScheduleDateInput] = useState(false);

	return (
		<PostContext.Provider
			value={{
				postState,
				postDispatch,
				showPostModal,
				setShowPostModal,
				showScheduleDateInput,
				setShowScheduleDateInput,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

const usePost = () => useContext(PostContext);

export { usePost, PostProvider };
