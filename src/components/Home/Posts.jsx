import { usePost, useUser } from "context";
import { Link } from "react-router-dom";
import { getUserData, trimData } from "utils";
import { FilesContainer } from ".";

const Posts = () => {
	const { postState } = usePost();
	const { userState } = useUser();
	return (
		<>
			{postState?.feedPosts?.length &&
				postState?.feedPosts?.map(
					({ id, createdAt, fileUrls, postText, userId }) => {
						const user = getUserData(userId, userState.users);
						console.log(user);
						return (
							<div className="card post-card p-5 b-radius-3">
								<div className="card-image-container p-5 b-radius-3 flex-column justify-content-center align-start flex-gap-1">
									<Link
										to={`/profile/${user.username}`}
										className="no-link-decoration flex-row justify-content-start align-start w-100 flex-gap-2 border-bottom pb-5"
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
									<div>
										<p>{postText}</p>
									</div>
									<FilesContainer fileUrls={fileUrls} />
								</div>
							</div>
						);
					}
				)}
		</>
	);
};

export { Posts };
