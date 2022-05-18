import { useToast } from "custom-hooks";
import { useAuth, usePosts, useUser } from "features";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserData, presentInArray, removeFromArray, trimData } from "utils";
import { FilesContainer } from ".";

const Posts = ({ postData }) => {
	const { users } = useUser();
	const { itemsInBookmark } = usePosts();
	const { uid } = useAuth();
	const { showToast } = useToast();
	const dispatch = useDispatch();
	const handleAddToBookmark = (e, id) => {
		dispatch(addToBookmark(uid, { bookmarks: [...itemsInBookmark, id] }));
		showToast("Post bookmarked", "success");
	};

	const handleRemoveFromBookmark = (e, id) => {
		dispatch(
			deleteFromBookmark(uid, {
				bookmarks: removeFromArray(itemsInBookmark, id),
			})
		);
		showToast("Post removed from bookmark", "success");
	};

	return (
		<>
			{postData?.length &&
				postData?.map(({ id, createdAt, fileUrls, postText, userId }) => {
					const user = getUserData(userId, users);
					return (
						<div className="card post-card p-5 b-radius-3" key={id}>
							<div className="p-5 b-radius-3 flex-column justify-content-center align-start flex-gap-half">
								<Link
									to={`/profile/${user.username}`}
									className="no-link-decoration flex-row justify-content-start align-start w-100 flex-gap-2 pb-5"
								>
									<article className="avatar-container w-max-content">
										<img
											src="https://raw.githubusercontent.com/sonishreyas/rippleUI/dev/components/media/images/profile.jpeg"
											alt="User Profile Picture"
											className="avatar b-radius-circle l"
											aria-label="User Profile Avatar"
										/>
									</article>
									<div className="flex-column justify-content-start align-start flex-gap-1 w-100">
										<h4 className="pb-4 text-bold w-100 border-bottom">
											{user?.name}
										</h4>
										<p>{user?.bio ? trimData(user?.bio) : ""}</p>
									</div>
								</Link>
								<div className="card-image-container p-5 b-radius-2 flex-column justify-content-center align-start flex-gap-half w-100">
									<div className="p-5 flex-column justify-content-center align-start w-100 border-bottom-secondary">
										<p className="h5">{postText}</p>
									</div>
									<div className="border-bottom w-100 flex-column justify-content-center align-center">
										<FilesContainer fileUrls={fileUrls} />
									</div>
								</div>
								<div className="post-icons-container card-image-container b-radius-2 w-100 flex-row justify-content-space-between align-center px-10 py-7 my-5">
									<section className="flex-row justify-content-center align-center flex-gap-1">
										<span>
											<i className="fa-regular fa-thumbs-up social"></i>
										</span>
										<span>
											<i className="fa-solid fa-comment social"></i>
										</span>
									</section>
									<span>
										{presentInArray(itemsInBookmark, id) ? (
											<i
												className="fa-solid fa-bookmark social text-cta-color"
												onClick={(e) => handleRemoveFromBookmark(e, id)}
											></i>
										) : (
											<i
												className="fa-regular fa-bookmark social"
												onClick={(e) => handleAddToBookmark(e, id)}
											></i>
										)}
									</span>
								</div>
							</div>
						</div>
					);
				})}
		</>
	);
};

export { Posts };
