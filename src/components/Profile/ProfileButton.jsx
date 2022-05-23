import { setShowEditProfile, updateUser, useUser } from "features";
import { useDispatch } from "react-redux";
import { removeFromArray } from "utils";

const ProfileButton = ({ type, userData }) => {
	const { userProfile } = useUser();
	const dispatch = useDispatch();
	const handleFollowUser = () => {
		dispatch(
			updateUser({
				userId: userProfile?.uid,
				updatedValue: {
					following: [...userProfile?.following, userData?.uid],
				},
			})
		);
		dispatch(
			updateUser({
				userId: userData?.uid,
				updatedValue: {
					followers: [...userData?.followers, userProfile?.uid],
				},
			})
		);
	};

	const handleUnfollowUser = () => {
		dispatch(
			updateUser({
				userId: userProfile?.uid,
				updatedValue: {
					following: removeFromArray(userProfile?.following, userData?.uid),
				},
			})
		);
		dispatch(
			updateUser({
				userId: userData?.uid,
				updatedValue: {
					followers: removeFromArray(userData?.followers, userProfile?.uid),
				},
			})
		);
	};

	const handleShowProfileModal = () =>
		dispatch(setShowEditProfile({ showEditProfile: true }));
	return (
		<>
			{type === "EDIT_PROFILE" && (
				<button
					className="primary-btn b-radius-2 p-5 flex-grow-half cursor-pointer"
					onClick={handleShowProfileModal}
				>
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
