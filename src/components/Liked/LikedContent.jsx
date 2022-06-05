import { Posts } from "components";
import { usePosts } from "features";
import { useEffect, useState } from "react";
import { getPostDataFromId } from "utils";

const LikedContent = () => {
	const { allPosts, itemsLiked } = usePosts();
	const [postData, setPostData] = useState([]);
	useEffect(() => {
		setPostData(getPostDataFromId(allPosts, itemsLiked));
	}, [itemsLiked]);

	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<h2 className="p-5 text-bold">Liked Posts</h2>
			<Posts postData={postData} />
		</main>
	);
};

export { LikedContent };
