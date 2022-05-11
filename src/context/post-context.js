import { createContext, useContext, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
	const [showPostModal, setShowPostModal] = useState(false);
	return (
		<PostContext.Provider value={{ showPostModal, setShowPostModal }}>
			{children}
		</PostContext.Provider>
	);
};

const usePost = () => useContext(PostContext);

export { usePost, PostProvider };
