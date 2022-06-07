import { Posts } from "components";
import { usePosts } from "features";
import { useEffect, useState } from "react";
import { getPostDataFromId } from "utils";

const BookmarkContent = () => {
	const { allPosts, itemsInBookmark } = usePosts();
	const [postData, setPostData] = useState([]);
	useEffect(() => {
		setPostData(getPostDataFromId(allPosts, itemsInBookmark));
	}, [itemsInBookmark, allPosts]);

	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<h2 className="p-5 text-bold">Bookmark Posts</h2>
			<Posts postData={postData} />
		</main>
	);
};

export { BookmarkContent };
