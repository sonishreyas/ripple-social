import { useToast } from "custom-hooks";
import {
	addLike,
	addToBookmark,
	deleteFromBookmark,
	deleteLike,
	deletePost,
	editPost,
	setEditPost,
	setShowEditPostModal,
	setShowPostModal,
	updateLikes,
	useAuth,
	usePosts,
	useUser,
} from "features";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserData, presentInArray, removeFromArray, trimData } from "utils";
import { Comments, FilesContainer } from ".";

const Posts = ({ postData, userPost = false }) => {
	const { users } = useUser();
	const { itemsInBookmark, itemsLiked } = usePosts();
	const { uid } = useAuth();
	const { showToast } = useToast();
	const dispatch = useDispatch();
	const [showDropdown, setShowDropdown] = useState(
		postData.reduce((prev, curr) => {
			prev[curr.id] = false;
			return prev;
		}, {})
	);

	const [showComments, setShowComments] = useState(
		postData.reduce((prev, curr) => {
			prev[curr.id] = false;
			return prev;
		}, {})
	);

	const handleDropdown = (id) => {
		if (showDropdown[id]) {
			const newObj = { ...showDropdown };
			newObj[id] = false;
			setShowDropdown({ ...newObj });
		} else {
			const newObj = { ...showDropdown };
			newObj[id] = true;
			setShowDropdown({ ...newObj });
		}
	};

	const handleAddToBookmark = (e, id) => {
		dispatch(
			addToBookmark({
				userId: uid,
				updatedValue: { bookmarks: [...itemsInBookmark, id] },
			})
		);
		showToast("Post bookmarked", "success");
	};

	const handleRemoveFromBookmark = (e, id) => {
		dispatch(
			deleteFromBookmark({
				userId: uid,
				updatedValue: {
					bookmarks: removeFromArray(itemsInBookmark, id),
				},
			})
		);
		showToast("Post removed from bookmark", "success");
	};

	const handleDeletePost = (id) => {
		dispatch(deletePost({ postId: id }));
	};

	const handleEditPost = (id) => {
		const data = postData.find((item) => item.id === id);
		dispatch(setEditPost(data));
		dispatch(setShowEditPostModal(true));
		const newObj = { ...showDropdown };
		newObj[id] = false;
		setShowDropdown({ ...newObj });
	};

	const handleLike = (e, id) => {
		dispatch(
			addLike({
				userId: uid,
				updatedValue: { liked: [...itemsLiked, id] },
			})
		);
		dispatch(
			updateLikes({
				userId: uid,
				updatedValue: { likes: postData.likes + 1 },
			})
		);
	};

	const handleUnlike = (e, id) => {
		dispatch(
			deleteLike({
				userId: uid,
				updatedValue: { liked: removeFromArray(itemsLiked, id) },
			})
		);
		dispatch(
			updateLikes({
				userId: uid,
				updatedValue: { likes: postData.likes - 1 },
			})
		);
	};
	const handleShowComments = (id) => {
		if (showComments[id]) {
			const newObj = { ...showComments };
			newObj[id] = false;
			setShowComments({ ...newObj });
		} else {
			const newObj = { ...showComments };
			newObj[id] = true;
			setShowComments({ ...newObj });
		}
	};

	console.log(postData);
	return (
		<>
			{postData?.length &&
				postData?.map(
					({ id, createdAt, fileUrls, postText, userId, comments }) => {
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
												src={
													user?.profileURL ||
													"https://i.stack.imgur.com/l60Hf.png"
												}
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
										{userPost ? (
											<div className="dropdown-container">
												<div className="py-8 flex-row justify-content-center align-center">
													<i
														className="fa-solid fa-ellipsis-vertical"
														onClick={() => handleDropdown(id)}
													></i>
												</div>
												{showDropdown[id] ? (
													<div className="dropdown p-5 b-radius-1">
														<ul className="no-list">
															<li
																className="p-3 dropdown-content b-radius-1"
																onClick={() => handleEditPost(id)}
															>
																Edit
															</li>
															<li
																className="p-3 dropdown-content b-radius-1"
																onClick={() => handleDeletePost(id)}
															>
																Delete
															</li>
														</ul>
													</div>
												) : (
													<></>
												)}
											</div>
										) : (
											<></>
										)}
									</Link>
									<div className="card-image-container p-5 b-radius-2 flex-column justify-content-center align-start flex-gap-half w-100">
										<div className="p-5 flex-column justify-content-center align-start w-100">
											<p className="h5">{postText}</p>
										</div>
										{fileUrls?.length ? (
											<div className=" w-100 flex-column justify-content-center align-center">
												<FilesContainer fileUrls={fileUrls} />
											</div>
										) : (
											<></>
										)}
									</div>
									<div className="post-icons-container card-image-container b-radius-2 w-100 flex-row justify-content-space-between align-center px-10 py-7 my-5">
										<section className="flex-row justify-content-center align-center flex-gap-1">
											<span>
												{presentInArray(itemsLiked, id) ? (
													<i
														className="fa-solid fa-thumbs-up social text-cta-color"
														onClick={(e) => handleUnlike(e, id)}
													></i>
												) : (
													<i
														className="fa-regular fa-thumbs-up social"
														onClick={(e) => handleLike(e, id)}
													></i>
												)}
											</span>
											<span>
												<i
													className="fa-regular fa-comment social"
													onClick={() => handleShowComments(id)}
												></i>
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
									{showComments[id] ? (
										<Comments comments={comments || []} postId={id} />
									) : (
										<></>
									)}
								</div>
							</div>
						);
					}
				)}
		</>
	);
};

export { Posts };
