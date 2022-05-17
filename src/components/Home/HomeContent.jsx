import { usePost } from "context";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFeedPosts, usePosts } from "features";
import { CreatePost, Posts } from ".";

const HomeContent = () => {
	const dispatch = useDispatch();
	let { feedPosts, sortBy } = usePosts();

	const [postData, setPostData] = useState([]);

	useEffect(() => {
		dispatch(getFeedPosts());
	}, []);

	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<CreatePost />
			<div className="post-card flex-row justify-content-end align-center w-100 flex-gap-half">
				<hr className="flex-grow-1" />
				<p>Sort by: </p>
				<select className="options-container p-2 b-radius-1">
					<option value="trending">Trending</option>
					<option value="recent">Recent</option>
					<option value="date">Date old to new</option>
				</select>
			</div>
			<Posts postData={feedPosts} />
		</main>
	);
};

export { HomeContent };
