import { Posts } from "components";
import { useBookmark, usePost } from "context";
import { useEffect, useState } from "react";
import { getBookmarkDataFromId } from "utils";

const BookmarkContent = () => {
	const { postState } = usePost();
	const { bookmarkState } = useBookmark();
	const [postData, setPostData] = useState();
	useEffect(() => {
		setPostData(
			getBookmarkDataFromId(
				postState.explorePosts,
				bookmarkState.itemsInBookmark
			)
		);
	}, [bookmarkState]);

	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<Posts postData={postData} />
		</main>
	);
};

export { BookmarkContent };
