import { Posts } from "components";
import { usePosts } from "features";
import { useEffect, useState } from "react";
import { getBookmarkDataFromId } from "utils";

const BookmarkContent = () => {
	const { allPosts, itemsInBookmark } = usePosts();
	const [postData, setPostData] = useState();
	useEffect(() => {
		setPostData(getBookmarkDataFromId(allPosts, itemsInBookmark));
	}, [itemsInBookmark]);

	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<Posts postData={postData} />
		</main>
	);
};

export { BookmarkContent };
