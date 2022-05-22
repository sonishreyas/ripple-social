import { useModal, usePost } from "context";
import { useToast } from "custom-hooks";
import { useState } from "react";
import { EmojiContainer } from "./EmojiContainer";

const NewPostModal = () => {
	const { showPostModal, setShowPostModal, postState, postDispatch } =
		usePost();
	const { showToast } = useToast();
	const { modalDispatch, setShowModal } = useModal();
	const [showEmojiContainer, setShowEmojiContainer] = useState(false);
	const handleDismissModal = () => setShowModal(false);

	const handleDiscardModal = (e, id) => {
		modalDispatch({
			type: "SET_MODAL",
			payload: {
				message: "Are you sure you want to discard the post ?",
				handleConfirm: handleDismissPostModal,
				handleDismiss: handleDismissModal,
				confirmChoice: "Yes",
				dismissChoice: "No",
			},
		});
		setShowModal(true);
	};

	const handleDismissPostModal = () => {
		setShowPostModal(false);
		setShowModal(false);
	};

	const handleEmojiContainer = () =>
		showEmojiContainer
			? setShowEmojiContainer(false)
			: setShowEmojiContainer(true);
	// console.log(postState);
	return (
		<div className="modal flex-row justify-content-center align-center">
			<div className="modal-background"></div>
			<div className="modal-content p-5 m-5 b-radius-2 card-shadow">
				<div className="flex-row justify-content-space-between align-center flex-gap-1">
					<h3 className="p-2 my-2 mx-0 text-cta-color text-bold">
						Create a Post
					</h3>
					<i
						className="fa-solid fa-circle-xmark social"
						onClick={handleDiscardModal}
					></i>
				</div>
				<textarea
					placeholder="What's in your mind?"
					className="post-text-container my-5 b-radius-1 p-5 w-100"
					value={postState.newPost.postText}
					onChange={(e) =>
						postDispatch({
							type: "UPDATE_POST_TEXT",
							payload: {
								newPost: {
									postText: e.target.value,
								},
							},
						})
					}
				/>
				<div className="flex-row justify-content-space-between align-center flex-gap-1">
					<div className="flex-row justify-content-center align-center flex-gap-1">
						<span className="basic-card  b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<i className="fa-solid fa-images social post-icons"></i>
						</span>
						<span className=" p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<p className="text-bold social post-icons">GIF</p>
						</span>
						<span
							className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer"
							onClick={handleEmojiContainer}
						>
							<i className="fa-solid fa-face-laugh social post-icons"></i>
						</span>
					</div>
					<div className="flex-row justify-content-center align-center flex-gap-1">
						<button className="primary-btn p-5 cursor-pointer b-radius-2 ">
							Create Post
						</button>
						<button className="outline-btn p-5 cursor-pointer b-radius-2">
							Save Draft
						</button>
					</div>
				</div>
				{showEmojiContainer && <EmojiContainer />}{" "}
			</div>
		</div>
	);
};

export { NewPostModal };
