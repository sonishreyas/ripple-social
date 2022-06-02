import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	getBookmarkData,
	getFeedPosts,
	getUser,
	getUsers,
	useAuth,
	usePosts,
	useUser,
} from "features";
import { CreatePost, Posts } from ".";

const HomeContent = () => {
	const dispatch = useDispatch();
	const { feedPosts, sortBy } = usePosts();
	const { uid } = useAuth();
	const { userProfile } = useUser();
	const [postData, setPostData] = useState([]);

	useEffect(() => {
		if (Object.keys(userProfile).length) {
			dispatch(getFeedPosts({ userFollowing: userProfile?.following }));
			dispatch(getBookmarkData({ userId: userProfile.uid }));
		}
	}, [userProfile]);

	useEffect(() => {
		setPostData(feedPosts);
	}, [feedPosts]);
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
			<Posts postData={postData} />
		</main>
	);
};

export { HomeContent };
