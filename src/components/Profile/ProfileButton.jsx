import { updateUser, useUser } from "features";
import { useDispatch } from "react-redux";
import { removeFromArray } from "utils";

const ProfileButton = ({ type, userData }) => {
	const { userProfile } = useUser();
	const dispatch = useDispatch();
	const handleFollowUser = () => {
		dispatch(
			updateUser({
				userId: userProfile?.userId,
				updatedValue: {
					following: [...userProfile?.following, userData?.uid],
				},
			})
		);
		dispatch(
			updateUser({
				userId: userData?.userId,
				updatedValue: {
					followers: [...userData?.followers, userProfile?.uid],
				},
			})
		);
	};

	const handleUnfollowUser = () => {
		dispatch(
			updateUser({
				userId: userProfile?.userId,
				updatedValue: {
					following: removeFromArray(userProfile?.followers, userData?.uid),
				},
			})
		);
		dispatch(
			updateUser({
				userId: userData?.userId,
				updatedValue: {
					followers: removeFromArray(userData?.followers, userProfile?.uid),
				},
			})
		);
	};
	return (
		<>
			{type === "EDIT_PROFILE" && (
				<button className="primary-btn b-radius-2 p-5 flex-grow-half cursor-pointer">
					Edit Profile
				</button>
			)}
			{type === "FOLLOW" && (
				<button
					className="primary-btn b-radius-2 p-5 flex-grow-half cursor-pointer"
					onClick={handleFollowUser}
				>
					Follow
				</button>
			)}
			{type === "UNFOLLOW" && (
				<button
					className="outline-btn b-radius-2 p-5 flex-grow-half cursor-pointer"
					onClick={handleUnfollowUser}
				>
					Following
				</button>
			)}
		</>
	);
};

export { ProfileButton };
