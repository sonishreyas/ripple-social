import { useAuth, usePost } from "context";
import { Link } from "react-router-dom";

const CreatePost = () => {
	const { authState } = useAuth();
	const { setShowPostModal } = usePost();

	const handleShowPostModal = () => setShowPostModal(true);

	return (
		<div className="basic-card create-post-container p-5 b-radius-2 flex-row justify-content-center align-center flex-gap-1">
			{authState.token && (
				<Link to={"/profile"} className="no-link">
					<article className="avatar-container flex-row justify-content-center align-center flex-gap-1">
						<img
							src="https://raw.githubusercontent.com/sonishreyas/rippleUI/dev/components/media/images/profile.jpeg"
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
