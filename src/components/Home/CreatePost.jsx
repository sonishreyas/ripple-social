import { setShowPostModal, useAuth, useUser } from "features";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CreatePost = () => {
	const { token } = useAuth();
	const { userProfile } = useUser();
	const dispatch = useDispatch();
	const handleShowPostModal = () =>
		dispatch(setShowPostModal({ showPostModal: true }));
	return (
		<div className="basic-card create-post-container p-5 b-radius-2 flex-row justify-content-center align-center flex-gap-1">
			{token && userProfile !== null && (
				<Link to={`/profile/${userProfile?.username}`} className="no-link">
					<article className="avatar-container flex-row justify-content-center align-center flex-gap-1">
						<img
							src={
								userProfile?.profileURL
									? userProfile?.profileURL
									: "https://i.stack.imgur.com/l60Hf.png"
							}
							alt="User Profile Picture"
							className="avatar b-radius-circle l"
							aria-label="User Profile Avatar"
						/>
					</article>
				</Link>
			)}
			<button
				className="outline-btn b-radius-4 w-100 p-5 cursor-pointer"
				onClick={handleShowPostModal}
			>
				Create a post
			</button>
		</div>
	);
};

export { CreatePost };
