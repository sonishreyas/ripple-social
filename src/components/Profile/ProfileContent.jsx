import { Posts } from "components/Home";
import { getPosts, usePosts, useUser } from "features";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { presentInArray } from "utils";
import { ProfileButton } from ".";

const ProfileContent = () => {
	const { username } = useParams();
	const { users, userProfile } = useUser();
	const { allPosts } = usePosts();
	const userData = users.find((item) => item.username === username);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
	}, []);
	const postData = allPosts?.filter((item) => item?.userId === userData?.uid);
	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<div className="basic-card profile-card p-5 b-radius-3 flex-column justify-centent-center align-center flex-gap-1">
				<img
					className="background-img w-100 b-radius-3"
					src={
						userData?.backgroundURL
							? userData?.backgroundURL
							: "https://firebasestorage.googleapis.com/v0/b/ripple-54aa4.appspot.com/o/default%2Fbg-img.jpg?alt=media&token=56416a73-c90a-4c7e-b65d-584453fdbe07"
					}
					alt="Background image"
				/>
				<article className="avatar-container w-100 text-center">
					<img
						src={
							userData?.profileURL
								? userData?.profileURL
								: "https://i.stack.imgur.com/l60Hf.png"
						}
						alt="User Profile Picture"
						className="avatar b-radius-circle profile-img"
						aria-label="User Profile Avatar"
					/>
				</article>
				<div className="user-details flex-row justify-centent-space-between align-start w-100">
					<div className="user-container flex-column justify-centent-center align-start flex-grow-1">
						<h2 className="p-2 text-bold">{userData?.name}</h2>
						<h4 className="p-2">@{userData?.username}</h4>
						<p className="p-2">{userData?.bio}</p>
					</div>
					{userData?.uid === userProfile.uid ? (
						<ProfileButton type="EDIT_PROFILE" userData={userData} />
					) : presentInArray(userProfile?.following, userData.uid) ? (
						<ProfileButton type="UNFOLLOW" userData={userData} />
					) : (
						<ProfileButton type="FOLLOW" userData={userData} />
					)}
				</div>
				<div className="flex-row justify-centent-space-between align-start w-100 flex-gap-1">
					<div className="basic-card-primary flex-column justify-content-center align-center flex-grow-1 flex-gap-1 b-radius-3 p-5">
						<h3 className="text-bold">{userData?.following?.length}</h3>
						<h3>Following</h3>
					</div>
					<div className="basic-card-primary flex-column justify-content-center align-center flex-grow-1 flex-gap-1 b-radius-3  p-5">
						<h3 className="text-bold">{postData?.length}</h3>
						<h3>Posts</h3>
					</div>
					<div className="basic-card-primary flex-column justify-content-center align-center flex-grow-1 flex-gap-1 b-radius-3  p-5">
						<h3 className="text-bold">{userData?.followers?.length}</h3>
						<h3>Followers</h3>
					</div>
				</div>
			</div>
			<div className="profile-card flex-column align-start w-100">
				<h2 className="p-5 text-bold">Posts</h2>
			</div>
			{postData?.length ? (
				<Posts postData={postData} userPost={true} />
			) : (
				<p>No post yet</p>
			)}
		</main>
	);
};

export { ProfileContent };
