import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	getBookmarkData,
	getFeedPosts,
	getLikePosts,
	getUser,
	getUsers,
	useAuth,
	usePosts,
	useUser,
} from "features";
import { CreatePost, Posts } from ".";
import { sortReducer } from "reducers";

const HomeContent = () => {
	const { feedPosts } = usePosts();
	const [postData, setPostData] = useState([]);
	const [sortType, setSortType] = useState("trending");

	useEffect(() => {
		setPostData(sortReducer(sortType, feedPosts));
	}, [feedPosts]);

	useEffect(() => {
		setPostData(sortReducer(sortType, feedPosts));
	}, [sortType]);

	const handleSortBy = (e) => {
		setSortType(e.target.value);
	};
	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<CreatePost />
			<div className="post-card flex-row justify-content-end align-center w-100 flex-gap-half">
				<hr className="flex-grow-1" />
				<section className="flex-row justify-content-end align-center flex-gap-1">
					<p>Sort by: </p>
					<select
						className="options-container p-2 b-radius-1"
						onChange={handleSortBy}
					>
						<option value="trending">Trending</option>
						<option value="recent">Recent</option>
						<option value="date">Date old to new</option>
					</select>
				</section>
			</div>
			<Posts postData={postData} />
		</main>
	);
};

export { HomeContent };
