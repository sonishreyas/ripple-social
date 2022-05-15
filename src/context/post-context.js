import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { postReducer } from "reducers";
import { getExplorePost, getFeedPost } from "backend";
import { useUser } from ".";

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
	const { userState } = useUser();

	// useEffect(() => {
	// 	if (userState?.userProfile?.following?.length) {
	// 		getFeedPost(userState?.userProfile?.following, postDispatch);
	// 		getExplorePost(postDispatch);
	// 	}
	// }, [userState]);

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
