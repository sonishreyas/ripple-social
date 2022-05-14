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
												<i class="fa-regular fa-thumbs-up social"></i>
											</span>
											<span>
												<i class="fa-solid fa-comment social"></i>
											</span>
										</section>
										<span>
											<i class="fa-regular fa-bookmark social"></i>{" "}
										</span>
									</div>
								</div>
							</div>
						);
					}
				)}
		</>
	);
};

export { Posts };
