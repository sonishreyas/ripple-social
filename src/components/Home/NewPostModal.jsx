import { addNewPost } from "backend";
import { useAuth, useModal, usePost } from "context";
import { useToast } from "custom-hooks";
import { useState } from "react";
import { EmojiContainer } from "./EmojiContainer";
import { v4 as uuid } from "uuid";
import { uploadFilesForPost } from "backend/utils";

const NewPostModal = () => {
	const { showPostModal, setShowPostModal, postState, postDispatch } =
		usePost();
	const { showToast } = useToast();
	const { modalDispatch, setShowModal } = useModal();
	const { authState } = useAuth();
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

	const handleCreatePost = (e) => {
		let newPost;
		if (postState.newPost?.createdAt?.length) {
			newPost = {
				...postState.newPost,
				userId: authState.uid,
			};
		} else {
			newPost = {
				...postState.newPost,
				createdAt: new Date(),
				userId: authState.uid,
			};
		}

		addNewPost(e, newPost, postDispatch, showToast);
		setShowPostModal(false);
	};

	const handleUploadFiles = (e, type) => {
		Object.keys(e.target.files).map((i) =>
			uploadFilesForPost(
				{ type: type, payload: e.target.files[i] },
				postDispatch
			)
		);
	};

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
					value={postState?.newPost?.postText}
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
				<div className="flex-row justify-content-space-between align-center flex-gap-1 flex-wrap">
					<div className="flex-row justify-content-center align-center flex-gap-1">
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								multiple
								accept="image/jpeg, image/png, image/svg"
								className="remove-input-file-style"
								onChange={(e) => handleUploadFiles(e, "images")}
							/>
							<i className="fa-solid fa-images social post-icons"></i>
						</label>
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								multiple
								accept="video/*"
								className="remove-input-file-style"
								onChange={(e) => handleUploadFiles(e, "videos")}
							/>
							<i className="fa-solid fa-video social post-icons"></i>
						</label>
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								multiple
								accept="image/gif"
								className="remove-input-file-style"
								onChange={(e) => handleUploadFiles(e, "gifs")}
							/>
							<p className="text-bold social post-icons">GIF</p>
						</label>
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								multiple
								accept=".pdf"
								className="remove-input-file-style"
								onChange={(e) => handleUploadFiles(e, "pdfs")}
							/>
							<i className="fa-solid fa-file-pdf social post-icons"></i>
						</label>
						<span
							className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer"
							onClick={handleEmojiContainer}
						>
							<i className="fa-solid fa-face-laugh social post-icons"></i>
						</span>
					</div>
					<div className="flex-row justify-content-center align-center flex-gap-1">
						<button
							className="primary-btn p-5 cursor-pointer b-radius-2 flex-grow-1"
							onClick={handleCreatePost}
						>
							Schedule Post
						</button>
						<button
							className="primary-btn p-5 cursor-pointer b-radius-2 flex-grow-1"
							onClick={handleCreatePost}
						>
							Create Post
						</button>
						<button className="outline-btn p-5 cursor-pointer b-radius-2 flex-grow-1">
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
