import { addComment, useAuth, useUser } from "features";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "utils";

const Comments = ({ comments, postId }) => {
	const { users, userProfile } = useUser();
	const { token } = useAuth();
	const [showButtons, setShowButton] = useState(false);
	const [focus, setFocus] = useState(false);
	const [newComment, setNewComment] = useState("");
	const dispatch = useDispatch();

	const handleFocus = () => {
		if (focus) {
			setFocus(false);
			!newComment?.length && setShowButton(false);
		} else {
			setFocus(true);
			setShowButton(true);
		}
	};

	const handleValueChange = (e) => setNewComment(e.target.value);

	const handleDismissComment = () => {
		setNewComment("");
		setShowButton(false);
	};

	const handleAddComment = (e) => {
		dispatch(
			addComment({
				postId: postId,
				updatedValue: {
					comments: [
						...comments,
						{ userId: userProfile?.uid, comment: newComment },
					],
				},
			})
		);
		setNewComment("");
		setShowButton(false);
	};

	return (
		<div className="post-icons-container card-image-container b-radius-2 w-100 flex-row justify-content-space-between align-center px-10 py-7">
			<section className="flex-row justify-content-center align-center flex-gap-1 w-100">
				<ul className="w-100">
					<li className="no-list form-heading text-bold py-5">Comments</li>
					{token && (
						<li className="no-list w-100">
							<div className="flex-row justify-content-center align-center w-100">
								<article className="avatar-container w-max-content">
									<img
										src={
											userProfile?.profileURL ||
											"https://i.stack.imgur.com/l60Hf.png"
										}
										alt="User Profile Picture"
										className="avatar b-radius-circle m"
										aria-label="User Profile Avatar"
									/>
								</article>
								<div className="card-content w-100 flex-grow-1">
									<div
										className={`input-container flex-column m-5 w-100 h-auto`}
										key="new-comment-input"
									>
										<input
											id="new-comment"
											className="textbox-content p-5"
											type="text"
											name="newComments"
											onChange={handleValueChange}
											value={newComment}
											onFocus={handleFocus}
											onBlur={handleFocus}
											placeholder="Add a comment"
										/>
									</div>
								</div>
							</div>
							{showButtons && (
								<div className="flex-row justify-content-end flex-gap-1">
									<button
										className="cursor-pointer outline-btn p-3 b-radius-1 text-bold"
										type="button"
										onClick={handleDismissComment}
									>
										Cancel
									</button>
									<button
										className="cursor-pointer primary-btn p-3 b-radius-1 text-bold"
										type="button"
										onClick={() => {
											handleAddComment();
										}}
									>
										Comment
									</button>
								</div>
							)}
						</li>
					)}
					{comments.length ? (
						comments.map(({ _id, comment, userId }) => {
							const user = getUserData(userId, users);
							return (
								<li className="no-list" key={_id}>
									<div className="flex-row justify-content-start align-center">
										<article className="avatar-container w-max-content">
											<img
												src={
													user?.profileURL ||
													"https://i.stack.imgur.com/l60Hf.png"
												}
												alt="User Profile Picture"
												className="avatar b-radius-circle m"
												aria-label="User Profile Avatar"
											/>
										</article>
										<div className="card-content p-5 pb-0">
											<p className="h5 text-bold">{user?.name}</p>
											<p className="py-1">{comment}</p>
										</div>
									</div>
								</li>
							);
						})
					) : (
						<></>
					)}
				</ul>
			</section>
		</div>
	);
};

export { Comments };
